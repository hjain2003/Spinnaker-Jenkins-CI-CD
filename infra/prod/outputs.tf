output "alb_dns" {
  value = aws_lb.app_alb.dns_name
}

output "ecs_cluster_id" {
  value = aws_ecs_cluster.app_cluster.id
}

output "s3_bucket" {
  value = aws_s3_bucket.app_bucket.bucket
}
