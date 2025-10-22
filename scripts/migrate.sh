#!/bin/bash
# ============================================
# DATABASE MIGRATION SCRIPT - Drizzle ORM
# ============================================
# Ref: https://orm.drizzle.team/kit-docs/overview

set -e

echo "🗄️  Running database migrations..."

# Navigate to project directory
cd "$(dirname "$0")/.."

# Check if web container is running
if ! docker compose ps web | grep -q "Up"; then
    echo "❌ Error: Web container is not running!"
    echo "Start it with: docker compose up -d web"
    exit 1
fi

# Run migrations inside web container
echo "📊 Executing Drizzle migrations..."
docker compose exec web npm run db:migrate

echo "✅ Migrations completed successfully!"

# Optional: Show current migration status
echo ""
echo "📋 Migration status:"
docker compose exec web npm run db:studio -- --help 2>/dev/null || echo "Install drizzle-kit to view status"

