"use client";

/**
 * Dashboard Header Component
 * Fixed header với search, notifications, locale/currency, account menu
 */

import * as React from "react";
import Image from "next/image";
import { Search, Bell, Globe, DollarSign, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
}

export function DashboardHeader({
  onToggleSidebar,
  sidebarCollapsed = false,
  userName = "Admin User",
  userAvatar,
  notificationCount = 0,
}: DashboardHeaderProps) {
  const [locale, setLocale] = React.useState<"VN" | "EN">("VN");
  const [currency, setCurrency] = React.useState<"VND" | "EUR">("VND");

  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-16 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800 z-30 transition-all duration-300",
        sidebarCollapsed ? "left-16" : "left-64"
      )}
    >
      <div className="h-full px-4 flex items-center gap-4">
        {/* Toggle Sidebar Button */}
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>

        {/* Global Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Global search..."
              className="w-full h-9 pl-10 pr-4 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Locale Toggle */}
          <button
            onClick={() => setLocale((prev) => (prev === "VN" ? "EN" : "VN"))}
            className="px-2.5 py-1.5 flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors text-zinc-300 text-xs font-medium"
            title="Change language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{locale}</span>
          </button>

          {/* Currency Toggle */}
          <button
            onClick={() => setCurrency((prev) => (prev === "VND" ? "EUR" : "VND"))}
            className="px-2.5 py-1.5 flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors text-zinc-300 text-xs font-medium"
            title="Change currency (display snapshot)"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>{currency}</span>
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>

          {/* User Avatar & Menu */}
          <button className="flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-800 rounded-lg transition-colors">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative overflow-hidden">
              {userAvatar ? (
                <Image src={userAvatar} alt={userName} fill className="object-cover" />
              ) : (
                <span className="text-white text-xs font-semibold">{userName.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <span className="text-sm text-zinc-200 font-medium hidden lg:block">{userName}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

