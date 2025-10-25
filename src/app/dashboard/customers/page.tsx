"use client";

/**
 * Customers Management Page
 * Full CRUD operations với ban/unban, reset password, purchase history
 */

import * as React from "react";
import { DashboardSectionHeader } from "@/app/dashboard/components/shared/RoleBadge";
import { DataTable } from "@/app/dashboard/components/shared/DataTable";
import { ConfirmDialog } from "@/app/dashboard/components/shared/ConfirmDialog";
import { CustomerForm } from "./components/CustomerForm";
import { BanCustomerDialog } from "./components/BanCustomerDialog";
import { ResetPasswordDialog } from "./components/ResetPasswordDialog";
import { PurchaseHistoryDialog } from "./components/PurchaseHistoryDialog";
import { createCustomersTableColumns } from "./components/CustomersTableColumns";
import { CustomersFilters } from "./components/CustomersFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { customersAPI, type Customer } from "@/lib/mock/db";
import { toast } from "sonner";

export default function DashboardCustomersPage() {
  const [mounted, setMounted] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isBanDialogOpen, setIsBanDialogOpen] = React.useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = React.useState(false);
  const [isPurchaseHistoryDialogOpen, setIsPurchaseHistoryDialogOpen] = React.useState(false);
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState<Record<string, unknown>>({});
  const [deleteCustomerId, setDeleteCustomerId] = React.useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | undefined>();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Load customers
  React.useEffect(() => {
    loadCustomers();
  }, [filters]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await customersAPI.getAll();
      setCustomers(data.filter((customer): customer is Customer => customer !== null));
    } catch (error) {
      toast.error("Failed to load customers");
      console.error("Error loading customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDeleteCustomerId(customer.id);
    setIsDeleteDialogOpen(true);
  };

  const handleBan = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsBanDialogOpen(true);
  };

  const handleUnban = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsBanDialogOpen(true);
  };

  const handleResetPassword = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsResetPasswordDialogOpen(true);
  };

  const handleViewPurchaseHistory = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsPurchaseHistoryDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteCustomerId) return;

    try {
      await customersAPI.delete(deleteCustomerId);
      setCustomers(prev => prev.filter(c => c.id !== deleteCustomerId));
      toast.success("Customer deleted successfully");
    } catch (error) {
      toast.error("Failed to delete customer");
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteCustomerId(null);
    }
  };

  const handleSave = async (data: Record<string, unknown>) => {
    try {
      if (selectedCustomer) {
        // Update existing customer
        const updated = await customersAPI.update(selectedCustomer.id, data);
        if (updated) {
          setCustomers(prev => prev.map(c => c.id === selectedCustomer.id ? updated : c));
          toast.success("Customer updated successfully");
        }
      } else {
        // Create new customer
        const created = await customersAPI.create(data as Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>);
        if (created) {
          setCustomers(prev => [...prev, created]);
          toast.success("Customer created successfully");
        }
      }
    } catch (error) {
      toast.error("Failed to save customer");
    } finally {
      setIsFormOpen(false);
      setSelectedCustomer(undefined);
    }
  };

  const handleBanCustomer = async (reason: string) => {
    if (!selectedCustomer) return;

    try {
      const updated = await ((customersAPI as Record<string, unknown>).banCustomer as (id: string, reason: string) => Promise<Customer | null>)(selectedCustomer.id, reason);
      if (updated) {
        setCustomers(prev => prev.map(c => c.id === selectedCustomer.id ? updated : c));
        toast.success("Customer banned successfully");
      }
    } catch (error) {
      toast.error("Failed to ban customer");
    } finally {
      setIsBanDialogOpen(false);
      setSelectedCustomer(undefined);
    }
  };

  const handleUnbanCustomer = async () => {
    if (!selectedCustomer) return;

    try {
      const updated = await ((customersAPI as Record<string, unknown>).unbanCustomer as (id: string) => Promise<Customer | null>)(selectedCustomer.id);
      if (updated) {
        setCustomers(prev => prev.map(c => c.id === selectedCustomer.id ? updated : c));
        toast.success("Customer unbanned successfully");
      }
    } catch (error) {
      toast.error("Failed to unban customer");
    } finally {
      setIsBanDialogOpen(false);
      setSelectedCustomer(undefined);
    }
  };

  const handleResetPasswordConfirm = async () => {
    if (!selectedCustomer) return;

    try {
      const result = await ((customersAPI as Record<string, unknown>).resetPassword as (id: string) => Promise<{ success: boolean; tempPassword: string }>)(selectedCustomer.id);
      if (result.success) {
        toast.success(`Password reset successful. Temporary password: ${result.tempPassword}`);
      }
    } catch (error) {
      toast.error("Failed to reset password");
    } finally {
      setIsResetPasswordDialogOpen(false);
      setSelectedCustomer(undefined);
    }
  };

  // Create table columns with action handlers
  const columns = createCustomersTableColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onBan: handleBan,
    onUnban: handleUnban,
    onResetPassword: handleResetPassword,
    onViewHistory: handleViewPurchaseHistory,
    onCopyReferralCode: (customer) => {
      navigator.clipboard.writeText(customer.referralCode);
      toast.success("Referral code copied to clipboard");
    },
  });

  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        title="Customers"
        description="Manage customer accounts, view purchase history, and handle customer support"
      />

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <CustomersFilters />
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={customers}
        searchPlaceholder="Search customers..."
        searchKey="name"
        getRowId={(row) => row.id}
        loading={loading}
      />

      {/* Dialogs */}
      <CustomerForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        customer={selectedCustomer}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Customer"
        description="Are you sure you want to delete this customer? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
      />

      <BanCustomerDialog
        open={isBanDialogOpen}
        onOpenChange={setIsBanDialogOpen}
        customer={selectedCustomer}
        onBan={handleBanCustomer}
        onUnban={handleUnbanCustomer}
      />

      <ResetPasswordDialog
        open={isResetPasswordDialogOpen}
        onOpenChange={setIsResetPasswordDialogOpen}
        customer={selectedCustomer}
        onConfirm={handleResetPasswordConfirm}
      />

      <PurchaseHistoryDialog
        open={isPurchaseHistoryDialogOpen}
        onOpenChange={setIsPurchaseHistoryDialogOpen}
        customer={selectedCustomer}
      />
    </div>
  );
}