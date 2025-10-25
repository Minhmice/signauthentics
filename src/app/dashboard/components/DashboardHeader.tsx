"use client";

/**
 * Dashboard Header Component
 * Fixed header với search, notifications, locale/currency, account menu
 */

import * as React from "react";
import Image from "next/image";
import { Search, Menu, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggleGroup } from "./ThemeToggleGroup";

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
  onToggleMobileSidebar?: () => void;
  sidebarCollapsed?: boolean;
  userName?: string;
  userAvatar?: string;
}

export function DashboardHeader({
  onToggleSidebar,
  onToggleMobileSidebar,
  sidebarCollapsed = false,
  userName = "Admin User",
  userAvatar,
}: DashboardHeaderProps) {

  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-b border-border z-30 transition-all duration-300",
        // Desktop: sidebar width based on collapsed state
        "lg:left-64 lg:data-[collapsed=true]:left-16",
        // Mobile: full width
        "left-0"
      )}
      data-collapsed={sidebarCollapsed}
    >
      <div className="h-full px-4 flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground lg:hidden"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Toggle Sidebar Button */}
        <button
          onClick={onToggleSidebar}
          className="hidden lg:flex p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? (
            <Menu className="w-5 h-5" />
          ) : (
            <ArrowLeft className="w-5 h-5" />
          )}
        </button>

        {/* Global Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Global search..."
              className="w-full h-9 pl-10 pr-4 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition"
            />
          </div>
        </div>

        {/* Spacer for mobile */}
        <div className="flex-1 md:hidden" />

        {/* Theme toggle */}
        <div className="ml-auto">
          <ThemeToggleGroup />
        </div>

        {/* User Badge - Right Side */}
        <div>
          <button className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent rounded-lg transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative overflow-hidden">
              {userAvatar ? (
                <Image
                  src={userAvatar}
                  alt={userName}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-foreground text-xs font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-sm text-foreground font-medium hidden lg:block">
              {userName}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
