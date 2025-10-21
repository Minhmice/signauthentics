// ============================================
// HEALTH CHECK ENDPOINT
// ============================================
// Ref: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
// Used by Docker healthcheck and monitoring

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Basic health check
    // TODO: Add database connection check if needed
    // const db = await checkDatabaseConnection();
    
    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}

