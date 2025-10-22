import { NextResponse } from 'next/server'

export async function GET() {
  const services = ['postgres', 'minio', 'redis', 'meilisearch', 'imgproxy']
  
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services
  })
}