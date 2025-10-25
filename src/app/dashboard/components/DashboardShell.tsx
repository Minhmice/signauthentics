"use client";

/**
 * Dashboard Shell Component
 * Main layout wrapper cho toàn bộ dashboard pages
 * Bao gồm: Sidebar, Header, Content Area, Realtime Panel
 * Responsive design với mobile sidebar drawer
 */

import * as React from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { RealtimePanel } from "./RealtimePanel";
import { UserRole } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardShellProps {
  children: React.ReactNode;
  userRole?: UserRole;
  userName?: string;
  userAvatar?: string;
}

export function DashboardShell({ children, userRole = "admin", userName, userAvatar }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const [realtimePanelOpen, setRealtimePanelOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  // Close mobile sidebar when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileSidebarOpen && !(event.target as Element).closest('.mobile-sidebar')) {
        setMobileSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileSidebarOpen]);

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <DashboardSidebar userRole={userRole} collapsed={sidebarCollapsed} />
        </motion.div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div 
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="fixed inset-0 bg-black/50" 
              onClick={() => setMobileSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div 
              className="mobile-sidebar fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <DashboardSidebar 
                userRole={userRole} 
                collapsed={false} 
                onClose={() => setMobileSidebarOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <DashboardHeader
          onToggleSidebar={toggleSidebar}
          onToggleMobileSidebar={toggleMobileSidebar}
          sidebarCollapsed={sidebarCollapsed}
          userName={userName}
          userAvatar={userAvatar}
        />
      </motion.div>

      {/* Main Content Area */}
      <motion.main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300",
          // Desktop: sidebar width based on collapsed state
          "lg:ml-64 lg:data-[collapsed=true]:ml-16",
          // Mobile: no margin, full width
          "ml-0"
        )}
        data-collapsed={sidebarCollapsed}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="p-4 lg:p-6 max-w-screen-2xl mx-auto">
          {children}
        </div>
      </motion.main>

      {/* Realtime Panel */}
      <RealtimePanel isOpen={realtimePanelOpen} onClose={() => setRealtimePanelOpen(false)} />

      {/* Floating Action Button để mở Realtime Panel */}
      <motion.button
        onClick={() => setRealtimePanelOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-30 transition-all hover:scale-110"
        title="Open live activity"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
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
        <motion.span 
          className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.button>
    </motion.div>
  );
}
