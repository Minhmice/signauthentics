/**
 * Dashboard Root Layout
 * Override root layout để có dark theme và không có Header/Footer
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DashboardWrapper } from "@/components/dashboard/DashboardWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Dashboard - SignAuthentics",
  description: "Admin Dashboard for SignAuthentics Management",
};

export default function DashboardRootLayout({
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
    <html lang="en">
      <body 
        className={`${inter.variable} antialiased text-gray-900 bg-zinc-950`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <DashboardWrapper userRole={currentUser.role} userName={currentUser.name} userAvatar={currentUser.avatar}>
            {children}
          </DashboardWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
