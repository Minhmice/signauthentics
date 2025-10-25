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
  UserCog,
  Link as LinkIcon,
  FileText,
  BarChart3,
  Settings,
  LogOut,
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
  UserCog,
  Link: LinkIcon,
  FileText,
  BarChart3,
  Settings,
};

interface DashboardSidebarProps {
  userRole: UserRole;
  collapsed?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({ userRole, collapsed = false, onClose }: DashboardSidebarProps) {
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
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-foreground font-bold text-sm">SA</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-foreground font-semibold text-sm leading-tight">SignAuthentics</span>
              <span className="text-muted-foreground text-[10px] leading-tight">Admin Dashboard</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {visibleItems.filter(item => item.id !== 'settings').map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive = item.id === 'overview' 
            ? pathname === item.href 
            : pathname.startsWith(item.href);
          const accessLevel = getAccessLevel(item.id);

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose} // Close mobile sidebar when navigating
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                accessLevel === "read-only" && "opacity-70"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm font-medium">{item.label}</span>
                  {accessLevel === "read-only" && (
                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">RO</span>
                  )}
                  {accessLevel === "own-only" && (
                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">MY</span>
                  )}
                </div>
              )}
              {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section - Settings & Logout */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        {/* Settings */}
        {getAccessLevel('settings') !== 'hidden' && (
          <Link
            href="/dashboard/settings"
            onClick={onClose} // Close mobile sidebar when navigating
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative",
              pathname === '/dashboard/settings'
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
            title={collapsed ? "Settings" : undefined}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <div className="flex-1 flex items-center justify-between">
                <span className="text-sm font-medium">Settings</span>
                {getAccessLevel('settings') === "read-only" && (
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">RO</span>
                )}
              </div>
            )}
            {pathname === '/dashboard/settings' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r" />}
          </Link>
        )}

        {/* Logout */}
        <button
          onClick={() => {
            // TODO: Implement logout logic
            console.log('Logout clicked');
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative w-full text-left text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && (
            <span className="text-sm font-medium">Logout</span>
          )}
        </button>

        {/* Role Badge */}
        {!collapsed && (
          <div className="mt-3">
            <div className="bg-card border border-border rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Current Role</div>
              <div className="text-sm font-semibold text-foreground capitalize">{userRole}</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
