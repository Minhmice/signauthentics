"use client";

/**
 * StatusBadge Component
 * Reusable status badge với color mapping
 */

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  // Product status
  active: { label: "Active", className: "bg-green-500/10 text-green-500 border-green-500/20" },
  inactive: { label: "Inactive", className: "bg-red-500/10 text-red-500 border-red-500/20" },
  draft: { label: "Draft", className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  
  // Order status
  pending: { label: "Pending", className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  processing: { label: "Processing", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  shipped: { label: "Shipped", className: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  delivered: { label: "Delivered", className: "bg-green-500/10 text-green-500 border-green-500/20" },
  cancelled: { label: "Cancelled", className: "bg-red-500/10 text-red-500 border-red-500/20" },
  
  // Payment status
  paid: { label: "Paid", className: "bg-green-500/10 text-green-500 border-green-500/20" },
  unpaid: { label: "Unpaid", className: "bg-red-500/10 text-red-500 border-red-500/20" },
  refunded: { label: "Refunded", className: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  
  // Auction status
  live: { label: "Live", className: "bg-red-500/10 text-red-500 border-red-500/20" },
  upcoming: { label: "Upcoming", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  ended: { label: "Ended", className: "bg-gray-500/10 text-gray-500 border-gray-500/20" },
  
  // User status
  online: { label: "Online", className: "bg-green-500/10 text-green-500 border-green-500/20" },
  offline: { label: "Offline", className: "bg-gray-500/10 text-gray-500 border-gray-500/20" },
  
  // Article status
  published: { label: "Published", className: "bg-green-500/10 text-green-500 border-green-500/20" },
  archived: { label: "Archived", className: "bg-gray-500/10 text-gray-500 border-gray-500/20" },
  
  // Voucher status
  valid: { label: "Valid", className: "bg-green-500/10 text-green-500 border-green-500/20" },
  expired: { label: "Expired", className: "bg-red-500/10 text-red-500 border-red-500/20" },
  
  // Affiliate status
  approved: { label: "Approved", className: "bg-green-500/10 text-green-500 border-green-500/20" },
  rejected: { label: "Rejected", className: "bg-red-500/10 text-red-500 border-red-500/20" },
  pending_approval: { label: "Pending", className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
};

export function StatusBadge({ status, variant = "outline", className }: StatusBadgeProps) {
  const config = statusConfig[status.toLowerCase()] || {
    label: status,
    className: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  };

  return (
    <Badge
      variant={variant}
      className={cn(
        "text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
