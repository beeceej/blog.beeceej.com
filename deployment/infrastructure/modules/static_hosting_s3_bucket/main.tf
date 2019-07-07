variable "bucket_name" {}
variable "bucket_policy_json" {}
variable "index_document" {
  default = "index.html"
}
variable "error_document" {
  default = "index.html"
}
variable "acl" {
  default = "public-read"
}


resource "aws_s3_bucket" "blog.beeceej.com" {
  bucket = "${var.bucket_name}"
  acl    = "${var.acl}"
  policy = "${var.bucket_policy_json}"

  website {
    index_document = "${var.index_document}"
    error_document = "${var.error_document}"
  }

  cors_rule {
     allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  } 
}
