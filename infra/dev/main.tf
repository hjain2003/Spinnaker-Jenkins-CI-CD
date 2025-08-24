data "aws_vpc" "default" {
  default = true
}

data "aws_subnet_ids" "default" {
  vpc_id = data.aws_vpc.default.id
}

resource "aws_s3_bucket" "static_site" {
  bucket = "${var.app_name}-static-${var.env}-${random_id.suffix.hex}"
  acl    = "public-read"
  force_destroy = true
  website {
    index_document = "index.html"
  }
}

resource "random_id" "suffix" {
  byte_length = 2
}

resource "aws_ecr_repository" "app" {
  name = "${var.app_name}"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecs_cluster" "cluster" {
  name = "${var.app_name}-${var.env}-cluster"
}
