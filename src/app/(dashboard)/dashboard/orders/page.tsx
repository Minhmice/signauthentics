"use client";

/**
 * Orders Management Page
 * Wireframe với role visibility
 * Admin: Full, Seller: Own-only, Customer: Own-only
 */

import { DashboardSectionHeader } from "@/components/dashboard/RoleBadge";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Eye, Download } from "lucide-react";
import { formatPrice } from "@/lib/ui/price";
import { ColumnDef } from "@tanstack/react-table";

type Order = {
  id: string;
  buyer: string;
  email: string;
  total: number;
  paymentStatus: "paid" | "pending" | "failed";
  fulfillmentStatus: "delivered" | "shipped" | "processing" | "cancelled";
  provider: string;
  date: string;
};

const mockOrders: Order[] = [
  { id: "ORD-001", buyer: "Nguyễn Văn A", email: "nguyenvana@gmail.com", total: 2500000, paymentStatus: "paid", fulfillmentStatus: "delivered", provider: "GHN", date: "2024-01-15" },
  { id: "ORD-002", buyer: "Trần Thị B", email: "tranthib@gmail.com", total: 5000000, paymentStatus: "pending", fulfillmentStatus: "processing", provider: "GHTK", date: "2024-01-14" },
  { id: "ORD-003", buyer: "Lê Văn C", email: "levanc@gmail.com", total: 1200000, paymentStatus: "paid", fulfillmentStatus: "delivered", provider: "VNPost", date: "2024-01-13" },
  { id: "ORD-004", buyer: "Phạm Thị D", email: "phamthid@gmail.com", total: 8500000, paymentStatus: "paid", fulfillmentStatus: "shipped", provider: "GHN", date: "2024-01-12" },
  { id: "ORD-005", buyer: "Hoàng Văn E", email: "hoangvane@gmail.com", total: 3200000, paymentStatus: "paid", fulfillmentStatus: "delivered", provider: "J&T", date: "2024-01-11" },
  { id: "ORD-006", buyer: "Đặng Thị F", email: "dangthif@gmail.com", total: 4500000, paymentStatus: "failed", fulfillmentStatus: "cancelled", provider: "N/A", date: "2024-01-10" },
];

const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: "buyer",
    header: "Buyer",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-sm">{row.original.buyer}</div>
        <div className="text-xs text-zinc-500">{row.original.email}</div>
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <span className="font-semibold">{formatPrice(row.original.total, "VND")}</span>,
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      const colorMap = {
        paid: "bg-green-500/10 text-green-500",
        pending: "bg-orange-500/10 text-orange-500",
        failed: "bg-red-500/10 text-red-500",
      };
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${colorMap[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "fulfillmentStatus",
    header: "Fulfillment",
    cell: ({ row }) => {
      const status = row.original.fulfillmentStatus;
      const colorMap: Record<string, string> = {
        delivered: "bg-green-500/10 text-green-500",
        shipped: "bg-blue-500/10 text-blue-500",
        processing: "bg-orange-500/10 text-orange-500",
        cancelled: "bg-red-500/10 text-red-500",
      };
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${colorMap[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "provider",
    header: "Provider",
    cell: ({ row }) => <span className="text-xs text-zinc-400">{row.original.provider}</span>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="text-xs text-zinc-400">{new Date(row.original.date).toLocaleDateString("vi-VN")}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex items-center gap-1">
        <button className="p-2 hover:bg-zinc-800 rounded transition-colors" title="View details">
          <Eye className="w-4 h-4 text-zinc-400" />
        </button>
        <button className="p-2 hover:bg-zinc-800 rounded transition-colors" title="Download invoice">
          <Download className="w-4 h-4 text-zinc-400" />
        </button>
      </div>
    ),
  },
];

export default function DashboardOrdersPage() {
  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        title="Orders"
        description="Quản lý đơn hàng (Order ID, Buyer, Total, Payment, Fulfillment, Provider)"
        visibleFor={["admin", "seller", "customer"]}
        ownOnlyFor={["seller", "customer"]}
        actions={
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-200">
            <Filter className="w-4 h-4 mr-2" />
            Filter Status
          </Button>
        }
      />

      <DataTable
        columns={orderColumns}
        data={mockOrders}
        searchKey="buyer"
        searchPlaceholder="Search by buyer..."
        pageSize={10}
      />

      {/* Wireframe Note */}
      <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
        <p className="text-xs text-zinc-500">
          <strong className="text-zinc-400">Detail View:</strong> Timeline trạng thái, Địa chỉ giao, Payment info, Shipping provider + tracking link
        </p>
      </div>
    </div>
  );
}


