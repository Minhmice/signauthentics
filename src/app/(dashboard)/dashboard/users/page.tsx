"use client";

/**
 * Users Management Page
 * Wireframe với role management
 * Admin: Full control, Others: Hidden
 */

import { DashboardSectionHeader } from "@/components/dashboard/RoleBadge";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { UserPlus, Edit, Trash, Shield } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "seller" | "editor" | "customer" | "affiliate";
  createdAt: string;
  lastActive: string;
  status: "active" | "inactive";
};

const mockUsers: User[] = [
  { id: "USR-001", name: "Admin User", email: "admin@signauthentics.vn", role: "admin", createdAt: "2023-01-01", lastActive: "2m ago", status: "active" },
  { id: "USR-002", name: "Seller John", email: "john@seller.com", role: "seller", createdAt: "2023-06-15", lastActive: "1h ago", status: "active" },
  { id: "USR-003", name: "Editor Jane", email: "jane@editor.com", role: "editor", createdAt: "2023-08-20", lastActive: "3h ago", status: "active" },
  { id: "USR-004", name: "Customer Minh", email: "minh@customer.com", role: "customer", createdAt: "2024-01-10", lastActive: "1d ago", status: "active" },
  { id: "USR-005", name: "Affiliate Partner", email: "partner@affiliate.com", role: "affiliate", createdAt: "2023-12-01", lastActive: "2d ago", status: "active" },
];

const roleColors = {
  admin: "bg-red-500/10 text-red-500",
  seller: "bg-blue-500/10 text-blue-500",
  editor: "bg-purple-500/10 text-purple-500",
  customer: "bg-green-500/10 text-green-500",
  affiliate: "bg-orange-500/10 text-orange-500",
};

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-sm">{row.original.name}</div>
        <div className="text-xs text-zinc-500">{row.original.email}</div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center gap-1 ${roleColors[role]}`}>
          <Shield className="w-3 h-3" />
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => <span className="text-xs text-zinc-400">{new Date(row.original.createdAt).toLocaleDateString("vi-VN")}</span>,
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
    cell: ({ row }) => <span className="text-xs text-zinc-400">{row.original.lastActive}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${status === "active" ? "bg-green-500/10 text-green-500" : "bg-zinc-500/10 text-zinc-400"}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex items-center gap-1">
        <button className="p-2 hover:bg-zinc-800 rounded transition-colors" title="Change role">
          <Edit className="w-4 h-4 text-zinc-400" />
        </button>
        <button className="p-2 hover:bg-red-900/50 rounded transition-colors" title="Delete user">
          <Trash className="w-4 h-4 text-red-500" />
        </button>
      </div>
    ),
  },
];

export default function DashboardUsersPage() {
  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        title="Users"
        description="Quản lý người dùng (Name, Email, Role, Created, Last active)"
        visibleFor={["admin"]}
        actions={
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        }
      />

      <DataTable
        columns={userColumns}
        data={mockUsers}
        searchKey="name"
        searchPlaceholder="Search users..."
        pageSize={10}
      />

      {/* Wireframe Note */}
      <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
        <p className="text-xs text-zinc-500">
          <strong className="text-zinc-400">Action:</strong> Change role dropdown - thay đổi quyền truy cập ngay lập tức
        </p>
      </div>
    </div>
  );
}
