/**
 * KPI Card Component
 * Hiển thị số liệu quan trọng với trend và icon
 * Wrapper cho shadcn Card với styling dashboard-specific
 */

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  iconColor?: string;
  description?: string;
  loading?: boolean;
}

export function KPICard({
  label,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  iconColor = "text-blue-500",
  description,
  loading = false,
}: KPICardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  if (loading) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-zinc-800 rounded w-24" />
            <div className="h-8 bg-zinc-800 rounded w-32" />
            <div className="h-3 bg-zinc-800 rounded w-16" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-sm text-zinc-500 mb-2 font-medium">{label}</div>
            <div className="text-3xl font-bold text-white mb-2">{value}</div>
            {change && (
              <div className="flex items-center gap-1.5">
                <TrendIcon
                  className={cn(
                    "w-4 h-4",
                    trend === "up" && "text-green-500",
                    trend === "down" && "text-red-500",
                    trend === "neutral" && "text-zinc-500"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-semibold",
                    trend === "up" && "text-green-500",
                    trend === "down" && "text-red-500",
                    trend === "neutral" && "text-zinc-500"
                  )}
                >
                  {change}
                </span>
                {description && <span className="text-xs text-zinc-500 ml-1">{description}</span>}
              </div>
            )}
          </div>

          {Icon && (
            <div className={cn("p-3 rounded-xl bg-zinc-800/50", iconColor)}>
              <Icon className="w-6 h-6" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * KPI Grid Component
 * Container để hiển thị nhiều KPI cards trong grid layout
 */
interface KPIGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
}

export function KPIGrid({ children, columns = 4 }: KPIGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      )}
    >
      {children}
    </div>
  );
}

