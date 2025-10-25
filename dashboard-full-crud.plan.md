<!-- 32ab1af3-acac-4354-8066-f2a0ba391343 53789891-f2ac-4e53-b815-1c37fa1f4ca6 -->
# Kế hoạch Tổ chức lại Dashboard Components

## 1. Tạo cấu trúc thư mục mới

### 1.1 Shared components cho toàn bộ dashboard

```
src/app/dashboard/components/shared/
  ├── ActionMenu.tsx (move from src/components/dashboard/)
  ├── BulkActionsBar.tsx
  ├── ConfirmDialog.tsx
  ├── SearchBar.tsx
  ├── StatusBadge.tsx
  ├── FilterPopover.tsx
  ├── ExportButton.tsx
  ├── ImportButton.tsx
  ├── ImageUpload.tsx
  ├── ContextMenu.tsx (224 lines - cần chia nhỏ)
  ├── TableContextMenu.tsx
  ├── DateRangePicker.tsx
  ├── ChartPlaceholder.tsx
  ├── RoleBadge.tsx
  └── ContentImageExample.tsx
```

### 1.2 Form base với stepper (mới tạo)

```
src/app/dashboard/components/forms/
  ├── BaseForm.tsx (Form wrapper với stepper, validation, animations)
  ├── FormStepper.tsx (Stepper component)
  ├── FormStep.tsx (Individual step wrapper)
  └── shared/
      ├── FormSection.tsx (move from src/components/dashboard/forms/shared/)
      ├── FieldTooltip.tsx
      ├── FormAnimations.tsx (350 lines - giữ nguyên, dùng chung)
      └── AddressInput.tsx (447 lines - cần chia nhỏ)
```

### 1.3 Tables (giữ ở vị trí hiện tại)

```
src/components/dashboard/tables/
  ├── DataTable.tsx (382 lines - giữ nguyên, shared)
  └── ProductGrid.tsx
```

## 2. Chia nhỏ các file lớn (>200 lines)

### 2.1 ContextMenu.tsx (224 lines)

Chia thành:

- `src/app/dashboard/components/shared/ContextMenu.tsx` (base logic)
- `src/app/dashboard/components/shared/ContextMenuItems.tsx` (menu items config)

### 2.2 ImageUpload.tsx (288 lines)

Chia thành:

- `src/app/dashboard/components/shared/ImageUpload/index.tsx` (main component)
- `src/app/dashboard/components/shared/ImageUpload/ImagePreview.tsx` (preview logic)
- `src/app/dashboard/components/shared/ImageUpload/UploadZone.tsx` (drag & drop zone)

### 2.3 PurchaseHistoryDialog.tsx (219 lines)

Di chuyển và chia:

- `src/app/dashboard/customers/components/PurchaseHistoryDialog/index.tsx`
- `src/app/dashboard/customers/components/PurchaseHistoryDialog/OrdersTab.tsx`
- `src/app/dashboard/customers/components/PurchaseHistoryDialog/AuctionsTab.tsx`

### 2.4 VoucherDetail.tsx (301 lines)

Di chuyển và chia:

- `src/app/dashboard/vouchers/components/VoucherDetail/index.tsx`
- `src/app/dashboard/vouchers/components/VoucherDetail/UsageStats.tsx`
- `src/app/dashboard/vouchers/components/VoucherDetail/VoucherInfo.tsx`

### 2.5 AddressInput.tsx (447 lines)

Chia thành:

- `src/app/dashboard/components/forms/shared/AddressInput/index.tsx`
- `src/app/dashboard/components/forms/shared/AddressInput/AddressForm.tsx`
- `src/app/dashboard/components/forms/shared/AddressInput/AddressList.tsx`

### 2.6 DataTable.tsx (382 lines)

Chia thành:

- `src/components/dashboard/tables/DataTable/index.tsx`
- `src/components/dashboard/tables/DataTable/TableToolbar.tsx`
- `src/components/dashboard/tables/DataTable/TablePagination.tsx`
- `src/components/dashboard/tables/DataTable/ColumnVisibility.tsx`

## 3. Tạo BaseForm với Stepper

### 3.1 BaseForm.tsx

