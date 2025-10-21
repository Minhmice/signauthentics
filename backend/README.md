# 🎯 SIGNAUTHENTICS BACKEND INFRASTRUCTURE

Complete Docker-based backend infrastructure for deploying Signauthentics on Raspberry Pi 5.

---

## 📁 STRUCTURE

```
backend/
├── docker-compose.yml          # Main orchestration file
├── Dockerfile                  # Next.js app container
├── ops/
│   ├── RUNBOOK.md             # Complete operational guide ⭐
│   ├── environment.template   # Environment variables template
│   ├── init-db.sh            # PostgreSQL initialization
│   └── redis.conf            # Redis/Valkey configuration
├── cloudflared/
│   ├── config.yml            # Cloudflare Tunnel config
│   └── credentials.json      # (You need to add this)
├── scripts/
│   ├── deploy.sh             # Deploy/update script
│   ├── migrate.sh            # Database migrations
│   ├── backup_db.sh          # Database backup
│   └── seed_minio.sh         # MinIO initialization
└── README.md                 # This file
```

---

## 🚀 QUICK START

### 1. Deploy to Raspberry Pi

```bash
# On your local machine
cd C:\Users\Minhmice\Documents\Project\signauthentics
git add backend/
git commit -m "Add backend infrastructure"
git push origin main

# On Raspberry Pi
ssh minhmice@192.168.41.179
cd ~
git clone https://github.com/Minhmice/signauthentics.git signauthentics-stack
cd signauthentics-stack/backend
```

### 2. Configure Environment

```bash
# Copy template to .env
cp ops/environment.template .env

# Generate secrets
openssl rand -hex 32  # IMGPROXY_KEY
openssl rand -hex 32  # IMGPROXY_SALT  
openssl rand -base64 32  # MEILI_MASTER_KEY

# Edit .env with your secrets
nano .env
```

### 3. Setup Cloudflare Tunnel

```bash
# Create tunnel and get credentials
cloudflared tunnel create signauthentics-tunnel

# Copy credentials
cp ~/.cloudflared/<tunnel-id>.json ./cloudflared/credentials.json

# Route DNS
cloudflared tunnel route dns signauthentics-tunnel app.minhmice.com
cloudflared tunnel route dns signauthentics-tunnel backend.minhmice.com
cloudflared tunnel route dns signauthentics-tunnel img.minhmice.com
```

### 4. Launch Stack

```bash
# Start infrastructure services
docker compose up -d db minio cache meilisearch
sleep 30

# Initialize MinIO bucket
chmod +x scripts/*.sh
./scripts/seed_minio.sh

# Start web (pull from GHCR)
docker compose pull web
docker compose up -d web

# Run migrations
./scripts/migrate.sh

# Start imgproxy & tunnel
docker compose up -d imgproxy cloudflared
```

### 5. Verify

```bash
# Local checks
curl http://localhost:3000/api/healthz
curl http://localhost:8080/health

# Public checks (from anywhere)
curl https://app.minhmice.com/api/healthz
curl https://backend.minhmice.com/api/healthz
curl -I https://img.minhmice.com/health
```

---

## 📚 FULL DOCUMENTATION

**Read the complete guide:** [`ops/RUNBOOK.md`](ops/RUNBOOK.md)

Covers:
- ✅ First-time setup (step-by-step)
- ✅ Daily operations (deploy, logs, restart)
- ✅ Troubleshooting (common issues)
- ✅ Rollback procedures
- ✅ Backup & restore
- ✅ Monitoring & health checks

---

## 🏗️ STACK ARCHITECTURE

```
┌─────────────────────────────────────────┐
│        CLOUDFLARE TUNNEL (Ingress)      │
│  app.minhmice.com                       │
│  backend.minhmice.com                   │
│  img.minhmice.com                       │
└────────────┬────────────────────────────┘
             │
    ┌────────┴─────────┬──────────┐
    │                  │          │
┌───▼────┐      ┌─────▼──┐   ┌──▼──────┐
│  WEB   │      │ IMGPROXY│   │         │
│ :3000  │◄─────┤  :8080  │◄──┤  MINIO  │
└───┬────┘      └─────────┘   │  :9000  │
    │                          └─────────┘
    │
    ├──────────┬──────────┬──────────┐
    │          │          │          │
┌───▼──┐   ┌──▼───┐  ┌───▼────┐ ┌───▼─────┐
│ PG   │   │REDIS │  │ MEILI  │ │ (future)│
│:5432 │   │:6379 │  │ :7700  │ │         │
└──────┘   └──────┘  └────────┘ └─────────┘
```

**Services:**
- **PostgreSQL 16**: Primary database
- **MinIO**: S3-compatible object storage (private)
- **imgproxy**: Image optimization & signing
- **Redis/Valkey**: Cache & job queue
- **Meilisearch**: Full-text search
- **Next.js Web**: Frontend + API routes
- **Cloudflare Tunnel**: Secure ingress (no public IP needed)

---

## 🔄 CI/CD WORKFLOW

**GitHub Actions** builds ARM64 image on every push:

```yaml
# .github/workflows/deploy.yml
Push to main → Build ARM64 → Push to GHCR
```

**On Raspberry Pi**, deploy with one command:

```bash
./scripts/deploy.sh
# Pulls latest image, restarts web, cleans up old images
```

---

## 📊 SERVICE ENDPOINTS

### Internal (Docker network)
- Web: `http://web:3000`
- API: `http://web:3000/api/*`
- Database: `postgresql://db:5432/signauthentics`
- MinIO: `http://minio:9000`
- imgproxy: `http://imgproxy:8080`
- Redis: `redis://cache:6379`
- Meilisearch: `http://meilisearch:7700`

### External (via Cloudflare Tunnel)
- Frontend: `https://app.minhmice.com`
- API: `https://backend.minhmice.com/api/*`
- Images: `https://img.minhmice.com`

### Admin Consoles (localhost only)
- MinIO Console: `http://localhost:9001`
- Meilisearch: `http://localhost:7700`

---

## 🔐 SECURITY NOTES

1. **MinIO NOT exposed publicly** - images served only via imgproxy
2. **imgproxy URL signing enabled** - prevents unauthorized access
3. **Cloudflare Tunnel** - no need to expose ports 80/443
4. **Environment secrets** - never commit `.env` to git
5. **Database backups** - automated daily via cron

---

## 🛠️ COMMON COMMANDS

```bash
# View logs
docker compose logs -f web

# Restart service
docker compose restart web

# Update to latest
./scripts/deploy.sh

# Run migrations
./scripts/migrate.sh

# Backup database
./scripts/backup_db.sh

# Check health
curl http://localhost:3000/api/healthz
```

---

## 📞 SUPPORT

- **Issues**: https://github.com/Minhmice/signauthentics/issues
- **Docs**: See `ops/RUNBOOK.md`
- **References**:
  - Docker Compose: https://docs.docker.com/compose/
  - Cloudflare Tunnel: https://developers.cloudflare.com/cloudflare-one/
  - imgproxy: https://docs.imgproxy.net/
  - Next.js: https://nextjs.org/docs

---

**Last Updated:** October 2025  
**Platform:** Raspberry Pi 5 (ARM64)  
**Stack:** Docker Compose + Cloudflare Tunnel

