#!/bin/bash
# ============================================
# MINIO BUCKET INITIALIZATION
# ============================================
# Ref: https://min.io/docs/minio/linux/reference/minio-mc.html
# Creates bucket and sets policies

set -e

echo "🪣 Setting up MinIO bucket..."

# Navigate to project directory
cd "$(dirname "$0")/.."

# Check if minio container is running
if ! docker compose ps minio | grep -q "Up"; then
    echo "❌ Error: MinIO container is not running!"
    echo "Start it with: docker compose up -d minio"
    exit 1
fi

# Load environment variables
source .env

# Wait for MinIO to be ready
echo "⏳ Waiting for MinIO to be ready..."
sleep 5

# Configure mc (MinIO Client) alias
echo "🔧 Configuring MinIO client..."
docker compose exec -T minio mc alias set local http://localhost:9000 \
    "${MINIO_ROOT_USER}" \
    "${MINIO_ROOT_PASSWORD}"

# Create bucket
BUCKET="${MINIO_BUCKET:-signauthentics-media}"
echo "📦 Creating bucket: ${BUCKET}"

if docker compose exec -T minio mc mb "local/${BUCKET}" 2>/dev/null; then
    echo "✅ Bucket created successfully"
else
    echo "ℹ️  Bucket already exists"
fi

# Set bucket policy (public read for images)
echo "🔐 Setting bucket policy..."
docker compose exec -T minio mc anonymous set download "local/${BUCKET}"

# Create folder structure
echo "📁 Creating folder structure..."
docker compose exec -T minio mc mb "local/${BUCKET}/products" 2>/dev/null || true
docker compose exec -T minio mc mb "local/${BUCKET}/players" 2>/dev/null || true
docker compose exec -T minio mc mb "local/${BUCKET}/articles" 2>/dev/null || true
docker compose exec -T minio mc mb "local/${BUCKET}/temp" 2>/dev/null || true

# List buckets
echo ""
echo "📋 Current buckets:"
docker compose exec -T minio mc ls local

echo ""
echo "✅ MinIO setup complete!"
echo ""
echo "🌐 Access MinIO Console: http://localhost:9001"
echo "   Username: ${MINIO_ROOT_USER}"
echo "   Password: ${MINIO_ROOT_PASSWORD}"

