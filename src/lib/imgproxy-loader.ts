// ============================================
// IMGPROXY IMAGE LOADER FOR NEXT.JS
// ============================================
// Ref: https://nextjs.org/docs/api-reference/next/image#loader
// Ref: https://docs.imgproxy.net/usage/processing
// Ref: https://docs.imgproxy.net/usage/signing_url

import { createHmac } from 'crypto';

interface ImgproxyLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Generate signed imgproxy URL
 * Ref: https://docs.imgproxy.net/usage/signing_url
 */
function signUrl(path: string): string {
  const key = process.env.IMGPROXY_KEY;
  const salt = process.env.IMGPROXY_SALT;

  // If no key/salt, return unsigned URL (dev only)
  if (!key || !salt) {
    console.warn('IMGPROXY_KEY or IMGPROXY_SALT not set - using unsigned URLs');
    return path;
  }

  const keyBin = Buffer.from(key, 'hex');
  const saltBin = Buffer.from(salt, 'hex');

  const hmac = createHmac('sha256', keyBin);
  hmac.update(saltBin);
  hmac.update(path);

  const signature = hmac.digest('base64url');

  return `/${signature}${path}`;
}

/**
 * Custom image loader for Next.js Image component
 * Automatically routes through imgproxy
 */
export default function imgproxyLoader({
  src,
  width,
  quality = 85,
}: ImgproxyLoaderProps): string {
  const imgproxyUrl = process.env.NEXT_PUBLIC_IMGPROXY_URL || 'http://localhost:8080';

  // Handle absolute URLs (external images)
  let encodedSrc: string;
  if (src.startsWith('http://') || src.startsWith('https://')) {
    encodedSrc = Buffer.from(src).toString('base64url');
  } else if (src.startsWith('s3://')) {
    // S3/MinIO paths
    encodedSrc = Buffer.from(src).toString('base64url');
  } else {
    // Local paths - assume MinIO bucket
    const bucket = process.env.MINIO_BUCKET || 'signauthentics-media';
    const s3Path = `s3://${bucket}${src.startsWith('/') ? src : `/${src}`}`;
    encodedSrc = Buffer.from(s3Path).toString('base64url');
  }

  // Build imgproxy processing options
  // Ref: https://docs.imgproxy.net/usage/processing
  const resize = 'fit'; // or 'fill', 'auto'
  const format = 'webp'; // Auto WebP conversion
  const enlarge = 0; // Don't enlarge small images

  // Path format: /resize:fit:width:0/quality:85/format:webp/plain/encoded_src
  const path = `/resize:${resize}:${width}:0/quality:${quality}/format:${format}/enlarge:${enlarge}/plain/${encodedSrc}`;

  // Sign URL for security
  const signedPath = signUrl(path);

  return `${imgproxyUrl}${signedPath}`;
}

/**
 * Helper: Generate imgproxy URL for direct use (outside Next.js Image)
 */
export function generateImgproxyUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
    resize?: 'fit' | 'fill' | 'auto';
  } = {}
): string {
  const {
    width = 0,
    height = 0,
    quality = 85,
    format = 'webp',
    resize = 'fit',
  } = options;

  const imgproxyUrl = process.env.NEXT_PUBLIC_IMGPROXY_URL || 'http://localhost:8080';

  // Encode source
  let encodedSrc: string;
  if (src.startsWith('http://') || src.startsWith('https://')) {
    encodedSrc = Buffer.from(src).toString('base64url');
  } else if (src.startsWith('s3://')) {
    encodedSrc = Buffer.from(src).toString('base64url');
  } else {
    const bucket = process.env.MINIO_BUCKET || 'signauthentics-media';
    const s3Path = `s3://${bucket}${src.startsWith('/') ? src : `/${src}`}`;
    encodedSrc = Buffer.from(s3Path).toString('base64url');
  }

  const path = `/resize:${resize}:${width}:${height}/quality:${quality}/format:${format}/plain/${encodedSrc}`;
  const signedPath = signUrl(path);

  return `${imgproxyUrl}${signedPath}`;
}

