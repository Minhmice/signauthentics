"use client";

import { useEffect, useState } from "react";

/**
 * ClientOnly - Wrapper component that only renders children on client side
 * Prevents hydration mismatches by ensuring server and client render the same thing
 */
interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function ClientOnly({ 
  children, 
  fallback = null, 
  className 
}: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }
  
  return <div className={className}>{children}</div>;
}

/**
 * Hook to check if component is mounted on client
 */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return mounted;
}
