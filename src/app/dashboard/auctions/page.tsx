"use client";

/**
 * Auctions Management Page
 * Full CRUD operations với countdown timer và real-time updates
 */

import * as React from "react";
import { DashboardSectionHeader } from '@/app/dashboard/components/shared/RoleBadge';
import { DataTable } from "@/app/dashboard/components/shared/DataTable";
import { ConfirmDialog } from '@/app/dashboard/components/shared/ConfirmDialog';
import { FilterPopover, FilterOption } from '@/app/dashboard/components/shared/FilterPopover';
import { ActionMenu, createActionItems } from '@/app/dashboard/components/shared/ActionMenu';
import { StatusBadge } from '@/app/dashboard/components/shared/StatusBadge';
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Clock, Gavel, Eye } from "lucide-react";
import { auctionsAPI, productsAPI, type Auction } from "@/lib/mock/db";
import { formatPrice } from "@/lib/ui/price";
import { ClientDate } from "@/components/shared/ClientDate";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { AuctionForm } from "./components/AuctionForm";

// Countdown Timer Component
function CountdownTimer({ endTime }: { endTime: string }) {
  const [mounted, setMounted] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState<string>("Loading...");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft(`${minutes}m ${seconds}s`);
        }
      } else {
        setTimeLeft("Ended");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTime, mounted]);

  const isEnded = new Date(endTime).getTime() <= new Date().getTime();
  const isEndingSoon = new Date(endTime).getTime() - new Date().getTime() < 60 * 60 * 1000; // 1 hour

  return (
    <div className={`text-sm font-medium ${
      isEnded 
        ? "text-red-500" 
        : isEndingSoon 
        ? "text-yellow-500" 
        : "text-green-500"
    }`}>
      {timeLeft}
    </div>
  );
}

// Filter options for auctions
const filterOptions: FilterOption[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "live", label: "Live" },
      { value: "upcoming", label: "Upcoming" },
      { value: "ended", label: "Ended" },
    ],
  },
  {
    key: "minBid",
    label: "Min Bid",
    type: "number",
    placeholder: "Min bid amount",
  },
  {
    key: "biddersCount",
    label: "Bidders",
    type: "number",
    placeholder: "Min bidders",
  },
];

