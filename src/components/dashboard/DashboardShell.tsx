"use client";

/**
 * Dashboard Shell Component
 * Main layout wrapper cho toàn bộ dashboard pages
 * Bao gồm: Sidebar, Header, Content Area, Realtime Panel
 */

import * as React from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { RealtimePanel } from "./RealtimePanel";
import { UserRole } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: React.ReactNode;
  userRole?: UserRole;
  userName?: string;
  userAvatar?: string;
}

export function DashboardShell({ children, userRole = "admin", userName, userAvatar }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [realtimePanelOpen, setRealtimePanelOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <DashboardSidebar userRole={userRole} collapsed={sidebarCollapsed} />

      {/* Header */}
      <DashboardHeader
        onToggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
        userName={userName}
        userAvatar={userAvatar}
        notificationCount={3}
      />

      {/* Main Content Area */}
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <div className="p-6 max-w-screen-2xl mx-auto">
          {children}
        </div>
      </main>

      {/* Realtime Panel */}
      <RealtimePanel isOpen={realtimePanelOpen} onClose={() => setRealtimePanelOpen(false)} />

      {/* Floating Action Button để mở Realtime Panel */}
      <button
        onClick={() => setRealtimePanelOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-30 transition-all hover:scale-110"
        title="Open live activity"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        {/* Live indicator dot */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-950 animate-pulse" />
      </button>
    </div>
  );
}

