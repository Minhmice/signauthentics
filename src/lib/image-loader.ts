/**
 * Custom Image Loader for Next.js
 * Handles local images without external loader
 */

export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // For local images, return as-is
  if (src.startsWith('/')) {
    return src;
  }
  
  // For external images, you can add your CDN logic here
  return src;
}
