/**
 * Dashboard Layout
 * Áp dụng DashboardShell cho toàn bộ dashboard routes
 */

import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // TODO: Get user từ authentication system
  // Hiện tại hard-code role = admin cho demo
  const currentUser = {
    role: "admin" as const,
    name: "Admin User",
    avatar: undefined,
  };

  return (
    <DashboardShell userRole={currentUser.role} userName={currentUser.name} userAvatar={currentUser.avatar}>
      {children}
    </DashboardShell>
  );
}

