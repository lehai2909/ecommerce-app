resource "aws_apigatewayv2_api" "http_api" {
  name          = "ecommerce-api"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["*"]
    allow_headers = ["*"]
  }
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_authorizer" "cognito" {
  api_id           = aws_apigatewayv2_api.http_api.id
  authorizer_type  = "JWT"
  identity_sources = ["$request.header.Authorization"]
  name             = "cognito-authorizer"

  jwt_configuration {
    audience = [aws_cognito_user_pool_client.client.id]
    issuer   = "https://${aws_cognito_user_pool.user_pool.endpoint}"
  }
}


# Products Integration
resource "aws_apigatewayv2_integration" "products" {
  api_id             = aws_apigatewayv2_api.http_api.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.products.invoke_arn
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "products_any" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "GET /api/products/{proxy+}"
  target             = "integrations/${aws_apigatewayv2_integration.products.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}
resource "aws_apigatewayv2_route" "products_root" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "GET /api/products"
  target             = "integrations/${aws_apigatewayv2_integration.products.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}

# Cart Integration
resource "aws_apigatewayv2_integration" "cart" {
  api_id             = aws_apigatewayv2_api.http_api.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.cart.invoke_arn
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "cart_any" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "GET /api/cart/{proxy+}"
  target             = "integrations/${aws_apigatewayv2_integration.cart.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}
resource "aws_apigatewayv2_route" "cart_root" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "GET /api/cart"
  target             = "integrations/${aws_apigatewayv2_integration.cart.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}
# Also add POST for cart
resource "aws_apigatewayv2_route" "cart_post" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "POST /api/cart"
  target             = "integrations/${aws_apigatewayv2_integration.cart.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}

# Stripe Integration
resource "aws_apigatewayv2_integration" "stripe" {
  api_id             = aws_apigatewayv2_api.http_api.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.stripe.invoke_arn
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "stripe_any" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "POST /api/checkout/{proxy+}"
  target             = "integrations/${aws_apigatewayv2_integration.stripe.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}
resource "aws_apigatewayv2_route" "stripe_root" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "POST /api/checkout"
  target             = "integrations/${aws_apigatewayv2_integration.stripe.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}

# Lambda Permissions
resource "aws_lambda_permission" "api_gw_products" {
  statement_id  = "AllowExecutionFromAPIGatewayProducts"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.products.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "api_gw_cart" {
  statement_id  = "AllowExecutionFromAPIGatewayCart"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.cart.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "api_gw_stripe" {
  statement_id  = "AllowExecutionFromAPIGatewayStripe"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.stripe.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}
