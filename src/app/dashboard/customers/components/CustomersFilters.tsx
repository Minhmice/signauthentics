"use client";

/**
 * Customers Filters Component
 * Các bộ lọc cho trang customers
 */

import * as React from "react";
import { FilterPopover, FilterOption } from "@/app/dashboard/components/shared/FilterPopover";

// Filter options for customers
export const customersFilterOptions: FilterOption[] = [
  {
    key: "status",
    label: "Trạng thái",
    type: "select",
    options: [
      { value: "active", label: "Hoạt động" },
      { value: "inactive", label: "Không hoạt động" },
      { value: "banned", label: "Bị cấm" },
    ],
  },
  {
    key: "membershipTier",
    label: "Hạng thành viên",
    type: "select",
    options: [
      { value: "bronze", label: "Đồng" },
      { value: "silver", label: "Bạc" },
      { value: "gold", label: "Vàng" },
      { value: "platinum", label: "Bạch kim" },
    ],
  },
  {
    key: "loyaltyPoints",
    label: "Điểm tích lũy",
    type: "number",
    placeholder: "Nhập điểm tích lũy",
  },
  {
    key: "totalSpent",
    label: "Tổng chi tiêu",
    type: "number",
    placeholder: "Nhập tổng chi tiêu",
  },
  {
    key: "createdAt",
    label: "Ngày tạo",
    type: "date",
    placeholder: "Chọn ngày tạo",
  },
  {
    key: "lastLoginAt",
    label: "Lần đăng nhập cuối",
    type: "date",
    placeholder: "Chọn ngày đăng nhập cuối",
  },
];

export function CustomersFilters() {
  const [filters, setFilters] = React.useState<Record<string, unknown>>({});

  return (
    <FilterPopover
      filters={customersFilterOptions}
      values={filters}
      onValuesChange={setFilters}
      onClear={() => setFilters({})}
    />
  );
}
