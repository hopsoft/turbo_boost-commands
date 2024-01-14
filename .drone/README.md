# Drone CI (self hosted)

## Initial Setup and Configuration

1. [Create a GitHub OAuth application](https://docs.drone.io/server/provider/github/)
1. Configure your DNS by setting `A/AAAA` record(s) to point to your server
1. Optionally configure `SSL/TLS` to use [`Full (Strict)` mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) if using a DNS service like Cloudflare
1. `ssh` to your server

   ```sh
   ssh root@SERVER
   ```

1. Open ports `80` and `443`

   ```sh
   ufw allow 80/tcp
   ufw allow 443/tcp
   ufw allow 443/udp
   ```

1. Create a non-root `sudo` user _(`docker` for example)_ to run Docker

   > [!NOTE] This step isn't necessary if your server already has a Docker user

   ```sh
   adduser docker
   ```

1. Switch to the new user and verify docker works

   ```sh
   su - docker
   docker info
   ```

1. Copy the `.env`, `Caddyfile`, and `compose.yml` config files to the server _(location of your choice, `/home/docker/.config/drone` for example)_

   ```sh
   su - docker
   mkdir -p ~/.config/drone
   touch ~/.config/drone/.env ~/.config/drone/Caddyfile  ~/.config/drone/compose.yml
   chmod 600 ~/.config/drone/.env
   # copy contents to each file
   ```

1. Update the `.env` file with your specific values
1. Start the Docker configuration

   ```sh
   # as root
   su docker -c "docker compose -f /home/docker/.config/drone/compose.yml up -d"
   ```
