"use client";

/**
 * Latest Orders Table Component
 * Hiển thị danh sách đơn hàng mới nhất
 */

import * as React from "react";
import { DataTable } from "@/app/dashboard/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/ui/price";

export type LatestOrder = {
  orderId: string;
  buyer: string;
  total: number;
  payment: string;
  fulfillment: string;
  updated: string;
};

const latestOrders: LatestOrder[] = [
  { orderId: "ORD-1234", buyer: "Nguyễn Văn A", total: 2500000, payment: "Paid", fulfillment: "Shipped", updated: "2m ago" },
  { orderId: "ORD-1235", buyer: "Trần Thị B", total: 5000000, payment: "Pending", fulfillment: "Processing", updated: "5m ago" },
  { orderId: "ORD-1236", buyer: "Lê Văn C", total: 1200000, payment: "Paid", fulfillment: "Delivered", updated: "10m ago" },
  { orderId: "ORD-1237", buyer: "Phạm Thị D", total: 8500000, payment: "Paid", fulfillment: "Shipped", updated: "15m ago" },
];

export function LatestOrdersTable() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const columns = React.useMemo<ColumnDef<LatestOrder>[]>(() => [
    {
      accessorKey: "orderId",
      header: "Mã đơn hàng",
      cell: ({ row }) => (
        <div className="font-mono text-blue-400">
          {row.getValue("orderId")}
        </div>
      ),
    },
    {
      accessorKey: "buyer",
      header: "Người mua",
      cell: ({ row }) => (
        <div className="text-white">
          {row.getValue("buyer")}
        </div>
      ),
    },
    {
      accessorKey: "total",
      header: "Tổng tiền",
      cell: ({ row }) => (
        <div className="text-green-400 font-semibold">
          {formatPrice(row.getValue("total"))}
        </div>
      ),
    },
    {
      accessorKey: "payment",
      header: "Thanh toán",
      cell: ({ row }) => {
        const payment = row.getValue("payment") as string;
        return (
          <Badge 
            variant={payment === "Paid" ? "default" : "secondary"}
            className={payment === "Paid" ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"}
          >
            {payment}
          </Badge>
        );
      },
    },
    {
      accessorKey: "fulfillment",
      header: "Trạng thái",
      cell: ({ row }) => {
        const fulfillment = row.getValue("fulfillment") as string;
        const variant = fulfillment === "Delivered" ? "default" : 
                      fulfillment === "Shipped" ? "secondary" : "outline";
        const className = fulfillment === "Delivered" ? "bg-green-900 text-green-300" :
                         fulfillment === "Shipped" ? "bg-blue-900 text-blue-300" :
                         "bg-orange-900 text-orange-300";
        return (
          <Badge variant={variant} className={className}>
            {fulfillment}
          </Badge>
        );
      },
    },
    {
      accessorKey: "updated",
      header: "Cập nhật",
      cell: ({ row }) => (
        <div className="text-zinc-400 text-sm">
          {row.getValue("updated")}
        </div>
      ),
    },
  ], []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable
      columns={columns}
      data={latestOrders}
      searchPlaceholder="Tìm kiếm đơn hàng..."
      searchKey="orderId"
      getRowId={(row) => row.orderId}
    />
  );
}
