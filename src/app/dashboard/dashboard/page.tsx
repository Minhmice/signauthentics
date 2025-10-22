"use client";

/**
 * Dashboard Overview Page
 * Enhanced UI với charts và analytics
 * Admin: Full KPIs, Seller: Own-only, Others: Limited
 */

import { DashboardSectionHeader } from "@/components/dashboard/RoleBadge";
import { KPICard, KPIGrid } from "@/components/dashboard/KPICard";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/dashboard/DataTable";
import { ChartPlaceholder, Sparkline } from "@/components/dashboard/ChartPlaceholder";
import { DollarSign, ShoppingCart, Gavel, TrendingUp, Clock, Users, Package, Target } from "lucide-react";

// Mock data for demo
const liveAuctions = [
  {
    id: "1",
    product: "Messi Signed Jersey 2022",
    highestBid: "₫45,000,000",
    bidders: 12,
    endsIn: "2h 15m",
    status: "live"
  },
  {
    id: "2", 
    product: "Ronaldo Boots Collection",
    highestBid: "₫38,500,000",
    bidders: 8,
    endsIn: "5h 30m",
    status: "live"
  },
  {
    id: "3",
    product: "Neymar Training Kit",
    highestBid: "₫22,000,000", 
    bidders: 5,
    endsIn: "1d 2h",
    status: "live"
  }
];

const latestOrders = [
  {
    id: "ORD-001",
    buyer: "Nguyễn Văn A",
    total: "₫2,500,000",
    payment: "Completed",
    fulfillment: "Shipped",
    updated: "2 hours ago"
  },
  {
    id: "ORD-002", 
    buyer: "Trần Thị B",
    total: "₫1,800,000",
    payment: "Pending",
    fulfillment: "Processing",
    updated: "4 hours ago"
  },
  {
    id: "ORD-003",
    buyer: "Lê Văn C",
    total: "₫3,200,000",
    payment: "Completed", 
    fulfillment: "Delivered",
    updated: "1 day ago"
  }
];

const auctionColumns = [
  { accessorKey: "product", header: "Product" },
  { accessorKey: "highestBid", header: "Highest Bid" },
  { accessorKey: "bidders", header: "Bidders" },
  { accessorKey: "endsIn", header: "Ends In" },
  { accessorKey: "status", header: "Status" }
];

const orderColumns = [
  { accessorKey: "id", header: "Order ID" },
  { accessorKey: "buyer", header: "Buyer" },
  { accessorKey: "total", header: "Total" },
  { accessorKey: "payment", header: "Payment" },
  { accessorKey: "fulfillment", header: "Fulfillment" },
  { accessorKey: "updated", header: "Updated" }
];

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8">
      <DashboardSectionHeader
        title="Overview"
        description="Dashboard tổng quan - triển khai trên admin.signauthentics.vn"
        visibleFor={["admin", "seller", "affiliate"]}
        readOnlyFor={["customer"]}
      />

      {/* KPI Metrics */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Key Metrics (7 Days)</h2>
        <KPIGrid columns={4}>
          <KPICard 
            label="Revenue Today / 7D" 
            value="₫245M" 
            change="+12.5%" 
            trend="up" 
            icon={DollarSign}
            iconColor="text-green-500"
            description="vs last week"
          />
          <KPICard 
            label="Orders New" 
            value="856" 
            change="+8.2%" 
            trend="up" 
            icon={ShoppingCart}
            iconColor="text-blue-500"
            description="total this week"
          />
          <KPICard 
            label="Auctions Live" 
            value="12" 
            change="-2" 
            trend="down" 
            icon={Gavel}
            iconColor="text-purple-500"
            description="active now"
          />
          <KPICard 
            label="Outbid Events 24h" 
            value="45" 
            change="+15" 
            trend="up" 
            icon={TrendingUp}
            iconColor="text-orange-500"
            description="last 24 hours"
          />
        </KPIGrid>
      </div>

      {/* Additional Stats with Sparklines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Total Products</p>
                <p className="text-2xl font-bold text-white">1,234</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Package className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <Sparkline 
              data={[30, 40, 35, 50, 49, 60, 70, 91, 85, 95, 88, 100]} 
              color="rgb(59 130 246)"
            />
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Active Users</p>
                <p className="text-2xl font-bold text-white">12,345</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Users className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <Sparkline 
              data={[45, 52, 48, 65, 72, 68, 85, 90, 78, 95, 88, 100]} 
              color="rgb(34 197 94)"
            />
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-white">3.7%</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Target className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <Sparkline 
              data={[2.8, 3.1, 2.9, 3.3, 3.5, 3.2, 3.8, 3.6, 3.9, 3.7, 3.8, 3.7]} 
              color="rgb(168 85 247)"
            />
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Revenue Trend (30 Days)</h2>
        <ChartPlaceholder 
          title="Total Revenue"
          description="Daily revenue over the last 30 days"
          height={320}
        />
      </div>

      {/* Live Auctions Table */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">
          Live Auctions
          <span className="ml-2 text-xs text-zinc-600">
            (Features: sorting, column visibility, pin left/right, column resize, pagination)
          </span>
        </h2>
        <DataTable 
          columns={auctionColumns} 
          data={liveAuctions} 
          searchKey="product"
          showPagination={false}
        />
      </div>

      {/* Latest Orders Table */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Latest Orders</h2>
        <DataTable 
          columns={orderColumns} 
          data={latestOrders} 
          searchKey="buyer"
          showPagination={false}
        />
      </div>

      {/* Top Players Spotlight */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Top Players by Revenue</h2>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {["Quang Hải", "Công Phượng", "Văn Hậu"].map((player, i) => (
                <div key={player} className="text-center p-4 bg-zinc-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">#{i + 1}</div>
                  <div className="text-sm text-zinc-400">{player}</div>
                  <div className="text-xs text-green-500 mt-2">₫{(120 - i * 20)}M</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
