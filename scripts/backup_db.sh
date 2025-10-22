#!/bin/bash
# ============================================
# DATABASE BACKUP SCRIPT
# ============================================
# Ref: https://www.postgresql.org/docs/current/app-pg-dump.html
# Run this daily via cron: 0 2 * * * ~/signauthentics-stack/scripts/backup_db.sh

set -e

# Configuration
BACKUP_DIR="$HOME/backups/signauthentics"
RETENTION_DAYS=14
DATE=$(date +%Y-%m-%d_%H-%M-%S)

# Navigate to project directory
cd "$(dirname "$0")/.."

# Create backup directory if not exists
mkdir -p "$BACKUP_DIR"

echo "💾 Starting database backup..."

# Check if db container is running
if ! docker compose ps db | grep -q "Up"; then
    echo "❌ Error: Database container is not running!"
    exit 1
fi

# Load environment variables
source .env

# Backup database
BACKUP_FILE="$BACKUP_DIR/signauthentics_${DATE}.sql"
echo "📦 Creating backup: $BACKUP_FILE"

docker compose exec -T db pg_dump \
    -U "${POSTGRES_USER:-postgres}" \
    -d "${POSTGRES_DB:-signauthentics}" \
    --format=plain \
    --no-owner \
    --no-privileges \
    > "$BACKUP_FILE"

# Compress backup
echo "🗜️  Compressing backup..."
gzip "$BACKUP_FILE"
BACKUP_FILE="${BACKUP_FILE}.gz"

# Calculate size
BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
echo "✅ Backup created: $BACKUP_FILE (${BACKUP_SIZE})"

# Cleanup old backups
echo "🧹 Removing backups older than ${RETENTION_DAYS} days..."
find "$BACKUP_DIR" -name "signauthentics_*.sql.gz" -mtime +${RETENTION_DAYS} -delete

# List recent backups
echo ""
echo "📋 Recent backups:"
ls -lh "$BACKUP_DIR" | tail -5

echo "✅ Backup complete!"

# Optional: Upload to MinIO/S3
# Uncomment if you want to sync to object storage
# echo "☁️  Uploading to MinIO..."
# docker compose exec -T minio mc cp "$BACKUP_FILE" minio/backups/

