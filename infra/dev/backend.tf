terraform {
  backend "s3" {
    bucket = "mini-cicd-tfstate-<yourid>"
    key    = "dev/terraform.tfstate"
    region = "us-west-1"
    dynamodb_table = "terraform-locks"
    encrypt = true
  }
}
