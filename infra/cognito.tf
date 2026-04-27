resource "aws_cognito_user_pool" "user_pool" {
  name = "ecommerce-user-pool"

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  verification_message_template {
    default_email_option = "CONFIRM_WITH_LINK"
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true

    string_attribute_constraints {
      min_length = 1
      max_length = 2048
    }
  }
}

resource "aws_cognito_user_pool_client" "client" {
  name         = "ecommerce-client"
  user_pool_id = aws_cognito_user_pool.user_pool.id

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]

  prevent_user_existence_errors = "ENABLED"
}

resource "aws_cognito_user" "test_user" {
  user_pool_id = aws_cognito_user_pool.user_pool.id
  username     = "test@example.com"

  attributes = {
    email          = "test@example.com"
    email_verified = true
  }

  password = "Password123!"
}

output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.user_pool.id
}

output "cognito_client_id" {
  value = aws_cognito_user_pool_client.client.id
}
