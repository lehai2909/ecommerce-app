# IAM Role
resource "aws_iam_role" "lambda_exec" {
  name = "ecommerce-lambda-exec-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "dynamodb_access" {
  name = "ecommerce-dynamodb-access"
  role = aws_iam_role.lambda_exec.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:Scan"
      ]
      Effect = "Allow"
      Resource = [
        aws_dynamodb_table.products.arn,
        aws_dynamodb_table.cart.arn
      ]
    }]
  })
}

# Products Lambda
data "archive_file" "products_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../backend/products"
  output_path = "${path.module}/products.zip"
}

resource "aws_lambda_function" "products" {
  filename         = data.archive_file.products_zip.output_path
  function_name    = "ecommerce-products"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "server.handler"
  source_code_hash = data.archive_file.products_zip.output_base64sha256
  runtime          = "nodejs22.x"
  timeout          = 10
  environment {
    variables = {
      PRODUCTS_TABLE_NAME = aws_dynamodb_table.products.name
    }
  }
}

# Cart Lambda
data "archive_file" "cart_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../backend/cart"
  output_path = "${path.module}/cart.zip"
}

resource "aws_lambda_function" "cart" {
  filename         = data.archive_file.cart_zip.output_path
  function_name    = "ecommerce-cart"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "server.handler"
  source_code_hash = data.archive_file.cart_zip.output_base64sha256
  runtime          = "nodejs22.x"
  timeout          = 10
  environment {
    variables = {
      CART_TABLE_NAME = aws_dynamodb_table.cart.name
    }
  }
}

# Stripe Lambda
data "archive_file" "stripe_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../third-party/stripe"
  output_path = "${path.module}/stripe.zip"
}

resource "aws_lambda_function" "stripe" {
  filename         = data.archive_file.stripe_zip.output_path
  function_name    = "ecommerce-stripe"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "server.handler"
  source_code_hash = data.archive_file.stripe_zip.output_base64sha256
  runtime          = "nodejs22.x"
  timeout          = 10
  environment {
    variables = {
      # The frontend URL will be known after CloudFront deployment. 
      # Since we build infra first, we can just point it to the output domain.
      FRONTEND_URL = "https://${aws_cloudfront_distribution.frontend.domain_name}"
    }
  }
}
