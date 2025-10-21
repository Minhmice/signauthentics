# ⚡ QUICK START CHECKLIST

Fast-track deployment guide for experienced users.

---

## 📋 PRE-DEPLOYMENT (On Local Machine)

```bash
# 1. Commit & push backend to GitHub
cd C:\Users\Minhmice\Documents\Project\signauthentics
git add backend/ .github/ src/app/api/healthz/ src/lib/imgproxy-loader.ts next.config.ts
git commit -m "Add backend infrastructure"
git push origin main
```

---

## 🚀 DEPLOYMENT (On Raspberry Pi)

### One-Time Setup

```bash
# SSH to Pi
ssh minhmice@192.168.41.179

# Clone repo
git clone https://github.com/Minhmice/signauthentics.git ~/signauthentics-stack
cd ~/signauthentics-stack/backend

# Configure secrets
cp ops/environment.template .env
nano .env
# Fill in:
# - POSTGRES_PASSWORD (16+ chars)
# - IMGPROXY_KEY (openssl rand -hex 32)
# - IMGPROXY_SALT (openssl rand -hex 32)
# - MEILI_MASTER_KEY (openssl rand -base64 32)

# Setup Cloudflare Tunnel
cloudflared tunnel login
cloudflared tunnel create signauthentics-tunnel
cp ~/.cloudflared/<tunnel-id>.json cloudflared/credentials.json

# Route DNS
cloudflared tunnel route dns signauthentics-tunnel app.minhmice.com
cloudflared tunnel route dns signauthentics-tunnel backend.minhmice.com
cloudflared tunnel route dns signauthentics-tunnel img.minhmice.com

# Make scripts executable
chmod +x scripts/*.sh
chmod +x ops/init-db.sh

# Start infrastructure
docker compose up -d db minio cache meilisearch
sleep 30

# Initialize MinIO
./scripts/seed_minio.sh

# Deploy web app
docker compose pull web
docker compose up -d web

# Run migrations
./scripts/migrate.sh

# Start image proxy & tunnel
docker compose up -d imgproxy cloudflared

# Verify
curl http://localhost:3000/api/healthz
curl https://app.minhmice.com/api/healthz
```

### Daily Deploy (After CI builds)

```bash
cd ~/signauthentics-stack/backend
./scripts/deploy.sh
```

---

## ✅ VERIFICATION

```bash
# Local endpoints
curl http://localhost:3000/api/healthz  # {"status":"ok"}
curl http://localhost:8080/health        # OK
curl http://localhost:9000/minio/health/ready  # 200

# Public endpoints
curl https://app.minhmice.com/api/healthz
curl https://backend.minhmice.com/api/healthz
curl -I https://img.minhmice.com/health
```

---

## 🔧 COMMON TASKS

```bash
# View logs
docker compose logs -f web

# Restart service
docker compose restart web

# Run migrations
./scripts/migrate.sh

# Backup database
./scripts/backup_db.sh

# Check status
docker compose ps
```

---

## 📚 FULL DOCS

- **Complete Guide**: `ops/RUNBOOK.md`
- **Architecture**: `README.md`
- **Summary**: `DEPLOYMENT_SUMMARY.md`

