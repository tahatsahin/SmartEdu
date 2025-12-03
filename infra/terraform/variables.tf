variable "do_token" {
  description = "digitalocean personal access token"
  type        = string
  sensitive   = true
}

variable "region" {
  description = "digitalocean region"
  type        = string
  default     = "fra1"
}

variable "droplet_size" {
  description = "droplet size"
  type        = string
  default     = "s-1vcpu-1gb"
}

variable "project_name" {
  description = "project name prefix"
  type        = string
  default     = "my-app"
}
