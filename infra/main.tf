terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
  }
}

provider "aws" {
  region  = "us-west-1"
  profile = "digital-unicorn"
}

provider "aws" {
  alias   = "ap_southeast_1"
  region  = "ap-southeast-1"
  profile = "digital-unicorn"
}

data "aws_caller_identity" "current" {}
