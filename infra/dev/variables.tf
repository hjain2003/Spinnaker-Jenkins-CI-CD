variable "aws_region" {}
variable "environment" {}
variable "app_name" {}
variable "vpc_id" {}
variable "subnet_id" {}
variable "ecs_instance_type" {
  default = "t3.medium"
}
variable "s3_bucket_name" {}
