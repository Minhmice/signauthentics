"use client";

/**
 * Auctions Management Page
 * Wireframe với real-time auction tracking
 * Admin/Seller: Full control, Others: Read-only
 */

import { DashboardSectionHeader } from "@/components/dashboard/RoleBadge";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Users, Play, CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/ui/price";
import { ColumnDef } from "@tanstack/react-table";

type Auction = {
  id: string;
  product: string;
  startDate: string;
  endDate: string;
  startingPrice: number;
  minIncrement: number;
  status: "scheduled" | "live" | "ended";
  highestBid: number;
  bidders: number;
};

const mockAuctions: Auction[] = [
  {
    id: "AUC-001",
    product: "Signed Jersey Quang Hải #19",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    startingPrice: 5000000,
    minIncrement: 100000,
    status: "live",
    highestBid: 8500000,
    bidders: 12,
  },
  {
    id: "AUC-002",
    product: "Signed Ball Vietnam U22",
    startDate: "2024-01-16",
    endDate: "2024-01-21",
    startingPrice: 2000000,
    minIncrement: 50000,
    status: "live",
    highestBid: 4200000,
    bidders: 8,
  },
  {
    id: "AUC-003",
    product: "Signed Boots Công Phượng",
    startDate: "2024-01-18",
    endDate: "2024-01-23",
    startingPrice: 4000000,
    minIncrement: 100000,
    status: "scheduled",
    highestBid: 0,
    bidders: 0,
  },
  {
    id: "AUC-004",
    product: "Signed Photo Vietnam Olympic",
    startDate: "2024-01-10",
    endDate: "2024-01-14",
    startingPrice: 1000000,
    minIncrement: 50000,
    status: "ended",
    highestBid: 3500000,
    bidders: 15,
  },
];

const auctionColumns: ColumnDef<Auction>[] = [
  {
    accessorKey: "id",
    header: "Auction ID",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <div className="font-medium max-w-xs truncate">{row.original.product}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Start",
    cell: ({ row }) => <span className="text-xs text-zinc-400">{new Date(row.original.startDate).toLocaleDateString("vi-VN")}</span>,
  },
  {
    accessorKey: "endDate",
    header: "End",
    cell: ({ row }) => <span className="text-xs text-zinc-400">{new Date(row.original.endDate).toLocaleDateString("vi-VN")}</span>,
  },
  {
    accessorKey: "startingPrice",
    header: "Starting Price",
    cell: ({ row }) => <span className="text-sm">{formatPrice(row.original.startingPrice, "VND")}</span>,
  },
  {
    accessorKey: "minIncrement",
    header: "Min Increment",
    cell: ({ row }) => <span className="text-xs text-zinc-500">{formatPrice(row.original.minIncrement, "VND")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const config = {
        scheduled: { color: "bg-blue-500/10 text-blue-500", icon: Clock },
        live: { color: "bg-green-500/10 text-green-500 animate-pulse", icon: Play },
        ended: { color: "bg-zinc-500/10 text-zinc-400", icon: CheckCircle },
      };
      const { color, icon: Icon } = config[status];
      return (
        <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center gap-1 ${color}`}>
          <Icon className="w-3 h-3" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "highestBid",
    header: "Highest Bid",
    cell: ({ row }) => (
      <span className="font-semibold text-green-500">
        {row.original.highestBid > 0 ? formatPrice(row.original.highestBid, "VND") : "-"}
      </span>
    ),
  },
  {
    accessorKey: "bidders",
    header: "Bidders",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1 text-sm">
        <Users className="w-3.5 h-3.5 text-zinc-500" />
        {row.original.bidders}
      </span>
    ),
  },
];

export default function DashboardAuctionsPage() {
  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        title="Auctions"
        description="Quản lý đấu giá (Product, Start, End, Starting Price, Min Increment, Status, Highest Bid, Bidders)"
        visibleFor={["admin", "seller"]}
        readOnlyFor={["customer"]}
        actions={
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Auction
          </Button>
        }
      />

      <DataTable
        columns={auctionColumns}
        data={mockAuctions}
        searchKey="product"
        searchPlaceholder="Search auctions..."
        pageSize={10}
      />

      {/* Wireframe Note */}
      <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg space-y-2">
        <p className="text-xs text-zinc-500">
          <strong className="text-zinc-400">Detail View:</strong> Stage (scheduled/live/ended), Countdown (chuẩn server time), Bảng bid realtime, Nút Close session
        </p>
        <p className="text-xs text-zinc-500">
          <strong className="text-zinc-400">Real-time updates:</strong> WebSocket hoặc polling để cập nhật bids, countdown live
        </p>
      </div>
    </div>
  );
}
