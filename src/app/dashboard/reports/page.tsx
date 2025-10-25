"use client";

/**
 * Enhanced Reports Page
 * Analytics & reporting với charts, date filters, và export functionality
 * Admin: Full, Seller/Affiliate: Own-only
 */

import * as React from "react";
import { DashboardSectionHeader } from '@/app/dashboard/components/shared/RoleBadge';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/dashboard/components/shared/DataTable";
import { DateRangePicker } from '@/app/dashboard/components/shared/DateRangePicker';
import { DateRange } from "react-day-picker";
import { ExportButton } from '@/app/dashboard/components/shared/ExportButton';
import { Download, TrendingUp, BarChart3, DollarSign, ShoppingCart, Users, Eye, Calendar } from "lucide-react";
import { formatPrice } from "@/lib/ui/price";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

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
  { player: "Văn Hậu", revenue: 78000000, products: 8, avgPrice: 9750000 },
  { player: "Tiến Linh", revenue: 65000000, products: 7, avgPrice: 9285714 },
  { player: "Văn Lâm", revenue: 55000000, products: 6, avgPrice: 9166667 },
];

const auctionData: AuctionReport[] = [
  { auctionId: "AUC-001", product: "Signed Jersey Quang Hải", startPrice: 5000000, finalPrice: 8500000, bidders: 12, duration: "3d 2h" },
  { auctionId: "AUC-002", product: "Signed Ball Vietnam U22", startPrice: 2000000, finalPrice: 4200000, bidders: 8, duration: "2d 5h" },
  { auctionId: "AUC-003", product: "Signed Boots Công Phượng", startPrice: 3000000, finalPrice: 6700000, bidders: 15, duration: "4d 1h" },
];

const categoryColumns: ColumnDef<CategoryReport>[] = [
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div className="font-medium">{row.original.category}</div>,
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => <div className="font-semibold">{formatPrice(row.original.revenue, "VND")}</div>,
  },
  {
    accessorKey: "orders",
    header: "Orders",
    cell: ({ row }) => <div className="text-center">{row.original.orders}</div>,
  },
  {
    accessorKey: "avgOrderValue",
    header: "Avg Order Value",
    cell: ({ row }) => <div>{formatPrice(row.original.avgOrderValue, "VND")}</div>,
  },
  {
    accessorKey: "growth",
    header: "Growth",
    cell: ({ row }) => (
      <span className="text-green-500 font-medium">{row.original.growth}</span>
    ),
  },
];

const playerColumns: ColumnDef<PlayerReport>[] = [
  {
    accessorKey: "player",
    header: "Player",
    cell: ({ row }) => <div className="font-medium">{row.original.player}</div>,
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => <div className="font-semibold">{formatPrice(row.original.revenue, "VND")}</div>,
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <div className="text-center">{row.original.products}</div>,
  },
  {
    accessorKey: "avgPrice",
    header: "Avg Price",
    cell: ({ row }) => <div>{formatPrice(row.original.avgPrice, "VND")}</div>,
  },
];

const auctionColumns: ColumnDef<AuctionReport>[] = [
  {
    accessorKey: "auctionId",
    header: "Auction ID",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.auctionId}</span>,
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <div className="font-medium">{row.original.product}</div>,
  },
  {
    accessorKey: "startPrice",
    header: "Start Price",
    cell: ({ row }) => <div>{formatPrice(row.original.startPrice, "VND")}</div>,
  },
  {
    accessorKey: "finalPrice",
    header: "Final Price",
    cell: ({ row }) => <div className="font-semibold text-green-500">{formatPrice(row.original.finalPrice, "VND")}</div>,
  },
  {
    accessorKey: "bidders",
    header: "Bidders",
    cell: ({ row }) => <div className="text-center">{row.original.bidders}</div>,
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => <div>{row.original.duration}</div>,
  },
];

export default function DashboardReportsPage() {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date(),
  });
  const [selectedReport, setSelectedReport] = React.useState<string>("overview");

  const handleExport = (format: string, data: unknown[]) => {
    toast.success(`Exported ${data.length} records as ${format.toUpperCase()}`);
  };

  const totalRevenue = categoryData.reduce((sum, cat) => sum + cat.revenue, 0);
  const totalOrders = categoryData.reduce((sum, cat) => sum + cat.orders, 0);
  const totalAuctions = auctionData.length;
  const totalBidders = auctionData.reduce((sum, auc) => sum + auc.bidders, 0);

  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        title="Reports & Analytics"
        description="Comprehensive business insights and performance metrics"
        visibleFor={["admin", "seller", "affiliate"]}
        readOnlyFor={["editor"]}
        actions={
          <div className="flex items-center gap-2">
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              className="w-64"
            />
            <ExportButton
              data={categoryData}
              onExport={handleExport}
            />
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Total Revenue</p>
                <p className="text-2xl font-bold text-white">{formatPrice(totalRevenue, "VND")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Total Orders</p>
                <p className="text-2xl font-bold text-white">{totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Active Auctions</p>
                <p className="text-2xl font-bold text-white">{totalAuctions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Total Bidders</p>
                <p className="text-2xl font-bold text-white">{totalBidders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span className="text-sm text-zinc-400">
                {dateRange.from?.toLocaleDateString()} - {dateRange.to?.toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 text-zinc-600" />
              <div className="text-sm text-zinc-500">Revenue Chart Placeholder</div>
              <div className="text-xs text-zinc-600 mt-1">Interactive chart visualization</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Category Performance</h3>
        <DataTable
          columns={categoryColumns}
          data={categoryData}
          searchKey="category"
          searchPlaceholder="Search categories..."
          pageSize={10}
          onExport={handleExport}
        />
      </div>

      {/* Top Players */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Top Performing Players</h3>
        <DataTable
          columns={playerColumns}
          data={playerData}
          searchKey="player"
          searchPlaceholder="Search players..."
          pageSize={10}
          onExport={handleExport}
        />
      </div>

      {/* Auction Analytics */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Auction Analytics</h3>
        <DataTable
          columns={auctionColumns}
          data={auctionData}
          searchKey="product"
          searchPlaceholder="Search auctions..."
          pageSize={10}
          onExport={handleExport}
        />
      </div>
    </div>
  );
}