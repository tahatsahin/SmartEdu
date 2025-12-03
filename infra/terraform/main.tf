data "digitalocean_ssh_key" "terraform" {
  name        = "my-linux"
}

resource "digitalocean_droplet" "app" {
  count       = 2
  name        = "${var.project_name}-app-${count.index + 1}"
  region      = var.region
  size        = var.droplet_size
  image       = "ubuntu-22-04-x64"

  ssh_keys    = [data.digitalocean_ssh_key.terraform.fingerprint]

  backups     = false
  ipv6        = false
  monitoring  = false
}

