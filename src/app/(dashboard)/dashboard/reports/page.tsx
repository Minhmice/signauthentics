"use client";

/**
 * Reports Page
 * Wireframe cho analytics & reporting
 * Admin: Full, Seller/Affiliate: Own-only
 */

import { DashboardSectionHeader } from "@/components/dashboard/RoleBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/DataTable";
import { Download, TrendingUp, BarChart3 } from "lucide-react";
import { formatPrice } from "@/lib/ui/price";
import { ColumnDef } from "@tanstack/react-table";

type CategoryReport = {
  category: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
  growth: string;
};

type PlayerReport = {
  player: string;
  revenue: number;
  products: number;
  avgPrice: number;
};

type AuctionReport = {
  auctionId: string;
  product: string;
  startPrice: number;
  finalPrice: number;
  bidders: number;
  duration: string;
};

const categoryData: CategoryReport[] = [
  { category: "Jerseys", revenue: 125000000, orders: 45, avgOrderValue: 2777778, growth: "+15%" },
  { category: "Balls", revenue: 87500000, orders: 35, avgOrderValue: 2500000, growth: "+22%" },
  { category: "Photos", revenue: 45000000, orders: 60, avgOrderValue: 750000, growth: "+8%" },
  { category: "Boots", revenue: 65000000, orders: 20, avgOrderValue: 3250000, growth: "+18%" },
];

const playerData: PlayerReport[] = [
  { player: "Quang Hải", revenue: 120000000, products: 12, avgPrice: 10000000 },
  { player: "Công Phượng", revenue: 95000000, products: 10, avgPrice: 9500000 },
  { player: "Văn Hậu", revenue: 78000000, products: 9, avgPrice: 8666667 },
  { player: "Tiến Linh", revenue: 54000000, products: 8, avgPrice: 6750000 },
];

const auctionData: AuctionReport[] = [
  { auctionId: "AUC-001", product: "Signed Jersey #19", startPrice: 5000000, finalPrice: 8500000, bidders: 12, duration: "5 days" },
  { auctionId: "AUC-002", product: "Signed Ball U22", startPrice: 2000000, finalPrice: 4200000, bidders: 8, duration: "5 days" },
  { auctionId: "AUC-003", product: "Signed Photo", startPrice: 1000000, finalPrice: 3500000, bidders: 15, duration: "4 days" },
];

const categoryColumns: ColumnDef<CategoryReport>[] = [
  { accessorKey: "category", header: "Category" },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => <span className="font-semibold">{formatPrice(row.original.revenue, "VND")}</span>,
  },
  { accessorKey: "orders", header: "Orders" },
  {
    accessorKey: "avgOrderValue",
    header: "Avg Order Value",
    cell: ({ row }) => <span className="text-sm">{formatPrice(row.original.avgOrderValue, "VND")}</span>,
  },
  {
    accessorKey: "growth",
    header: "Growth",
    cell: ({ row }) => {
      const growth = row.original.growth;
      const isPositive = growth.startsWith("+");
      return <span className={`font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>{growth}</span>;
    },
  },
];

const playerColumns: ColumnDef<PlayerReport>[] = [
  { accessorKey: "player", header: "Player" },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => <span className="font-semibold">{formatPrice(row.original.revenue, "VND")}</span>,
  },
  { accessorKey: "products", header: "Products" },
  {
    accessorKey: "avgPrice",
    header: "Avg Price",
    cell: ({ row }) => <span className="text-sm">{formatPrice(row.original.avgPrice, "VND")}</span>,
  },
];

const auctionColumns: ColumnDef<AuctionReport>[] = [
  { accessorKey: "auctionId", header: "Auction ID", cell: ({ row }) => <span className="font-mono text-xs">{row.original.auctionId}</span> },
  { accessorKey: "product", header: "Product" },
  {
    accessorKey: "startPrice",
    header: "Start Price",
    cell: ({ row }) => <span className="text-sm">{formatPrice(row.original.startPrice, "VND")}</span>,
  },
  {
    accessorKey: "finalPrice",
    header: "Final Price",
    cell: ({ row }) => <span className="font-semibold text-green-500">{formatPrice(row.original.finalPrice, "VND")}</span>,
  },
  { accessorKey: "bidders", header: "Bidders" },
  { accessorKey: "duration", header: "Duration" },
];

export default function DashboardReportsPage() {
  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        title="Reports"
        description="Analytics & performance reports"
        visibleFor={["admin", "seller", "affiliate"]}
        ownOnlyFor={["seller", "affiliate"]}
        actions={
          <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-200">
            <Download className="w-4 h-4 mr-2" />
            Export All CSV
          </Button>
        }
      />

      {/* Revenue Chart */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Revenue Trend (Last 30 Days)</h2>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-3 text-zinc-600" />
                <div className="text-sm text-zinc-500">Line/Area Chart Placeholder</div>
                <div className="text-xs text-zinc-600 mt-1">Revenue trend visualization</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Categories */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">
          <BarChart3 className="w-4 h-4 inline mr-2" />
          Top Categories
        </h2>
        <DataTable columns={categoryColumns} data={categoryData} showPagination={false} />
      </div>

      {/* Top Players */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">
          <BarChart3 className="w-4 h-4 inline mr-2" />
          Top Players by Revenue
        </h2>
        <DataTable columns={playerColumns} data={playerData} showPagination={false} />
      </div>

      {/* Auction Performance */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">
          <BarChart3 className="w-4 h-4 inline mr-2" />
          Auction Performance
        </h2>
        <DataTable columns={auctionColumns} data={auctionData} showPagination={false} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="text-xs text-zinc-500 mb-2">Total Orders</div>
            <div className="text-2xl font-bold text-white mb-1">160</div>
            <div className="text-xs text-green-500">+15% vs last month</div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="text-xs text-zinc-500 mb-2">Avg Order Value</div>
            <div className="text-2xl font-bold text-white mb-1">₫2.04M</div>
            <div className="text-xs text-green-500">+8% vs last month</div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="text-xs text-zinc-500 mb-2">Conversion Rate</div>
            <div className="text-2xl font-bold text-white mb-1">3.7%</div>
            <div className="text-xs text-green-500">+0.5% vs last month</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
