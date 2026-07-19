# syntax=docker/dockerfile:1
#
# Production image for portfolio_app. Built on GitHub Actions (ubuntu-24.04-arm)
# and pulled by the Raspberry Pi. Unlike the Sail image in docker/8.3/, source is
# copied in at build time rather than bind-mounted, so a running container is an
# immutable artifact tied to one commit.

# ---- Stage 1: PHP dependencies -------------------------------------------------
# Resolution runs on the same PHP version as the runtime stage. Using the stock
# composer image instead would resolve against whatever PHP it happens to ship
# (currently 8.5), and composer.lock caps several packages at 8.3.
FROM php:8.3-cli-alpine AS vendor

RUN apk add --no-cache git unzip
COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /app
COPY composer.json composer.lock ./

# --no-scripts/--no-autoloader because the application code isn't here yet;
# the autoloader is generated in the runtime stage once it is.
RUN composer install \
        --no-dev \
        --no-scripts \
        --no-autoloader \
        --prefer-dist \
        --no-interaction

# ---- Stage 2: front-end assets -------------------------------------------------
FROM node:20-alpine AS assets

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# tailwind.config.js scans vendor/laravel/framework for pagination views, so the
# Composer stage has to come first.
COPY --from=vendor /app/vendor ./vendor
COPY resources ./resources
COPY vite.config.js tailwind.config.js postcss.config.js tsconfig.json jsconfig.json ./

RUN npm run build

# ---- Stage 3: runtime ----------------------------------------------------------
FROM php:8.3-fpm-alpine AS runtime

# mariadb-client provides the `mysql` binary, which Laravel shells out to when
# loading database/schema/mysql-schema.sql on a fresh database. Without it,
# `artisan migrate` cannot rebuild the schema.
RUN apk add --no-cache \
        nginx \
        supervisor \
        mariadb-client \
    && docker-php-ext-install -j"$(nproc)" \
        pdo_mysql \
        bcmath \
        opcache \
        pcntl

# php:*-fpm-alpine ships no composer; the autoloader is regenerated below.
COPY --from=vendor /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY docker/production/php.ini        /usr/local/etc/php/conf.d/zz-production.ini
COPY docker/production/nginx.conf     /etc/nginx/http.d/default.conf
COPY docker/production/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/production/entrypoint.sh  /usr/local/bin/entrypoint

RUN chmod +x /usr/local/bin/entrypoint

# Application code, then the two build stages' outputs.
COPY . .
COPY --from=vendor /app/vendor ./vendor
COPY --from=assets /app/public/build ./public/build

# Now that code and vendor coexist, build the optimised classmap and let
# Laravel discover packages.
RUN composer dump-autoload --no-dev --optimize --classmap-authoritative \
    && php artisan package:discover --ansi \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 80

ENTRYPOINT ["entrypoint"]
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
