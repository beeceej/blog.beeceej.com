variable "script_name" {}

variable "script_path" {
  description = "script_path is the path to the script under execution"
  default     = "index.js"
}

variable "account_zone" {
  description = "account_zone is the zone which the current account resides in."
}

variable "enabled_route_patterns" {
  description = "enabled_route_patterns defines a list of route patterns that the script WILL be ran for"
  default     = []
}

variable "disabled_route_patterns" {
  description = "disabled_route_patterns is a list of route patterns that the script will NOT be ran for"
  default     = []
}

resource "cloudflare_worker_route" "enabled_routes" {
  count      = "${length(var.enabled_route_patterns)}"
  zone       = "${var.account_zone}"
  pattern    = "${element(var.enabled_route_patterns, count.index)}"
  script_name = "${var.script_name}"
  depends_on = ["cloudflare_worker_script.script"]
}

resource "cloudflare_worker_route" "disabled_routes" {
  count      = "${length(var.disabled_route_patterns)}"
  zone       = "${var.account_zone}"
  pattern    = "${element(var.disabled_route_patterns, count.index)}"
  enabled    = false
  depends_on = ["cloudflare_worker_script.script"]
}

resource "cloudflare_worker_script" "script" {
  name = "${var.script_name}"
  content = "${file(var.script_path)}"
}