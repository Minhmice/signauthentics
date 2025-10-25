"use client";

/**
 * Affiliates Management Page
 * Full CRUD operations với commission tracking và sales stats
 */

import * as React from "react";
import { DashboardSectionHeader } from '@/app/dashboard/components/shared/RoleBadge';
import { DataTable } from "@/app/dashboard/components/shared/DataTable";
import { ConfirmDialog } from '@/app/dashboard/components/shared/ConfirmDialog';
import { FilterPopover, FilterOption } from '@/app/dashboard/components/shared/FilterPopover';
import { ActionMenu, createActionItems } from '@/app/dashboard/components/shared/ActionMenu';
import { StatusBadge } from '@/app/dashboard/components/shared/StatusBadge';
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Users, DollarSign, Eye } from "lucide-react";
import { affiliatesAPI, type Affiliate } from "@/lib/mock/db";
import { formatPrice } from "@/lib/ui/price";
import { ClientDate } from "@/components/shared/ClientDate";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { AffiliateForm } from "./components/AffiliateForm";

// Filter options for affiliates
const filterOptions: FilterOption[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  },
  {
    key: "commissionRange",
    label: "Commission Rate",
    type: "number",
    placeholder: "Min commission %",
  },
  {
    key: "salesRange",
    label: "Total Sales",
    type: "number",
    placeholder: "Min sales amount",
  },
  {
    key: "referralRange",
    label: "Referrals",
    type: "number",
    placeholder: "Min referrals",
  },
];

