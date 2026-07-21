#!/usr/bin/env bash
#
# Pulls the current production image from GHCR and, if it changed, migrates and
# restarts the production stack. Run every couple of minutes by
# portfolio-deploy.timer.
#
# This is NOT a GitHub Actions runner: it receives no instructions from GitHub
# and can only do what is written here. That is the point — the repo is public,
# so nothing from GitHub is ever executed on this machine.
#
# Install:
#   sudo cp deploy/poll-deploy.sh /usr/local/bin/portfolio-deploy
#   sudo chmod +x /usr/local/bin/portfolio-deploy

set -euo pipefail

DEPLOY_DIR="${DEPLOY_DIR:-/home/hilary_soong/portfolio-prod}"
IMAGE="${IMAGE:-ghcr.io/hilarycodelab/portfolio_app:latest}"
PROJECT="portfolio-prod"

log() { echo "[$(date -Is)] $*"; }

cd "$DEPLOY_DIR"

compose() {
    docker compose \
        --env-file .env.production \
        -f docker-compose.prod.yml \
        -p "$PROJECT" "$@"
}

# Compare the image ID before and after pulling. When nothing has changed the
# pull is just an index check against GHCR — a few KB, not the whole image.
before="$(docker image inspect --format '{{.Id}}' "$IMAGE" 2>/dev/null || echo none)"

if ! docker pull --quiet "$IMAGE" >/dev/null 2>&1; then
    log "pull failed (network or GHCR unavailable) — leaving current release running"
    exit 0
fi

after="$(docker image inspect --format '{{.Id}}' "$IMAGE")"

if [[ "$before" == "$after" ]]; then
    exit 0 # nothing new; stay quiet so the journal isn't flooded
fi

log "new image ${after:0:19} (was ${before:0:19}) — deploying"

# Migrate with the NEW image before it starts serving, so the schema is in place
# by the time the new code handles a request. --force is required because
# APP_ENV=production makes Laravel refuse destructive commands interactively.
# A one-off container is used so this runs even if the app container is down;
# compose still brings mysql up first and waits for its healthcheck.
log "running migrations"
compose run --rm app php artisan migrate --force

log "starting new containers"
compose up -d

# Old images accumulate on every deploy and an SD card fills quickly.
docker image prune -f --filter 'until=168h' >/dev/null 2>&1 || true

log "deploy complete"
