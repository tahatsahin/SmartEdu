resource "digitalocean_loadbalancer" "lb" {
  name        = "${var.project_name}-lb"
  region      = "${var.region}"
  droplet_ids = [for d in digitalocean_droplet.app : d.id]

  forwarding_rule {
    entry_port      = 80
    entry_protocol  = "http"

    target_port     = 80
    target_protocol = "http"
  }

  healthcheck {
    protocol                  = "http"
    port                      = 80
    path                      = "/"
    check_interval_seconds    = 10
    response_timeout_seconds  = 5
    unhealthy_threshold       = 3
    healthy_threshold         = 2
    }

    sticky_sessions {
      type  = "none"
    }

    redirect_http_to_https = false
}
