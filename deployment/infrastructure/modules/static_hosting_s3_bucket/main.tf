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

variable "cors" {}


resource "aws_s3_bucket" "blog.beeceej.com" {
  bucket = "${var.bucket_name}"
  acl    = "${var.acl}"
  policy = "${var.bucket_policy_json}"

  website {
    index_document = "${var.index_document}"
    error_document = "${var.error_document}"
  }

  cors_url = "${var.cors}"
}
