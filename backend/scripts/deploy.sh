#!/bin/bash
# ============================================
# DEPLOY SCRIPT - Pull & Restart Web Service
# ============================================
# Ref: https://docs.docker.com/compose/reference/

set -e

echo "🚀 Starting deployment..."

# Navigate to project directory
cd "$(dirname "$0")/.."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Copy ops/environment.template to .env and configure it first."
    exit 1
fi

# Pull latest image
echo "📦 Pulling latest image..."
docker compose pull web

# Restart web service
echo "🔄 Restarting web service..."
docker compose up -d web

# Wait for health check
echo "⏳ Waiting for service to be healthy..."
sleep 10

# Check health
if curl -f http://localhost:3000/api/healthz > /dev/null 2>&1; then
    echo "✅ Deployment successful! Service is healthy."
else
    echo "⚠️  Warning: Health check failed. Check logs with: docker compose logs web"
fi

# Cleanup old images
echo "🧹 Cleaning up old images..."
docker image prune -f

echo "✅ Deployment complete!"

