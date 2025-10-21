"use client";

/**
 * Affiliates Module Page
 * Wireframe cho affiliate tracking & payouts
 * Affiliate: Own data, Admin: All data
 */

import { DashboardSectionHeader } from "@/components/dashboard/RoleBadge";
import { KPICard, KPIGrid } from "@/components/dashboard/KPICard";
import { DataTable } from "@/components/dashboard/DataTable";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Copy, MousePointerClick, TrendingUp, DollarSign, Users } from "lucide-react";
import { formatPrice } from "@/lib/ui/price";
import { ColumnDef } from "@tanstack/react-table";

type RefLink = {
  id: string;
  link: string;
  channel: string;
  clicks: number;
  conversions: number;
  revenue: number;
  createdAt: string;
};

type AffiliateLog = {
  id: string;
  event: string;
  customer: string;
  product: string;
  revenue: number;
  commission: number;
  timestamp: string;
};

const mockRefLinks: RefLink[] = [
  { id: "REF-001", link: "signauthentics.vn?ref=summer2024", channel: "Facebook", clicks: 1250, conversions: 35, revenue: 87500000, createdAt: "2024-01-01" },
  { id: "REF-002", link: "signauthentics.vn?ref=ig_sports", channel: "Instagram", clicks: 980, conversions: 28, revenue: 70000000, createdAt: "2024-01-05" },
  { id: "REF-003", link: "signauthentics.vn?ref=yt_review", channel: "YouTube", clicks: 2100, conversions: 52, revenue: 130000000, createdAt: "2024-01-10" },
];

const mockLogs: AffiliateLog[] = [
  { id: "LOG-001", event: "conversion", customer: "Nguyễn Văn A", product: "Signed Jersey #10", revenue: 2500000, commission: 250000, timestamp: "5m ago" },
  { id: "LOG-002", event: "conversion", customer: "Trần Thị B", product: "Signed Ball", revenue: 5000000, commission: 500000, timestamp: "15m ago" },
  { id: "LOG-003", event: "click", customer: "Anonymous", product: "-", revenue: 0, commission: 0, timestamp: "30m ago" },
];

const refLinkColumns: ColumnDef<RefLink>[] = [
  {
    accessorKey: "link",
    header: "Ref Link",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs truncate max-w-xs">{row.original.link}</span>
        <button className="p-1 hover:bg-zinc-800 rounded" title="Copy link">
          <Copy className="w-3.5 h-3.5 text-zinc-400" />
        </button>
      </div>
    ),
  },
  {
    accessorKey: "channel",
    header: "Channel",
    cell: ({ row }) => <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded">{row.original.channel}</span>,
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1 text-sm">
        <MousePointerClick className="w-3.5 h-3.5 text-zinc-500" />
        {row.original.clicks.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "conversions",
    header: "Conversions",
    cell: ({ row }) => <span className="font-semibold text-green-500">{row.original.conversions}</span>,
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => <span className="font-semibold">{formatPrice(row.original.revenue, "VND")}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => <span className="text-xs text-zinc-400">{new Date(row.original.createdAt).toLocaleDateString("vi-VN")}</span>,
  },
];

const logColumns: ColumnDef<AffiliateLog>[] = [
  {
    accessorKey: "event",
    header: "Event",
    cell: ({ row }) => {
      const event = row.original.event;
      const colorMap = {
        conversion: "bg-green-500/10 text-green-500",
        click: "bg-blue-500/10 text-blue-500",
      };
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${colorMap[event as keyof typeof colorMap]}`}>
          {event.charAt(0).toUpperCase() + event.slice(1)}
        </span>
      );
    },
  },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "product", header: "Product" },
  {
    accessorKey: "commission",
    header: "Commission",
    cell: ({ row }) => (
      <span className="font-semibold text-green-500">
        {row.original.commission > 0 ? formatPrice(row.original.commission, "VND") : "-"}
      </span>
    ),
  },
  { accessorKey: "timestamp", header: "Time", cell: ({ row }) => <span className="text-xs text-zinc-400">{row.original.timestamp}</span> },
];

export default function DashboardAffiliatesPage() {
  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        title="Affiliates"
        description="Affiliate tracking & commission management"
        visibleFor={["admin", "affiliate"]}
        ownOnlyFor={["affiliate"]}
      />

      {/* KPIs */}
      <KPIGrid columns={4}>
        <KPICard label="Total Clicks" value="4,330" change="+18%" trend="up" icon={MousePointerClick} iconColor="text-blue-500" />
        <KPICard label="Conversions" value="115" change="+12%" trend="up" icon={TrendingUp} iconColor="text-green-500" />
        <KPICard label="Total Sales" value="₫287.5M" change="+24%" trend="up" icon={DollarSign} iconColor="text-purple-500" />
        <KPICard label="Payout Pending" value="₫28.75M" change="" trend="neutral" icon={Users} iconColor="text-orange-500" description="10% commission" />
      </KPIGrid>

      {/* Ref Links */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">Referral Links</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Link
          </Button>
        </div>
        <DataTable columns={refLinkColumns} data={mockRefLinks} searchKey="channel" searchPlaceholder="Search by channel..." showPagination={false} />
      </div>

      {/* Activity Logs */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Activity Logs</h2>
        <DataTable columns={logColumns} data={mockLogs} showPagination={false} showExport={false} />
      </div>

      {/* Payout Info */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Payout Schedule</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <div className="text-xs text-zinc-500 mb-1">Commission Rate</div>
              <div className="text-xl font-bold text-white">10%</div>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <div className="text-xs text-zinc-500 mb-1">Payout Cycle</div>
              <div className="text-xl font-bold text-white">Monthly</div>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <div className="text-xs text-zinc-500 mb-1">Next Payout</div>
              <div className="text-xl font-bold text-green-500">Feb 1, 2024</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

