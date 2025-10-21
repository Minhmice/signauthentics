# 🚀 SIGNAUTHENTICS DEPLOYMENT RUNBOOK

Complete operational guide for deploying and managing the Signauthentics stack on Raspberry Pi 5.

---

## 📋 TABLE OF CONTENTS

1. [Prerequisites](#prerequisites)
2. [First-Time Setup](#first-time-setup)
3. [Daily Operations](#daily-operations)
4. [Troubleshooting](#troubleshooting)
5. [Rollback Procedures](#rollback-procedures)
6. [Monitoring](#monitoring)
7. [Backup & Restore](#backup--restore)

---

## 🔧 PREREQUISITES

### Hardware
- Raspberry Pi 5 (ARM64)
- Minimum 4GB RAM (8GB recommended)
- 32GB+ SD card
- Stable network connection

### Software
- Debian GNU/Linux 13 (trixie) or newer
- Docker 28.5.1+
- Docker Compose v2.40.0+
- Cloudflare account with domain `minhmice.com`

**Check versions:**
```bash
docker --version
docker compose version
uname -a
```

---

## 🎬 FIRST-TIME SETUP

### Step 1: Clone Repository to Pi

```bash
ssh minhmice@192.168.41.179
cd ~
git clone https://github.com/Minhmice/signauthentics.git signauthentics-stack
cd signauthentics-stack
```

### Step 2: Configure Environment

```bash
# Copy environment template
cp ops/environment.template .env

# Generate secure secrets
openssl rand -hex 32  # For IMGPROXY_KEY
openssl rand -hex 32  # For IMGPROXY_SALT
openssl rand -base64 32  # For MEILI_MASTER_KEY

# Edit .env with your secrets
nano .env
```

**Required changes in `.env`:**
- `POSTGRES_PASSWORD` - Strong password (16+ chars)
- `IMGPROXY_KEY` - Generated hex string
- `IMGPROXY_SALT` - Generated hex string
- `MEILI_MASTER_KEY` - Generated base64 string

### Step 3: Setup Cloudflare Tunnel

**Ref:** https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/

```bash
# Login to Cloudflare
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create signauthentics-tunnel

# This creates credentials.json - copy it
cp ~/.cloudflared/<tunnel-id>.json ./cloudflared/credentials.json
chmod 600 ./cloudflared/credentials.json

# Configure DNS routes
cloudflared tunnel route dns signauthentics-tunnel app.minhmice.com
cloudflared tunnel route dns signauthentics-tunnel backend.minhmice.com
cloudflared tunnel route dns signauthentics-tunnel img.minhmice.com

# Verify routes
cloudflared tunnel info signauthentics-tunnel
```

### Step 4: Make Scripts Executable

```bash
chmod +x scripts/*.sh
chmod +x ops/init-db.sh
```

### Step 5: Bring Up Infrastructure Services

**Ref:** https://docs.docker.com/compose/

```bash
# Start database, MinIO, cache, search
docker compose up -d db minio cache meilisearch

# Wait 30 seconds for services to initialize
sleep 30
```

### Step 6: Verify Service Health

```bash
# PostgreSQL
docker compose exec db pg_isready -U postgres -d signauthentics
# Expected: "signauthentics - accepting connections"

# MinIO
curl -w "\nStatus: %{http_code}\n" http://localhost:9000/minio/health/ready
# Expected: Status: 200

# Redis/Valkey
docker compose exec cache valkey-cli ping
# Expected: PONG

# Meilisearch
curl -w "\nStatus: %{http_code}\n" http://localhost:7700/health
# Expected: Status: 200
```

**Ref:** 
- PostgreSQL health: https://www.postgresql.org/docs/current/app-pg-isready.html
- MinIO health: https://min.io/docs/minio/linux/operations/monitoring/healthcheck-probe.html
- Meilisearch health: https://www.meilisearch.com/docs/reference/api/health

### Step 7: Initialize MinIO Bucket

```bash
./scripts/seed_minio.sh
```

This creates the `signauthentics-media` bucket and folder structure.

### Step 8: Build or Pull Web Image

**Option A: Pull from GHCR (after CI builds)**
```bash
docker compose pull web
```

**Option B: Build locally (first time or testing)**
```bash
docker compose build web
```

### Step 9: Start Web Service

```bash
docker compose up -d web

# Wait for health check
sleep 20

# Verify
curl http://localhost:3000/api/healthz
# Expected: {"status":"ok",...}
```

### Step 10: Run Database Migrations

**Ref:** https://orm.drizzle.team/kit-docs/overview

```bash
./scripts/migrate.sh
```

### Step 11: Start imgproxy

```bash
docker compose up -d imgproxy

# Verify
curl http://localhost:8080/health
# Expected: OK
```

**Ref:** https://docs.imgproxy.net/healthcheck

### Step 12: Start Cloudflare Tunnel

```bash
docker compose up -d cloudflared

# Check logs
docker compose logs -f cloudflared
# Look for: "Connection <X> registered"
```

### Step 13: Verify Public Access

```bash
# From any device
curl https://app.minhmice.com/api/healthz
curl https://backend.minhmice.com/api/healthz
curl -I https://img.minhmice.com/health
```

---

## 📅 DAILY OPERATIONS

### Deploy New Version

**Ref:** https://docs.docker.com/compose/reference/

```bash
cd ~/signauthentics-stack

# Pull latest image (built by GitHub Actions)
./scripts/deploy.sh

# Or manually:
docker compose pull web
docker compose up -d web

# Check health
curl http://localhost:3000/api/healthz
```

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f web
docker compose logs -f imgproxy
docker compose logs -f db

# Last 100 lines
docker compose logs --tail=100 web
```

### Run Database Migrations

```bash
./scripts/migrate.sh
```

### Restart a Service

```bash
docker compose restart web
docker compose restart imgproxy
docker compose restart cloudflared
```

### Check Service Status

```bash
docker compose ps

# Detailed health
docker compose ps --format json | jq '.[].Health'
```

---

## 🔍 TROUBLESHOOTING

### Web Service Won't Start

```bash
# Check logs
docker compose logs web

# Common issues:
# 1. Database not ready
docker compose exec db pg_isready

# 2. Missing environment variables
docker compose config | grep -A 20 web

# 3. Port conflict
sudo ss -tulpn | grep :3000
```

### imgproxy Returns 403 Errors

**Issue:** URL signature mismatch

```bash
# Verify IMGPROXY_KEY and IMGPROXY_SALT match in:
# 1. docker-compose.yml (imgproxy service)
# 2. .env (web service)
# 3. Next.js imgproxy-loader.ts

# Restart both services
docker compose restart imgproxy web
```

**Ref:** https://docs.imgproxy.net/usage/signing_url

### MinIO Connection Refused

```bash
# Check MinIO is running
docker compose ps minio

# Test connectivity from web container
docker compose exec web wget -O- http://minio:9000/minio/health/ready

# Check credentials
docker compose exec minio printenv | grep MINIO_
```

### Cloudflare Tunnel Disconnected

```bash
# Check tunnel status
docker compose logs cloudflared

# Verify credentials.json exists
ls -lh ./cloudflared/credentials.json

# Restart tunnel
docker compose restart cloudflared

# Check from Cloudflare dashboard:
# https://one.dash.cloudflare.com/
```

### Database Connection Errors

```bash
# Check database is running
docker compose ps db

# Test connection
docker compose exec db psql -U postgres -d signauthentics -c "SELECT version();"

# Check migrations
docker compose exec web npm run db:studio
```

---

## ⏮️ ROLLBACK PROCEDURES

### Rollback to Previous Image

```bash
# List available images
docker images ghcr.io/minhmice/signauthentics

# Pull specific tag
docker pull ghcr.io/minhmice/signauthentics:main-abc1234

# Update docker-compose.yml temporarily or use:
IMAGE_TAG=main-abc1234 docker compose up -d web

# Verify
curl http://localhost:3000/api/healthz
```

### Rollback Database Migration

```bash
# Connect to database
docker compose exec db psql -U postgres -d signauthentics

# Manual rollback (example)
# DROP TABLE new_table;
# ALTER TABLE old_table ...;

# Or use Drizzle rollback (if implemented)
docker compose exec web npm run db:rollback
```

---

## 📊 MONITORING

### Health Checks

```bash
# Script to check all services
cat > check_health.sh << 'EOF'
#!/bin/bash
echo "🔍 Checking service health..."
echo ""
echo "Postgres:"; docker compose exec db pg_isready
echo "MinIO:"; curl -sf http://localhost:9000/minio/health/ready && echo "OK" || echo "FAIL"
echo "Redis:"; docker compose exec cache valkey-cli ping
echo "Meilisearch:"; curl -sf http://localhost:7700/health > /dev/null && echo "OK" || echo "FAIL"
echo "imgproxy:"; curl -sf http://localhost:8080/health
echo "Web:"; curl -sf http://localhost:3000/api/healthz | jq .status
EOF

chmod +x check_health.sh
./check_health.sh
```

### Resource Usage

```bash
# Container stats
docker stats --no-stream

# Disk usage
df -h
docker system df

# Memory
free -h
```

### Container Logs Location

```bash
# View with journalctl (if using systemd)
journalctl -u docker -f

# Or Docker logs
docker compose logs --since 1h
```

---

## 💾 BACKUP & RESTORE

### Automated Daily Backup

```bash
# Setup cron job
crontab -e

# Add this line (runs at 2 AM daily):
0 2 * * * /home/minhmice/signauthentics-stack/scripts/backup_db.sh >> /home/minhmice/backup.log 2>&1
```

**Ref:** https://www.postgresql.org/docs/current/app-pg-dump.html

### Manual Backup

```bash
./scripts/backup_db.sh

# Backups stored in: ~/backups/signauthentics/
ls -lh ~/backups/signauthentics/
```

### Restore from Backup

```bash
# Stop web service
docker compose stop web

# Restore database
gunzip -c ~/backups/signauthentics/signauthentics_2025-10-21_02-00-00.sql.gz | \
  docker compose exec -T db psql -U postgres -d signauthentics

# Restart web
docker compose start web
```

### Backup MinIO Data

```bash
# Option 1: Volume backup
docker run --rm \
  -v signauthentics_minio_data:/data \
  -v ~/backups:/backup \
  alpine tar czf /backup/minio_$(date +%F).tar.gz /data

# Option 2: Use mc (MinIO Client)
docker compose exec minio mc mirror local/signauthentics-media /backup/media
```

---

## 🔐 SECURITY CHECKLIST

- [ ] `.env` file permissions: `chmod 600 .env`
- [ ] Strong passwords (16+ chars) for Postgres, MinIO, Meilisearch
- [ ] imgproxy URL signing enabled (IMGPROXY_KEY/SALT set)
- [ ] MinIO ports (9000, 9001) NOT exposed to internet
- [ ] Cloudflare Tunnel used (no direct port 80/443 exposure)
- [ ] Regular backups automated via cron
- [ ] Credentials in `.env`, NOT in docker-compose.yml
- [ ] GitHub secrets configured for CI/CD
- [ ] SSH key authentication (password auth disabled)

---

## 📚 REFERENCES

- **Docker Compose:** https://docs.docker.com/compose/
- **PostgreSQL:** https://www.postgresql.org/docs/current/
- **MinIO:** https://min.io/docs/minio/linux/index.html
- **imgproxy:** https://docs.imgproxy.net/
- **Meilisearch:** https://www.meilisearch.com/docs
- **Cloudflare Tunnel:** https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/
- **Next.js Standalone:** https://nextjs.org/docs/advanced-features/output-file-tracing
- **Drizzle ORM:** https://orm.drizzle.team/

---

**Last Updated:** October 2025  
**Maintained by:** Minhmice  
**Support:** https://github.com/Minhmice/signauthentics/issues

