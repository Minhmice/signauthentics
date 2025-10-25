"use client";

import { useEffect, useState } from "react";
import { formatDate, formatDateRange, formatDateVN, formatDateTime } from "@/lib/utils/date";

/**
 * ClientDate - Safe date rendering component that prevents hydration errors
 * Only renders date after client mount to ensure server/client consistency
 */
interface ClientDateProps {
  date: Date | string | undefined;
  format?: string;
  variant?: "default" | "vn" | "datetime" | "range";
  to?: Date | string | undefined;
  fallback?: string;
  className?: string;
}

export function ClientDate({ 
  date, 
  format: formatStr,
  variant = "default",
  to,
  fallback = "Loading...",
  className
}: ClientDateProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <span className={className}>{fallback}</span>;
  }
  
  let formattedDate = "";
  
  switch (variant) {
    case "vn":
      formattedDate = formatDateVN(date);
      break;
    case "datetime":
      formattedDate = formatDateTime(date);
      break;
    case "range":
      formattedDate = formatDateRange(date, to);
      break;
    default:
      formattedDate = formatDate(date, formatStr);
  }
  
  return <span className={className}>{formattedDate}</span>;
}

/**
 * ClientRelativeTime - Shows relative time (e.g., "2 hours ago")
 * Only use for client-side rendering to avoid hydration issues
 */
interface ClientRelativeTimeProps {
  date: Date | string;
  fallback?: string;
  className?: string;
}

export function ClientRelativeTime({ 
  date, 
  fallback = "Loading...",
  className 
}: ClientRelativeTimeProps) {
  const [mounted, setMounted] = useState(false);
  const [relativeTime, setRelativeTime] = useState(fallback);
  
  useEffect(() => {
    setMounted(true);
    
    if (mounted) {
      const updateTime = () => {
        const now = new Date();
        const target = typeof date === "string" ? new Date(date) : date;
        const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);
        
        if (diffInSeconds < 60) {
          setRelativeTime("Just now");
        } else if (diffInSeconds < 3600) {
          setRelativeTime(`${Math.floor(diffInSeconds / 60)}m ago`);
        } else if (diffInSeconds < 86400) {
          setRelativeTime(`${Math.floor(diffInSeconds / 3600)}h ago`);
        } else if (diffInSeconds < 2592000) {
          setRelativeTime(`${Math.floor(diffInSeconds / 86400)}d ago`);
        } else {
          setRelativeTime(formatDate(target));
        }
      };
      
      updateTime();
      const interval = setInterval(updateTime, 60000); // Update every minute
      
      return () => clearInterval(interval);
    }
  }, [mounted, date]);
  
  return <span className={className}>{relativeTime}</span>;
}
