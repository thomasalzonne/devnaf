# nuxt-app

## Installation

### Docker

#### Production

The simplest way to deploy app via Docker is via `docker-compose.prod.yml` configuration file.
To do that you need to install [Docker](https://docs.docker.com/get-docker/) on your VPS.
Then execute `docker-compose -f docker-compose.prod.yml up -d --build` command in your terminal.

> When using a Virtual Private Server (VPS) we recommend having at least 2GB of RAM memory

**Quick deploy:**

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

cp .env.defaults .env
docker-compose -f docker-compose.prod.yml up -d --build
```