```typescript
// src/app/dashboard/components/forms/BaseForm.tsx
// Chứa:
// - Dialog wrapper
// - Form provider (react-hook-form)
// - Stepper logic
// - Navigation buttons (Next, Previous, Submit)
// - Progress indicator
// - Validation per step
```

### 3.2 Refactor các form hiện tại

#### UserForm.tsx (1034 lines) → Chia thành steps:

```
src/app/dashboard/users/components/
  ├── UserForm.tsx (main, sử dụng BaseForm)
  └── UserFormSteps/
      ├── BasicInfoStep.tsx (~150 lines)
      ├── PasswordStep.tsx (~100 lines)
      ├── EmployeeInfoStep.tsx (~150 lines)
      ├── EmergencyContactStep.tsx (~100 lines)
      ├── PermissionsStep.tsx (~200 lines)
      └── SettingsStep.tsx (~150 lines)
```

#### ProductForm.tsx (628 lines) → Chia thành steps:

```
src/app/dashboard/products/components/
  ├── ProductForm.tsx (main, sử dụng BaseForm)
  └── ProductFormSteps/
      ├── BasicDetailsStep.tsx (~150 lines)
      ├── PricingInventoryStep.tsx (~120 lines)
      ├── MediaStep.tsx (~100 lines)
      ├── DescriptionStep.tsx (~100 lines)
      └── SEOStep.tsx (~100 lines)
```

#### VoucherForm.tsx (804 lines) → Chia thành steps:

```
src/app/dashboard/vouchers/components/
  ├── VoucherForm.tsx (main, sử dụng BaseForm)
  └── VoucherFormSteps/
      ├── CodeTypeStep.tsx (~150 lines)
      ├── ScopeStep.tsx (~120 lines)
      ├── UsageLimitsStep.tsx (~150 lines)
      ├── ValidityStep.tsx (~120 lines)
      └── AdvancedSettingsStep.tsx (~150 lines)
```

#### ArticleForm.tsx (711 lines) → Chia thành steps:

```
src/app/dashboard/blog/components/
  ├── ArticleForm.tsx (main, sử dụng BaseForm)
  └── ArticleFormSteps/
      ├── BasicInfoStep.tsx (~150 lines)
      ├── ContentStep.tsx (~150 lines)
      ├── MediaStep.tsx (~100 lines)
      ├── TagsStep.tsx (~100 lines)
      └── SEOStep.tsx (~150 lines)
```

#### OrderForm.tsx (711 lines) → Chia thành steps:

```
src/app/dashboard/orders/components/
  ├── OrderForm.tsx (main, sử dụng BaseForm)
  └── OrderFormSteps/
      ├── CustomerInfoStep.tsx (~150 lines)
      ├── OrderItemsStep.tsx (~200 lines)
      ├── ShippingStep.tsx (~120 lines)
      ├── PaymentStep.tsx (~120 lines)
      └── NotesStep.tsx (~80 lines)
```

#### CustomerForm.tsx (536 lines) → Chia thành steps:

```
src/app/dashboard/customers/components/
  ├── CustomerForm.tsx (main, sử dụng BaseForm)
  └── CustomerFormSteps/
      ├── PersonalInfoStep.tsx (~150 lines)
      ├── MembershipStep.tsx (~100 lines)
      ├── ShippingAddressStep.tsx (~120 lines)
      ├── PreferencesStep.tsx (~100 lines)
      └── BanDetailsStep.tsx (~80 lines)
```

#### AuctionForm.tsx (572 lines) → Chia thành steps:

```
src/app/dashboard/auctions/components/
  ├── AuctionForm.tsx (main, sử dụng BaseForm)
  └── AuctionFormSteps/
      ├── BasicInfoStep.tsx (~150 lines)
      ├── ProductSelectionStep.tsx (~120 lines)
      ├── BiddingRulesStep.tsx (~150 lines)
      └── ScheduleStep.tsx (~120 lines)
```

## 4. Di chuyển components đặc thù vào từng module

### 4.1 Users module

```
src/app/dashboard/users/components/
  ├── UserForm.tsx
  ├── UserFormSteps/ (6 files)
  └── UserPermissionsGrid.tsx (extract từ UserForm)
```

### 4.2 Customers module

```
src/app/dashboard/customers/components/
  ├── CustomerForm.tsx
  ├── CustomerFormSteps/ (5 files)
  ├── BanCustomerDialog.tsx (move from src/components/dashboard/)
  ├── ResetPasswordDialog.tsx (move from src/components/dashboard/)
  └── PurchaseHistoryDialog/ (3 files)
```

