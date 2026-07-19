#!/bin/sh
set -e

# storage/ is a named volume, so its ownership survives image rebuilds and can
# drift from the uid php-fpm runs as.
chown -R www-data:www-data storage bootstrap/cache
chmod -R ug+rwX storage bootstrap/cache

# Cached at start rather than at build: the .env is injected at runtime, so a
# build-time cache would freeze the wrong values.
php artisan config:cache
php artisan view:cache

# route:cache is deliberately absent — routes/web.php:28 and :36 use closure
# actions, which cannot be serialised. Converting them to controller actions
# would allow it.

exec "$@"