export default function DashboardAffiliatesPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [affiliates, setAffiliates] = React.useState<Affiliate[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState<Record<string, unknown>>({});
  const [deleteAffiliateId, setDeleteAffiliateId] = React.useState<string | null>(null);
  const [selectedAffiliate, setSelectedAffiliate] = React.useState<Affiliate | undefined>();

  // Load affiliates
  React.useEffect(() => {
    loadAffiliates();
  }, [filters]);

  const loadAffiliates = async () => {
    try {
      setLoading(true);
      const data = await affiliatesAPI.getAll();
      setAffiliates(data.filter((affiliate): affiliate is Affiliate => affiliate !== null));
    } catch (error) {
      toast.error("Failed to load affiliates");
      console.error("Error loading affiliates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (affiliate: Affiliate) => {
    console.log("View affiliate:", affiliate.id);
    // TODO: Open affiliate detail modal
  };

  const handleEdit = (affiliate: Affiliate) => {
    setSelectedAffiliate(affiliate);
    setIsFormOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedAffiliate(undefined);
    setIsFormOpen(true);
  };

  const handleSave = async (data: Record<string, unknown>) => {
    try {
      if (selectedAffiliate) {
        // Update existing affiliate
        await affiliatesAPI.update(selectedAffiliate.id, data);
        toast.success("Affiliate updated successfully");
      } else {
        // Create new affiliate
        await affiliatesAPI.create(data as any);
        toast.success("Affiliate created successfully");
      }
      await loadAffiliates();
      setIsFormOpen(false);
    } catch (error) {
      toast.error("Failed to save affiliate");
      console.error("Error saving affiliate:", error);
    }
  };

  const handleDelete = (affiliateId: string) => {
    setDeleteAffiliateId(affiliateId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteAffiliateId) return;
    
    try {
      await affiliatesAPI.delete(deleteAffiliateId);
      setAffiliates(affiliates.filter(a => a.id !== deleteAffiliateId));
      toast.success("Affiliate deleted successfully");
    } catch (error) {
      toast.error("Failed to delete affiliate");
      console.error("Error deleting affiliate:", error);
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteAffiliateId(null);
    }
  };

  const handleBulkDelete = async (selectedIds: string[]) => {
    try {
      await affiliatesAPI.bulkDelete(selectedIds);
      setAffiliates(affiliates.filter(a => !selectedIds.includes(a.id)));
      toast.success(`${selectedIds.length} affiliates deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete affiliates");
      console.error("Error deleting affiliates:", error);
    }
  };

  const handleToggleStatus = async (affiliateId: string) => {
    try {
      const affiliate = affiliates.find(a => a.id === affiliateId);
      if (!affiliate) return;

      const newStatus = affiliate.status === 'active' ? 'inactive' : 'active';
      const updatedAffiliate = await affiliatesAPI.update(affiliateId, { status: newStatus });
      setAffiliates(affiliates.map(a => a.id === affiliateId ? updatedAffiliate : a).filter(Boolean) as typeof affiliates);
      toast.success(`Affiliate ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch (error) {
      toast.error("Failed to update affiliate status");
      console.error("Error updating affiliate status:", error);
    }
  };

  const handleCommissionUpdate = async (affiliateId: string, newRate: number) => {
    try {
      const updatedAffiliate = await affiliatesAPI.update(affiliateId, { commissionRate: newRate });
      setAffiliates(affiliates.map(a => a.id === affiliateId ? updatedAffiliate : a).filter(Boolean) as typeof affiliates);
      toast.success(`Commission rate updated to ${newRate}%`);
    } catch (error) {
      toast.error("Failed to update commission rate");
      console.error("Error updating commission rate:", error);
    }
  };

  const handleExport = (format: string, data: Affiliate[]) => {
    toast.success(`Exported ${data.length} affiliates as ${format.toUpperCase()}`);
  };

  const affiliateColumns: ColumnDef<Affiliate>[] = [
    {
      accessorKey: "name",
      header: "Affiliate",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-zinc-400" />
          </div>
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-xs text-zinc-500">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => (
        <span className="font-mono text-sm bg-zinc-800 px-2 py-1 rounded">
          {row.original.code}
        </span>
      ),
    },
    {
      accessorKey: "commissionRate",
      header: "Commission",
      cell: ({ row }) => (
        <div className="text-sm font-medium">
          {row.original.commissionRate}%
        </div>
      ),
    },
    {
      accessorKey: "totalSales",
      header: "Total Sales",
      cell: ({ row }) => (
        <div className="text-sm text-right">
          <div className="font-medium">{formatPrice(row.original.totalSales, "VND")}</div>
        </div>
      ),
    },
    {
      accessorKey: "totalCommission",
      header: "Commission Earned",
      cell: ({ row }) => (
        <div className="text-sm text-right">
          <div className="font-medium text-green-500">{formatPrice(row.original.totalCommission, "VND")}</div>
        </div>
      ),
    },
    {
      accessorKey: "referralCount",
      header: "Referrals",
      cell: ({ row }) => (
        <div className="text-sm text-center">
          <div className="font-medium">{row.original.referralCount}</div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "joinedAt",
      header: "Joined",
      cell: ({ row }) => (
        <div className="text-sm">
          <ClientDate date={row.original.joinedAt} variant="vn" />
        </div>
      ),
    },
    {
      accessorKey: "lastActivityAt",
      header: "Last Activity",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.lastActivityAt 
            ? <ClientDate date={row.original.lastActivityAt} variant="vn" />
            : "Never"
          }
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
            () => handleDelete(row.original.id),
            () => handleView(row.original)
          )}
        />
      ),
    },
  ];

  const bulkActions = [
    {
      id: "bulk-activate",
      label: "Activate Selected",
      icon: <Users className="w-4 h-4" />,
      variant: "default" as const,
      onClick: (selectedIds: string[]) => {
        selectedIds.forEach(id => handleToggleStatus(id));
      },
    },
    {
      id: "bulk-delete",
      label: "Delete Selected",
      icon: <Trash2 className="w-4 h-4" />,
      variant: "destructive" as const,
      onClick: handleBulkDelete,
    },
  ];

  // Calculate totals
  const totalSales = affiliates.reduce((sum, a) => sum + a.totalSales, 0);
  const totalCommission = affiliates.reduce((sum, a) => sum + a.totalCommission, 0);
  const totalReferrals = affiliates.reduce((sum, a) => sum + a.referralCount, 0);

  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        title="Affiliates"
        description={`Quản lý đối tác - ${affiliates.length} affiliates total`}
        visibleFor={["admin"]}
        readOnlyFor={["seller", "editor"]}
        actions={
          <div className="flex items-center gap-2">
            <FilterPopover
              filters={filterOptions}
              values={filters}
              onValuesChange={setFilters}
              onClear={() => setFilters({})}
            />
            <Button 
              onClick={handleCreateNew}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Affiliate
            </Button>
          </div>
        }
      />

      {/* Affiliates Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-zinc-300">Total Affiliates</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">{affiliates.length}</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-zinc-300">Total Sales</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">{formatPrice(totalSales, "VND")}</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-zinc-300">Commission Paid</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">{formatPrice(totalCommission, "VND")}</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-zinc-300">Total Referrals</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">{totalReferrals}</div>
        </div>
      </div>

      {/* Affiliates Table */}
      <DataTable
        columns={affiliateColumns}
        data={affiliates}
        searchKey="name"
        searchPlaceholder="Search affiliates..."
        pageSize={10}
        loading={loading}
        getRowId={(row) => row.id}
        bulkActions={bulkActions}
        onExport={handleExport}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Affiliate"
        description="Are you sure you want to delete this affiliate? This action cannot be undone."
        confirmText="Delete"
        onConfirm={confirmDelete}
        variant="destructive"
      />

      {/* Affiliate Form Dialog */}
      <AffiliateForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        affiliate={selectedAffiliate as any}
        onSave={handleSave}
      />
    </div>
  );
}