#!/bin/bash
set -e

echo "🌱 Seeding MinIO bucket..."

# Wait for MinIO to be ready
sleep 10

# Create bucket using MinIO client
docker compose exec minio mc alias set local http://localhost:9000 minhmice $MINIO_ROOT_PASSWORD
docker compose exec minio mc mb local/media --ignore-existing
docker compose exec minio mc policy set public local/media

echo "✅ MinIO bucket 'media' created and configured!"