"use client";

/**
 * Customers Table Columns Definition
 * Định nghĩa các cột cho bảng customers
 */

import { ColumnDef } from "@tanstack/react-table";
import { ActionMenu, createActionItems } from "@/app/dashboard/components/shared/ActionMenu";
import { StatusBadge } from "@/app/dashboard/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/ui/price";
import { User, Shield, Eye, Edit, Ban, Key, History, Copy, Trash2 } from "lucide-react";
import type { Customer } from "@/lib/mock/db";

interface CustomersTableColumnsProps {
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onBan: (customer: Customer) => void;
  onUnban: (customer: Customer) => void;
  onResetPassword: (customer: Customer) => void;
  onViewHistory: (customer: Customer) => void;
  onCopyReferralCode: (customer: Customer) => void;
}

export function createCustomersTableColumns({
  onEdit,
  onDelete,
  onBan,
  onUnban,
  onResetPassword,
  onViewHistory,
  onCopyReferralCode,
}: CustomersTableColumnsProps): ColumnDef<Customer>[] {
  return [
    {
      accessorKey: "name",
      header: "Tên khách hàng",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-zinc-300" />
          </div>
          <div>
            <div className="font-medium text-white">{row.getValue("name")}</div>
            <div className="text-sm text-zinc-400">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Số điện thoại",
      cell: ({ row }) => (
        <div className="text-zinc-300">{row.getValue("phone") || "Chưa cập nhật"}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <StatusBadge status={status} />;
      },
    },
    {
      accessorKey: "membershipTier",
      header: "Hạng thành viên",
      cell: ({ row }) => {
        const tier = row.getValue("membershipTier") as string;
        const tierColors: Record<string, string> = {
          bronze: "bg-amber-900 text-amber-300",
          silver: "bg-gray-900 text-gray-300",
          gold: "bg-yellow-900 text-yellow-300",
          platinum: "bg-purple-900 text-purple-300",
        };
        return (
          <Badge className={tierColors[tier] || "bg-zinc-900 text-zinc-300"}>
            {tier.charAt(0).toUpperCase() + tier.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "loyaltyPoints",
      header: "Điểm tích lũy",
      cell: ({ row }) => (
        <div className="text-zinc-300">{row.getValue("loyaltyPoints")?.toLocaleString() || 0}</div>
      ),
    },
    {
      accessorKey: "totalSpent",
      header: "Tổng chi tiêu",
      cell: ({ row }) => (
        <div className="text-green-400 font-semibold">
          {formatPrice(row.original.totalSpent || 0)}
        </div>
      ),
    },
    {
      accessorKey: "referralCode",
      header: "Mã giới thiệu",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-zinc-300">{row.getValue("referralCode")}</span>
          <button
            onClick={() => onCopyReferralCode(row.original)}
            className="p-1 hover:bg-zinc-700 rounded"
          >
            <Copy className="w-3 h-3 text-zinc-500" />
          </button>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => {
        const customer = row.original;
        const isBanned = customer.status === "banned";
        
        const actionItems = [
          {
            id: "view",
            label: "Xem chi tiết",
            icon: <Eye className="w-4 h-4" />,
            onClick: () => onEdit(customer),
          },
          {
            id: "edit",
            label: "Chỉnh sửa",
            icon: <Edit className="w-4 h-4" />,
            onClick: () => onEdit(customer),
          },
          {
            id: "ban",
            label: isBanned ? "Bỏ cấm" : "Cấm tài khoản",
            icon: isBanned ? <Shield className="w-4 h-4" /> : <Ban className="w-4 h-4" />,
            onClick: () => isBanned ? onUnban(customer) : onBan(customer),
            destructive: !isBanned,
          },
          {
            id: "reset-password",
            label: "Reset mật khẩu",
            icon: <Key className="w-4 h-4" />,
            onClick: () => onResetPassword(customer),
          },
          {
            id: "history",
            label: "Lịch sử mua hàng",
            icon: <History className="w-4 h-4" />,
            onClick: () => onViewHistory(customer),
          },
          {
            id: "delete",
            label: "Xóa",
            icon: <Trash2 className="w-4 h-4" />,
            onClick: () => onDelete(customer),
            destructive: true,
          },
        ];

        return <ActionMenu actions={actionItems} />;
      },
    },
  ];
}
