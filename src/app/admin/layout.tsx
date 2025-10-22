/**
 * Admin Dashboard Layout
 * Layout riêng cho admin dashboard - không có Header/Footer của website
 * Chỉ wrap content, không tạo html/body để tránh hydration mismatch
 */

import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata: Metadata = {
  title: "Admin Dashboard - SignAuthentics",
  description: "Admin Dashboard for SignAuthentics Management",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
