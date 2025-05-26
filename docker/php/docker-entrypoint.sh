#!/bin/sh
set -e

# Path to a flag file to indicate that seeding has been done
SEED_FLAG_FILE="/app/database/database-seeded"

# Check if the database has already been seeded
if [ ! -f "$SEED_FLAG_FILE" ]; then
    echo "Running migrations and seeding..."
    cd /app && php artisan migrate --seed

    echo "Creating seed flag file..."
    touch "$SEED_FLAG_FILE"
else
    echo "Database already seeded. Skipping migrations and seeding."
fi

echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start PHP-FPM (daemonized)
php-fpm -D --allow-to-run-as-root

# Start Nginx (foreground)
nginx -g 'daemon off;'
