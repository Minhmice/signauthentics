"use client";

/**
 * Vouchers Management Page
 * Wireframe với voucher rules
 * Admin: Full, Seller: Own-scope, Customer: Own-vouchers
 */

import { DashboardSectionHeader } from "@/components/dashboard/RoleBadge";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, Percent, DollarSign, Calendar, Users as UsersIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type Voucher = {
  id: string;
  code: string;
  type: "percent" | "fixed";
  value: number;
  scope: "all" | "category" | "product";
  startDate: string;
  endDate: string;
  usageTotal: number;
  usagePerUser: number;
  status: "active" | "inactive" | "expired";
};

const mockVouchers: Voucher[] = [
  {
    id: "VOU-001",
    code: "NEWYEAR2024",
    type: "percent",
    value: 20,
    scope: "all",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    usageTotal: 150,
    usagePerUser: 1,
    status: "active",
  },
  {
    id: "VOU-002",
    code: "JERSEY50K",
    type: "fixed",
    value: 50000,
    scope: "category",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    usageTotal: 50,
    usagePerUser: 2,
    status: "active",
  },
  {
    id: "VOU-003",
    code: "FIRSTORDER",
    type: "percent",
    value: 15,
    scope: "all",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usageTotal: 500,
    usagePerUser: 1,
    status: "active",
  },
  {
    id: "VOU-004",
    code: "HOLIDAY2023",
    type: "percent",
    value: 30,
    scope: "all",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    usageTotal: 200,
    usagePerUser: 1,
    status: "expired",
  },
];

const voucherColumns: ColumnDef<Voucher>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <span className="font-mono font-semibold text-sm">{row.original.code}</span>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      const Icon = type === "percent" ? Percent : DollarSign;
      const value = type === "percent" ? `${row.original.value}%` : `₫${row.original.value.toLocaleString()}`;
      return (
        <span className="inline-flex items-center gap-1.5 text-sm">
          <Icon className="w-3.5 h-3.5 text-blue-500" />
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "scope",
    header: "Scope",
    cell: ({ row }) => {
      const scope = row.original.scope;
      const colorMap = {
        all: "bg-purple-500/10 text-purple-500",
        category: "bg-blue-500/10 text-blue-500",
        product: "bg-green-500/10 text-green-500",
      };
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${colorMap[scope]}`}>
          {scope.charAt(0).toUpperCase() + scope.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
        <Calendar className="w-3 h-3" />
        {new Date(row.original.startDate).toLocaleDateString("vi-VN")}
      </span>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
        <Calendar className="w-3 h-3" />
        {new Date(row.original.endDate).toLocaleDateString("vi-VN")}
      </span>
    ),
  },
  {
    accessorKey: "usageTotal",
    header: "Usage Total",
    cell: ({ row }) => <span className="text-sm font-medium">{row.original.usageTotal}</span>,
  },
  {
    accessorKey: "usagePerUser",
    header: "Per User",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1 text-sm">
        <UsersIcon className="w-3 h-3 text-zinc-500" />
        {row.original.usagePerUser}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const colorMap = {
        active: "bg-green-500/10 text-green-500",
        inactive: "bg-zinc-500/10 text-zinc-400",
        expired: "bg-red-500/10 text-red-500",
      };
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${colorMap[status]}`}>
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
        <button className="p-2 hover:bg-zinc-800 rounded transition-colors">
          <Edit className="w-4 h-4 text-zinc-400" />
        </button>
        <button className="p-2 hover:bg-red-900/50 rounded transition-colors">
          <Trash className="w-4 h-4 text-red-500" />
        </button>
      </div>
    ),
  },
];

export default function DashboardVouchersPage() {
  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        title="Vouchers"
        description="Quản lý vouchers (Code, Type, Scope, Start/End, Usage)"
        visibleFor={["admin", "seller"]}
        ownOnlyFor={["seller", "customer"]}
        actions={
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Voucher
          </Button>
        }
      />

      <DataTable
        columns={voucherColumns}
        data={mockVouchers}
        searchKey="code"
        searchPlaceholder="Search voucher code..."
        pageSize={10}
      />

      {/* Wireframe Note */}
      <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
        <p className="text-xs text-zinc-500">
          <strong className="text-zinc-400">Detail Form:</strong> Quy tắc áp dụng (min order value, applicable categories/products, user eligibility)
        </p>
      </div>
    </div>
  );
}
