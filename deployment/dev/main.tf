locals {
    bucket_name = "blog-dev.beeceej.com"
}

module "blog-beeceej-com" {
  source               = "../infrastructure"
  bucket_name = "${local.bucket_name}"
}

resource "aws_iam_user" "blog-beeceej-com-deploy-bundle" {
  name = "blog-beeceej-com-deploy-bundle}"
}

resource "aws_iam_user_policy" "blog-beeceej-com-deploy-bundle" {
  name = "${local.name}"
  user = "${aws_iam_user.blog-beeceej-com-deploy-bundle.name}"
  policy = "${data.aws_iam_policy_document.blog-beeceej-com-deploy-bundle.json}"
}

data aws_iam_policy_document "blog-beeceej-com-deploy-bundle" {
  statement {
    actions = ["s3:*"]
    resources = [
      "arn:aws:s3:::${local.bucket_name}/*"
    ]
  }
}