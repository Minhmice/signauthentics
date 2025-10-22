#!/bin/bash
set -e

BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/signauthentics_$DATE.sql"

mkdir -p $BACKUP_DIR

echo "💾 Backing up database..."

# Create backup
docker compose exec -T db pg_dump -U postgres football > $BACKUP_FILE

echo "✅ Backup created: $BACKUP_FILE"

# Keep only last 7 days
find $BACKUP_DIR -name "signauthentics_*.sql" -mtime +7 -delete

echo "🧹 Old backups cleaned up"