### 4.3 Products module

```
src/app/dashboard/products/components/
  ├── ProductForm.tsx
  ├── ProductFormSteps/ (5 files)
  └── ProductGrid.tsx (reference từ shared tables)
```

### 4.4 Orders module

```
src/app/dashboard/orders/components/
  ├── OrderForm.tsx
  └── OrderFormSteps/ (5 files)
```

### 4.5 Vouchers module

```
src/app/dashboard/vouchers/components/
  ├── VoucherForm.tsx
  ├── VoucherFormSteps/ (5 files)
  └── VoucherDetail/ (3 files)
```

### 4.6 Blog module

```
src/app/dashboard/blog/components/
  ├── ArticleForm.tsx
  └── ArticleFormSteps/ (5 files)
```

### 4.7 Auctions module

```
src/app/dashboard/auctions/components/
  ├── AuctionForm.tsx
  └── AuctionFormSteps/ (4 files)
```

### 4.8 Affiliates module

```
src/app/dashboard/affiliates/components/
  └── (chưa có form lớn, giữ nguyên page.tsx)
```

### 4.9 Reports module

```
src/app/dashboard/reports/components/
  └── (chưa có form lớn, giữ nguyên page.tsx)
```

### 4.10 Settings module

```
src/app/dashboard/settings/components/
  └── (có thể tách thành các setting sections sau)
```

### 4.11 Dashboard overview

```
src/app/dashboard/components/
  ├── KPICard.tsx (move from src/components/dashboard/cards/)
  └── KPIGrid.tsx (nếu có)
```

## 5. Chia nhỏ các page.tsx lớn (>200 lines)

### 5.1 page.tsx files cần chia:

- `src/app/dashboard/page.tsx` (243 lines) → Extract KPI sections
- `src/app/dashboard/affiliates/page.tsx` (334 lines) → Extract table columns & filters
- `src/app/dashboard/auctions/page.tsx` (335 lines) → Extract table columns & filters
- `src/app/dashboard/blog/page.tsx` (387 lines) → Extract table columns & filters
- `src/app/dashboard/customers/page.tsx` (408 lines) → Extract table columns & filters
- `src/app/dashboard/orders/page.tsx` (312 lines) → Extract table columns & filters
- `src/app/dashboard/products/page.tsx` (380 lines) → Extract table columns & filters
- `src/app/dashboard/reports/page.tsx` (289 lines) → Extract chart components
- `src/app/dashboard/settings/page.tsx` (464 lines) → Extract setting sections
- `src/app/dashboard/users/page.tsx` (391 lines) → Extract table columns & filters
- `src/app/dashboard/vouchers/page.tsx` (410 lines) → Extract table columns & filters

### Pattern cho mỗi page:

```
src/app/dashboard/[module]/
  ├── page.tsx (~150 lines, chỉ chứa layout & logic)
  └── components/
      ├── [Module]TableColumns.tsx (column definitions)
      ├── [Module]Filters.tsx (filter components)
      └── [Module]Actions.tsx (action handlers)
```

## 6. Update imports

Sau khi di chuyển, cần update tất cả imports trong:

- Tất cả page.tsx files
- Tất cả form components
- Shared components
- Layout components

## 7. Xóa thư mục cũ

Sau khi hoàn thành và verify:

```
rm -rf src/components/dashboard/forms/
rm -rf src/components/dashboard/details/
rm src/components/dashboard/VoucherForm.tsx (duplicate)
rm src/components/dashboard/ProductForm.tsx
rm src/components/dashboard/ImageUpload.tsx
rm src/components/dashboard/PurchaseHistoryDialog.tsx
rm src/components/dashboard/BanCustomerDialog.tsx
rm src/components/dashboard/ResetPasswordDialog.tsx
rm src/components/dashboard/ContextMenu.tsx
rm src/components/dashboard/ActionMenu.tsx
rm src/components/dashboard/BulkActionsBar.tsx
rm src/components/dashboard/SearchBar.tsx
rm src/components/dashboard/StatusBadge.tsx
rm src/components/dashboard/FilterPopover.tsx
rm src/components/dashboard/ExportButton.tsx
rm src/components/dashboard/ImportButton.tsx
rm src/components/dashboard/TableContextMenu.tsx
rm src/components/dashboard/DateRangePicker.tsx
rm src/components/dashboard/ChartPlaceholder.tsx
rm src/components/dashboard/RoleBadge.tsx
rm src/components/dashboard/ContentImageExample.tsx
rm src/components/dashboard/cards/KPICard.tsx
```

