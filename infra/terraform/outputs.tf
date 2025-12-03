output "app_droplet_ips" {
  description = "public ips of app droplets"
  value       = [for d in digitalocean_droplet.app : d.ipv4_address]
}

output "loadbalancer_ip" {
  description = "loadbalancer ip"
  value       = digitalocean_loadbalancer.lb.ip
}
