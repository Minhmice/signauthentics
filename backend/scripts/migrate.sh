#!/bin/bash
set -e

echo "🔄 Running database migrations..."

# Run migrations inside web container
docker compose exec web npm run db:migrate

echo "✅ Migrations complete!"