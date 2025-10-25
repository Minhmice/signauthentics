import { format } from "date-fns";

/**
 * Safe date formatting utility that prevents hydration errors
 * Uses date-fns for consistent formatting across server and client
 */
export function formatDate(date: Date | string | undefined, formatStr = "MMM dd, yyyy"): string {
  if (!date) return "";
  
  const d = typeof date === "string" ? new Date(date) : date;
  
  // Validate date
  if (isNaN(d.getTime())) return "";
  
  return format(d, formatStr);
}

/**
 * Format date range safely
 */
export function formatDateRange(from?: Date | string, to?: Date | string): string {
  if (!from) return "";
  if (!to) return formatDate(from);
  return `${formatDate(from)} - ${formatDate(to)}`;
}

/**
 * Format date for Vietnamese locale
 */
export function formatDateVN(date: Date | string | undefined): string {
  return formatDate(date, "dd/MM/yyyy");
}

/**
 * Format date with time
 */
export function formatDateTime(date: Date | string | undefined): string {
  return formatDate(date, "MMM dd, yyyy HH:mm");
}

/**
 * Get relative time (e.g., "2 hours ago")
 * Only use on client side to avoid hydration issues
 */
export function getRelativeTime(date: Date | string): string {
  const now = new Date();
  const target = typeof date === "string" ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDate(target);
}
