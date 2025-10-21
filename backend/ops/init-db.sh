#!/bin/bash
# ============================================
# PostgreSQL Initialization Script
# ============================================
# Ref: https://www.postgresql.org/docs/current/sql-createextension.html
# This script runs once when the database is first created

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Enable UUID generation
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    -- Enable fuzzy text search (trigrams)
    CREATE EXTENSION IF NOT EXISTS "pg_trgm";
    
    -- Log extensions
    SELECT extname, extversion FROM pg_extension WHERE extname IN ('uuid-ossp', 'pg_trgm');
EOSQL

echo "✅ Database extensions initialized successfully"