## Tóm tắt cấu trúc mới:

```
src/
├── app/dashboard/
│   ├── components/
│   │   ├── shared/ (17 components - dùng chung toàn dashboard)
│   │   ├── forms/ (BaseForm, FormStepper, FormStep, shared/)
│   │   ├── KPICard.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── DashboardShell.tsx
│   │   ├── DashboardSidebar.tsx
│   │   ├── DashboardWrapper.tsx
│   │   ├── PageTransition.tsx
│   │   └── RealtimePanel.tsx
│   ├── users/components/ (UserForm + 6 steps + PermissionsGrid)
│   ├── customers/components/ (CustomerForm + 5 steps + 3 dialogs + PurchaseHistory)
│   ├── products/components/ (ProductForm + 5 steps)
│   ├── orders/components/ (OrderForm + 5 steps)
│   ├── vouchers/components/ (VoucherForm + 5 steps + VoucherDetail)
│   ├── blog/components/ (ArticleForm + 5 steps)
│   ├── auctions/components/ (AuctionForm + 4 steps)
│   └── [module]/components/ (table columns, filters, actions)
└── components/dashboard/
    └── tables/ (DataTable + ProductGrid - shared)
```

## Lợi ích:

1. **Dễ maintain**: Mỗi module có components riêng, dễ tìm và fix bug
2. **Code nhỏ hơn**: Mỗi file <200 lines, dễ đọc và hiểu
3. **Reusable**: BaseForm với stepper dùng chung cho tất cả forms
4. **Consistent**: Tất cả forms có cùng UX (stepper, validation, animations)
5. **Scalable**: Dễ thêm module mới hoặc steps mới
6. **Clear separation**: Shared vs module-specific components rõ ràng

### To-dos

- [ ] Tạo cấu trúc thư mục shared: src/app/dashboard/components/shared/ và forms/
- [ ] Tạo BaseForm.tsx, FormStepper.tsx, FormStep.tsx với stepper logic
- [ ] Chia ImageUpload.tsx (288 lines) thành index.tsx, ImagePreview.tsx, UploadZone.tsx
- [ ] Chia ContextMenu.tsx (224 lines) thành ContextMenu.tsx và ContextMenuItems.tsx
- [ ] Chia AddressInput.tsx (447 lines) thành index.tsx, AddressForm.tsx, AddressList.tsx
- [ ] Chia DataTable.tsx (382 lines) thành index.tsx, TableToolbar.tsx, TablePagination.tsx, ColumnVisibility.tsx
- [ ] Refactor UserForm.tsx (1034 lines) thành 6 steps sử dụng BaseForm
- [ ] Refactor ProductForm.tsx (628 lines) thành 5 steps sử dụng BaseForm
- [ ] Refactor VoucherForm.tsx (804 lines) thành 5 steps sử dụng BaseForm
- [ ] Refactor ArticleForm.tsx (711 lines) thành 5 steps sử dụng BaseForm
- [ ] Refactor OrderForm.tsx (711 lines) thành 5 steps sử dụng BaseForm
- [ ] Refactor CustomerForm.tsx (536 lines) thành 5 steps sử dụng BaseForm
- [ ] Refactor AuctionForm.tsx (572 lines) thành 4 steps sử dụng BaseForm
- [ ] Di chuyển BanCustomerDialog, ResetPasswordDialog, PurchaseHistoryDialog vào customers/components/
- [ ] Di chuyển và chia VoucherDetail.tsx (301 lines) vào vouchers/components/
- [ ] Di chuyển 17 shared components vào src/app/dashboard/components/shared/
- [ ] Chia 11 page.tsx files (>200 lines) thành page.tsx + TableColumns + Filters + Actions
- [ ] Update tất cả imports trong pages, forms, và shared components
- [ ] Xóa thư mục và files cũ trong src/components/dashboard/
- [ ] Verify build thành công và test các forms hoạt động đúng