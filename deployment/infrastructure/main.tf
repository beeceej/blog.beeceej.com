module "blog-beeceej-com" {
  source             = "./modules/static_hosting_s3_bucket"
  bucket_name        = "${var.bucket_name}"
  bucket_policy_json = "${data.aws_iam_policy_document.blog-beeceej-com.json}"
}

module "single_worker" {
  source                  = "./modules/cloudflare_worker"
  enabled_route_patterns  = ["${var.bucket_name}/*"]
  disabled_route_patterns = ["${var.bucket_name}/"]
  account_zone            = "beeceej.com"
  script_path             = "${path.module}/worker/index.js"
}

resource "cloudflare_record" "blog-beeceej-com_CNAME" {
  domain  = "beeceej.com"
  name    = "${var.bucket_name}"
  value   = "${var.bucket_name}.s3-website-us-east-1.amazonaws.com"
  type    = "CNAME"
  proxied = true
}

data aws_iam_policy_document "blog-beeceej-com" {
  statement {
    actions = ["s3:*"]
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    resources = [
      "arn:aws:s3:::${var.bucket_name}/*",
    ]
  }
}

