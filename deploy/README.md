# Production deployment (Raspberry Pi)

Production runs as a second Docker Compose stack on the same Pi as the Sail dev
stack. They share nothing: separate compose project, separate MySQL volume,
separate `.env`. Nothing here affects `docker-compose.yml` or local development.

```
push to main
  └─ GitHub Actions (ubuntu-24.04-arm)
       ├─ php artisan test          ← gates everything below
       ├─ docker build
       └─ push ghcr.io/hilarycodelab/portfolio_app:<sha> and :latest
              │
   Pi, every 2 min (portfolio-deploy.timer)
       └─ digest changed? → pull → migrate --force → compose up -d
```

## One-time setup

### 1. Deployment directory

The Pi needs the compose file and its environment, but not the source.

```bash
mkdir -p ~/portfolio-prod
cp ~/portfolio_app/docker-compose.prod.yml ~/portfolio-prod/
cp ~/portfolio_app/.env.production.example ~/portfolio-prod/.env.production
```

`docker-compose.prod.yml` is not auto-updated — re-copy it after changing it in
the repo.

### 2. Fill in `.env.production`

Set `APP_URL` to the public hostname, and generate a key that is **not** the
development one:

```bash
docker run --rm ghcr.io/hilarycodelab/portfolio_app:latest \
    php artisan key:generate --show
```

Also set `DB_PASSWORD` and `DB_ROOT_PASSWORD` to fresh values. This file must
never be committed or copied into the image.

### 3. Registry access

GHCR packages are **private by default**, even when the repository is public.
The first workflow run creates the package private, so the Pi cannot pull it
until you choose one of:

- **Make the package public** — GitHub → your profile → Packages →
  `portfolio_app` → Package settings → Change visibility. No credentials needed
  on the Pi afterwards. The image contains compiled application code, which is
  already public in this repo; it does **not** contain `.env.production`
  (excluded by `.dockerignore`).
- **Keep it private and authenticate** — create a personal access token with
  `read:packages`, then:
  ```bash
  echo "$TOKEN" | docker login ghcr.io -u HilaryCodeLab --password-stdin
  ```

### 4. Install the deploy service

```bash
sudo cp ~/portfolio_app/deploy/poll-deploy.sh /usr/local/bin/portfolio-deploy
sudo chmod +x /usr/local/bin/portfolio-deploy
sudo cp ~/portfolio_app/deploy/portfolio-deploy.{service,timer} /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-deploy.timer
```

Verify:

```bash
systemctl list-timers portfolio-deploy.timer
journalctl -u portfolio-deploy.service -f
```

### 5. First deploy

Run it once by hand rather than waiting for the timer, so failures are visible:

```bash
sudo systemctl start portfolio-deploy.service
journalctl -u portfolio-deploy.service -n 50
```

## Operations

**Roll back** to any previously built commit — every build is tagged with its
full SHA:

```bash
cd ~/portfolio-prod
APP_IMAGE=ghcr.io/hilarycodelab/portfolio_app:sha-<full-sha> \
  docker compose --env-file .env.production -f docker-compose.prod.yml \
  -p portfolio-prod up -d
```

Stop the timer first, or the next poll will pull `latest` and undo it.

**Logs:**

```bash
docker compose -p portfolio-prod logs -f app
```

**Shell:**

```bash
docker compose -p portfolio-prod exec app sh
```

## Not yet configured

- **Cloudflare Tunnel** — until it is set up, the stack has no published ports
  and is unreachable from anywhere, including the LAN. That is deliberate: it
  should not be exposed before `.env.production` is correct.
- **Mail** — `MAIL_MAILER=log` means password reset and email verification
  silently do nothing. Sail's mailpit is dev-only and has no production
  counterpart.
