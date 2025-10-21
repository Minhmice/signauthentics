"use client";

/**
 * Dashboard Sidebar Component
 * Navigation menu với role-based visibility
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Gavel,
  Ticket,
  Users,
  Link as LinkIcon,
  FileText,
  BarChart3,
  Settings,
  LucideIcon,
} from "lucide-react";
import { UserRole, AccessLevel } from "@/lib/types/dashboard";
import { ROLE_PERMISSIONS, NAVIGATION_ITEMS } from "@/lib/constants/roles";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Gavel,
  Ticket,
  Users,
  Link: LinkIcon,
  FileText,
  BarChart3,
  Settings,
};

interface DashboardSidebarProps {
  userRole: UserRole;
  collapsed?: boolean;
}

export function DashboardSidebar({ userRole, collapsed = false }: DashboardSidebarProps) {
  const pathname = usePathname();
  const permissions = ROLE_PERMISSIONS[userRole];

  const getAccessLevel = (moduleId: string): AccessLevel => {
    return permissions.modules[moduleId as keyof typeof permissions.modules] || "hidden";
  };

  const visibleItems = NAVIGATION_ITEMS.filter((item) => {
    const access = getAccessLevel(item.id);
    return access !== "hidden";
  });

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-zinc-950 border-r border-zinc-800 transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-zinc-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SA</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-white font-semibold text-sm leading-tight">SignAuthentics</span>
              <span className="text-zinc-500 text-[10px] leading-tight">Admin Dashboard</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {visibleItems.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const accessLevel = getAccessLevel(item.id);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative",
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200",
                accessLevel === "read-only" && "opacity-70"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm font-medium">{item.label}</span>
                  {accessLevel === "read-only" && (
                    <span className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">RO</span>
                  )}
                  {accessLevel === "own-only" && (
                    <span className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">MY</span>
                  )}
                </div>
              )}
              {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r" />}
            </Link>
          );
        })}
      </nav>

      {/* Role Badge */}
      {!collapsed && (
        <div className="absolute bottom-4 left-3 right-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
            <div className="text-xs text-zinc-500 mb-1">Current Role</div>
            <div className="text-sm font-semibold text-white capitalize">{userRole}</div>
          </div>
        </div>
      )}
    </aside>
  );
}

