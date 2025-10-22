import crypto from 'crypto'

interface ImageLoaderProps {
  src: string
  width: number
  quality?: number
}

export default function imgproxyLoader({ src, width, quality = 80 }: ImageLoaderProps) {
  const baseUrl = process.env.NEXT_PUBLIC_IMGPROXY_BASE || 'http://localhost:8080'
  const key = process.env.IMGPROXY_KEY
  const salt = process.env.IMGPROXY_SALT
  
  if (!key || !salt) {
    return `${baseUrl}/unsafe/rs:fit:${width}/plain/${src}`
  }
  
  // Create imgproxy URL with signature
  const path = `/rs:fit:${width}/q:${quality}/plain/${src}`
  const signature = crypto
    .createHmac('sha256', Buffer.from(salt, 'base64'))
    .update(path)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
  
  return `${baseUrl}/${signature}${path}`
}