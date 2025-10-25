"use client";

/**
 * Dashboard Wrapper Component
 * Simple wrapper để tránh server/client issues
 */

import * as React from "react";
import { DashboardShell } from "./DashboardShell";
import { UserRole } from "@/lib/types/dashboard";

interface DashboardWrapperProps {
  children: React.ReactNode;
  userRole?: UserRole;
  userName?: string;
  userAvatar?: string;
}

export function DashboardWrapper({ 
  children, 
  userRole = "admin", 
  userName = "Admin User", 
  userAvatar 
}: DashboardWrapperProps) {
  return (
    <DashboardShell userRole={userRole} userName={userName} userAvatar={userAvatar}>
      {children}
    </DashboardShell>
  );
}