export default function DashboardAuctionsPage() {
  const [mounted, setMounted] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isAuctionFormOpen, setIsAuctionFormOpen] = React.useState(false);
  const [auctions, setAuctions] = React.useState<Auction[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState<Record<string, unknown>>({});
  const [deleteAuctionId, setDeleteAuctionId] = React.useState<string | null>(null);

  // Mount effect
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Load auctions
  React.useEffect(() => {
    loadAuctions();
  }, [filters]);

  const loadAuctions = async () => {
    try {
      setLoading(true);
      const data = await auctionsAPI.getAll();
      setAuctions(data.filter((auction): auction is Auction => auction !== null));
    } catch (error) {
      toast.error("Failed to load auctions");
      console.error("Error loading auctions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (auction: Auction) => {
    // TODO: Implement view auction details
    toast.info("View auction details");
  };

  const handleEdit = (auction: Auction) => {
    // TODO: Open auction edit modal
    toast.info("Edit auction");
  };

  const handleCreateAuction = () => {
    setIsAuctionFormOpen(true);
  };

  const handleSaveAuction = async (data: any) => {
    try {
      const productIds = data.productIds || [];
      const selectedProducts = data.selectedProducts || [];
      
      if (productIds.length === 0) {
        toast.error("Vui lòng chọn ít nhất 1 sản phẩm");
        return;
      }

      // Create auction for each selected product
      const createdAuctions = [];
      for (let i = 0; i < productIds.length; i++) {
        const productId = productIds[i];
        const product = selectedProducts.find((p: any) => p.id === productId);
        const productTitle = product?.title || "Unknown Product";
        
        const newAuction = await auctionsAPI.create({
          productId: productId,
          productTitle: productTitle,
          startAt: data.startAt,
          endAt: data.endAt,
          minIncrementVND: data.minIncrementVND,
          highestBidVND: 0,
          highestBidderId: "",
          highestBidderName: "",
          biddersCount: 0,
          status: data.status,
        });
        
        createdAuctions.push(newAuction);
      }
      
      // Reload auctions to get the updated list
      await loadAuctions();
      toast.success(`Đã tạo thành công ${createdAuctions.length} đấu giá!`);
    } catch (error) {
      console.error("Error creating auctions:", error);
      toast.error("Failed to create auctions");
    }
  };

  const handleDelete = (auction: Auction) => {
    setDeleteAuctionId(auction.id);
    setIsDeleteDialogOpen(true);
  };

  const handleDuplicate = (auction: Auction) => {
    // TODO: Duplicate auction
    toast.info("Duplicate auction");
  };

  const confirmDelete = async () => {
    if (!deleteAuctionId) return;
    
    try {
      await auctionsAPI.delete(deleteAuctionId);
      setAuctions(auctions.filter(a => a.id !== deleteAuctionId));
      toast.success("Auction deleted successfully");
    } catch (error) {
      toast.error("Failed to delete auction");
      console.error("Error deleting auction:", error);
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteAuctionId(null);
    }
  };

  const handleBulkDelete = async (selectedIds: string[]) => {
    try {
      await auctionsAPI.bulkDelete(selectedIds);
      setAuctions(auctions.filter(a => !selectedIds.includes(a.id)));
      toast.success(`${selectedIds.length} auctions deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete auctions");
      console.error("Error deleting auctions:", error);
    }
  };

  const handleStatusUpdate = async (auctionId: string, status: string) => {
    try {
      const updatedAuction = await auctionsAPI.update(auctionId, { status });
      setAuctions(auctions.map(a => a.id === auctionId ? updatedAuction : a).filter(Boolean) as typeof auctions);
      toast.success(`Auction status updated to ${status}`);
    } catch (error) {
      toast.error("Failed to update auction status");
      console.error("Error updating auction status:", error);
    }
  };

  const handleExtendTime = async (auctionId: string, hours: number) => {
    try {
      const auction = auctions.find(a => a.id === auctionId);
      if (!auction) return;

      const newEndTime = new Date(auction.endAt);
      newEndTime.setHours(newEndTime.getHours() + hours);
      
      const updatedAuction = await auctionsAPI.update(auctionId, { 
        endAt: newEndTime.toISOString() 
      });
      setAuctions(auctions.map(a => a.id === auctionId ? updatedAuction : a).filter(Boolean) as typeof auctions);
      toast.success(`Auction extended by ${hours} hours`);
    } catch (error) {
      toast.error("Failed to extend auction");
      console.error("Error extending auction:", error);
    }
  };

  const handleExport = (format: string, data: Auction[]) => {
    toast.success(`Exported ${data.length} auctions as ${format.toUpperCase()}`);
  };

  const auctionColumns: ColumnDef<Auction>[] = [
    {
      accessorKey: "id",
      header: "Auction ID",
      cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
    },
    {
      accessorKey: "productTitle",
      header: "Product",
      cell: ({ row }) => (
        <div className="font-medium max-w-xs truncate">{row.original.productTitle}</div>
      ),
    },
    {
      accessorKey: "highestBidVND",
      header: "Current Bid",
      cell: ({ row }) => (
        <div className="text-right">
          <div className="font-semibold">{formatPrice(row.original.highestBidVND, "VND")}</div>
          <div className="text-xs text-zinc-500">
            {row.original.biddersCount} bidder{row.original.biddersCount !== 1 ? 's' : ''}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "endAt",
      header: "Time Left",
      cell: ({ row }) => <CountdownTimer endTime={row.original.endAt} />,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "highestBidderName",
      header: "Highest Bidder",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.highestBidderName || "No bids yet"}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <div className="text-sm">
          <ClientDate date={row.original.createdAt} variant="vn" />
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionMenu
          actions={createActionItems(
            () => handleEdit(row.original),
            () => handleDelete(row.original),
            () => handleView(row.original)
          )}
        />
      ),
    },
  ];

  const bulkActions = [
    {
      id: "bulk-delete",
      label: "Delete Selected",
      icon: <Trash2 className="w-4 h-4" />,
      variant: "destructive" as const,
      onClick: handleBulkDelete,
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        title="Auctions"
        description={`Quản lý đấu giá - ${auctions.length} auctions total`}
        visibleFor={["admin", "seller"]}
        readOnlyFor={["editor"]}
        actions={
          <div className="flex items-center gap-2">
            <FilterPopover
              filters={filterOptions}
              values={filters}
              onValuesChange={setFilters}
              onClear={() => setFilters({})}
            />
            <Button 
              onClick={handleCreateAuction}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Auction
            </Button>
          </div>
        }
      />

      {/* Live Auctions Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Gavel className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-zinc-300">Live Auctions</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">
            {auctions.filter(a => a.status === 'live').length}
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-zinc-300">Upcoming</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">
            {auctions.filter(a => a.status === 'upcoming').length}
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-zinc-500" />
            <span className="text-sm font-medium text-zinc-300">Ended</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">
            {auctions.filter(a => a.status === 'ended').length}
          </div>
        </div>
      </div>

      {/* Auctions Table */}
      {mounted ? (
        <DataTable
          columns={auctionColumns}
          data={auctions}
          searchKey="productTitle"
          searchPlaceholder="Search auctions..."
          pageSize={10}
          loading={loading}
          getRowId={(row) => row.id}
          bulkActions={bulkActions}
          onExport={handleExport}
          onRowView={handleView}
          onRowEdit={handleEdit}
          onRowDelete={handleDelete}
          onRowDuplicate={handleDuplicate}
        />
      ) : (
        <div className="flex items-center justify-center h-32">
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Auction"
        description="Are you sure you want to delete this auction? This action cannot be undone."
        confirmText="Delete"
        onConfirm={confirmDelete}
        variant="destructive"
      />

      {/* Auction Form Modal */}
      <AuctionForm
        open={isAuctionFormOpen}
        onOpenChange={setIsAuctionFormOpen}
        onSave={handleSaveAuction}
      />
    </div>
  );
}
