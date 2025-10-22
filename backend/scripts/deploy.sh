#!/bin/bash
set -e

echo "🚀 Deploying Signauthentics..."

# Pull latest images
docker compose pull

# Start services
docker compose up -d

# Wait for health checks
echo "⏳ Waiting for services to be healthy..."
sleep 30

# Check health
echo "🔍 Checking service health..."
docker compose ps

echo "✅ Deployment complete!"