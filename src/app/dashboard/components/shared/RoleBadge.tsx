/**
 * Role Badge Component
 * Hiển thị role visibility và access level info trên wireframe
 * Theo yêu cầu: "Visible: Admin, Seller; Read-only: Editor"
 */

import * as React from "react";
import { UserRole } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";
import { Eye, Lock, User } from "lucide-react";

interface RoleBadgeProps {
  visibleFor?: UserRole[];
  readOnlyFor?: UserRole[];
  ownOnlyFor?: UserRole[];
  className?: string;
  compact?: boolean;
}

export function RoleBadge({ visibleFor, readOnlyFor, ownOnlyFor, className, compact = false }: RoleBadgeProps) {
  if (compact) {
    return (
      <div className={cn("inline-flex items-center gap-1.5 text-xs", className)}>
        {visibleFor && visibleFor.length > 0 && (
          <span className="px-2 py-0.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded">
            <Eye className="w-3 h-3 inline mr-1" />
            {visibleFor.length}
          </span>
        )}
        {readOnlyFor && readOnlyFor.length > 0 && (
          <span className="px-2 py-0.5 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded">
            <Lock className="w-3 h-3 inline mr-1" />
            {readOnlyFor.length}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-2 px-3 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-xs",
        className
      )}
    >
      {visibleFor && visibleFor.length > 0 && (
        <div className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-green-500" />
          <span className="text-zinc-400">Visible:</span>
          <span className="text-green-400 font-medium capitalize">{visibleFor.join(", ")}</span>
        </div>
      )}
      {readOnlyFor && readOnlyFor.length > 0 && (
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-orange-500" />
          <span className="text-zinc-400">Read-only:</span>
          <span className="text-orange-400 font-medium capitalize">{readOnlyFor.join(", ")}</span>
        </div>
      )}
      {ownOnlyFor && ownOnlyFor.length > 0 && (
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-zinc-400">Own-only:</span>
          <span className="text-blue-400 font-medium capitalize">{ownOnlyFor.join(", ")}</span>
        </div>
      )}
    </div>
  );
}

/**
 * Section Header với Role Badge tích hợp
 * Dùng cho các section trong wireframe
 */
interface DashboardSectionHeaderProps {
  title: string;
  description?: string;
  visibleFor?: UserRole[];
  readOnlyFor?: UserRole[];
  ownOnlyFor?: UserRole[];
  actions?: React.ReactNode;
}

export function DashboardSectionHeader({
  title,
  description,
  visibleFor,
  readOnlyFor,
  ownOnlyFor,
  actions,
}: DashboardSectionHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
          {description && <p className="text-sm text-zinc-500 mt-1">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {(visibleFor || readOnlyFor || ownOnlyFor) && (
        <RoleBadge visibleFor={visibleFor} readOnlyFor={readOnlyFor} ownOnlyFor={ownOnlyFor} />
      )}
    </div>
  );
}

