"use client";

/**
 * Live Auctions Table Component
 * Hiển thị danh sách các phiên đấu giá đang diễn ra
 */

import * as React from "react";
import { DataTable } from "@/app/dashboard/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/ui/price";

export type LiveAuction = {
  id: string;
  product: string;
  highestBid: number;
  bidders: number;
  endsIn: string;
};

const liveAuctions: LiveAuction[] = [
  { id: "AUC-001", product: "Signed Jersey Quang Hải #19", highestBid: 8500000, bidders: 12, endsIn: "2h 30m" },
  { id: "AUC-002", product: "Signed Ball Vietnam U22", highestBid: 4200000, bidders: 8, endsIn: "5h 15m" },
  { id: "AUC-003", product: "Signed Boots Công Phượng", highestBid: 6700000, bidders: 15, endsIn: "1h 45m" },
];

export function LiveAuctionsTable() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const columns = React.useMemo<ColumnDef<LiveAuction>[]>(() => [
    {
      accessorKey: "product",
      header: "Sản phẩm",
      cell: ({ row }) => (
        <div className="font-medium text-white">
          {row.getValue("product")}
        </div>
      ),
    },
    {
      accessorKey: "highestBid",
      header: "Giá cao nhất",
      cell: ({ row }) => (
        <div className="text-green-400 font-semibold">
          {formatPrice(row.getValue("highestBid"))}
        </div>
      ),
    },
    {
      accessorKey: "bidders",
      header: "Người đấu giá",
      cell: ({ row }) => (
        <Badge variant="secondary" className="bg-blue-900 text-blue-300">
          {row.getValue("bidders")} người
        </Badge>
      ),
    },
    {
      accessorKey: "endsIn",
      header: "Kết thúc",
      cell: ({ row }) => (
        <Badge variant="destructive" className="bg-red-900 text-red-300">
          {row.getValue("endsIn")}
        </Badge>
      ),
    },
  ], []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable
      columns={columns}
      data={liveAuctions}
      searchPlaceholder="Tìm kiếm sản phẩm..."
      searchKey="product"
      getRowId={(row) => row.id}
    />
  );
}
