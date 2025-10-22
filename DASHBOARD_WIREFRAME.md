# Dashboard Wireframe - SignAuthentics

## 📋 Tổng Quan

Dashboard admin.signauthentics.vn với thiết kế dark, modern, minimal cho 5 vai trò:
- **Admin**: Full access
- **Seller**: Own-only data
- **Editor**: Content management
- **Customer**: My orders & vouchers
- **Affiliate**: Referral tracking

---

## 🎨 Design System

### Dark Mode Theme
- **Background**: `zinc-950` (nền chính)
- **Surface**: `zinc-900` (cards, panels)
- **Border**: `zinc-800` (subtle borders)
- **Text**: `white` (primary), `zinc-400` (secondary)
- **Accent Colors**: 
  - Blue: `blue-500/600` (primary actions)
  - Green: `green-500` (success)
  - Red: `red-500` (danger)
  - Orange: `orange-500` (warnings)
  - Purple: `purple-500` (special)

### Elevation
Sử dụng màu sáng hơn thay vì shadow:
- Card hover: `border-zinc-700`
- Active state: `bg-zinc-800`
- Elevated: `bg-zinc-800/50`

---

## 🏗 Cấu Trúc Components

### 1. Layout Components
- **DashboardShell** (`src/components/dashboard/DashboardShell.tsx`)
  - Main wrapper với sidebar, header, content area
  - Floating action button cho realtime panel
  
- **DashboardSidebar** (`src/components/dashboard/DashboardSidebar.tsx`)
  - Persistent navigation
  - Role-based menu visibility
  - Collapsible (64px → 256px)
  - Role badge ở bottom

- **DashboardHeader** (`src/components/dashboard/DashboardHeader.tsx`)
  - Fixed top header
  - Global search
  - Locale toggle (VN/EN)
  - Currency toggle (VND/EUR) - display only
  - Notifications badge
  - User avatar menu

- **RealtimePanel** (`src/components/dashboard/RealtimePanel.tsx`)
  - Slide-over từ phải
  - Live event stream: New Order, Bid, Outbid, Auction Ended, Comment
  - Filter by event type
  - Mark as read functionality

### 2. Data Components
- **KPICard** (`src/components/dashboard/KPICard.tsx`)
  - Metric display với icon, trend, change percentage
  - Loading state
  - Grid wrapper (2/3/4 columns)

- **DataTable** (`src/components/dashboard/DataTable.tsx`)
  - TanStack Table wrapper
  - Features: sorting, filtering, pagination, column visibility, row selection
  - Search bar
  - Export CSV button
  - Dark theme styled

- **RoleBadge** (`src/components/dashboard/RoleBadge.tsx`)
  - Hiển thị role visibility info
  - Compact mode
  - Section header với role badge

---

## 📁 Module Pages

### 1. Overview (`/dashboard`)
**Visible**: Admin, Seller (own-only), Affiliate (own-only)

**Components**:
- 4 KPI cards: Revenue, Orders, Auctions Live, Outbid Events
- Revenue chart (area/line placeholder)
- Live Auctions table
- Latest Orders table
- Top Players spotlight

**Table Features**: sorting, column visibility, pin, resize, pagination, quick filter

---

### 2. Products (`/dashboard/products`)
**Visible**: Admin, Seller (own-only) | **Read-only**: Editor

**Columns**: SKU, Title, Player, Category, Price VND, Rarity, Stock, Status, Actions

**Detail View Tabs** (wireframe note):
- Basics
- Media
- Pricing & Stock
- Relations (Player/Club)
- Auction status
- SEO

---

### 3. Orders (`/dashboard/orders`)
**Visible**: Admin, Seller (own-only), Customer (own-only)

**Columns**: Order ID, Buyer, Total, Payment, Fulfillment, Provider, Date, Actions

**Detail View** (wireframe note):
- Timeline trạng thái
- Địa chỉ giao
- Payment info
- Shipping provider + tracking link

---

### 4. Auctions (`/dashboard/auctions`)
**Visible**: Admin, Seller | **Read-only**: Customer

**Columns**: Auction ID, Product, Start, End, Starting Price, Min Increment, Status, Highest Bid, Bidders

**Features**:
- Real-time bid updates (WebSocket/polling)
- Countdown timer (server time)
- Live status indicator với animation
- Close session button

---

### 5. Vouchers (`/dashboard/vouchers`)
**Visible**: Admin, Seller (own-scope), Customer (own-only)

**Columns**: Code, Type (percent/fixed), Scope, Start/End, Usage Total, Per User, Status

**Detail Form**:
- Quy tắc áp dụng
- Min order value
- Applicable categories/products
- User eligibility

---

### 6. Users (`/dashboard/users`)
**Visible**: Admin only

**Columns**: Name, Email, Role, Created, Last Active, Status

**Actions**: Change role, Delete user

---

### 7. Affiliates (`/dashboard/affiliates`)
**Visible**: Admin (all data), Affiliate (own-only)

**Sections**:
- **KPIs**: Total Clicks, Conversions, Total Sales, Payout Pending
- **Ref Links**: Link management, channel tracking, copy functionality
- **Activity Logs**: Click events, conversion events
- **Payout Info**: Commission rate (10%), cycle (monthly), next payout

---

### 8. Content/Blog (`/dashboard/blog`)
**Visible**: Admin, Editor | **Read-only**: Seller

**Columns**: Title, Author, Tags, Featured, Status, Publish Date, Views

**Editor Features** (wireframe note):
- Rich text editor
- Media upload
- SEO fields
- Publish schedule

---

### 9. Reports (`/dashboard/reports`)
**Visible**: Admin, Seller (own-only), Affiliate (own-only)

**Sections**:
- Revenue trend chart (30 days)
- Top Categories table
- Top Players by Revenue table
- Auction Performance table
- Summary cards: Total Orders, Avg Order Value, Conversion Rate

**Export**: CSV export cho tất cả reports

---

### 10. Settings (`/dashboard/settings`)
**Visible**: Admin | **Read-only**: Seller, Customer

**Sections**:
- **Domain & Infrastructure**: admin.signauthentics.vn, Cloudflare Tunnel info
- **Locale & Currency**: VN/EN, VND/EUR (display snapshot)
- **Payment Providers**: Momo, ZaloPay, VNPay, Stripe (toggle on/off)
- **Shipping Providers**: GHN, GHTK, VNPost, J&T với tracking mask
- **Security**: API tokens, Email templates

---

## 🔐 Role Permissions Matrix

| Module     | Admin | Seller    | Editor    | Customer  | Affiliate |
|------------|-------|-----------|-----------|-----------|-----------|
| Overview   | Full  | Own-only  | Hidden    | Read-only | Own-only  |
| Products   | Full  | Own-only  | Read-only | Hidden    | Hidden    |
| Orders     | Full  | Own-only  | Hidden    | Own-only  | Hidden    |
| Auctions   | Full  | Own-only  | Hidden    | Hidden    | Hidden    |
| Vouchers   | Full  | Own-only  | Hidden    | Own-only  | Hidden    |
| Users      | Full  | Hidden    | Hidden    | Hidden    | Hidden    |
| Affiliates | Full  | Hidden    | Hidden    | Hidden    | Own-only  |
| Content    | Full  | Read-only | Full      | Hidden    | Read-only |
| Reports    | Full  | Own-only  | Hidden    | Hidden    | Own-only  |
| Settings   | Full  | Read-only | Hidden    | Read-only | Hidden    |

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **UI Library**: shadcn/ui (wrapper pattern)
- **Table**: TanStack Table v8
- **Icons**: Lucide React

---

## 📦 File Structure

```
src/
├── app/(dashboard)/
│   ├── layout.tsx                    # Dashboard layout wrapper
│   └── dashboard/
│       ├── page.tsx                  # Overview
│       ├── products/page.tsx
│       ├── orders/page.tsx
│       ├── auctions/page.tsx
│       ├── vouchers/page.tsx
│       ├── users/page.tsx
│       ├── affiliates/page.tsx
│       ├── blog/page.tsx
│       ├── reports/page.tsx
│       └── settings/page.tsx
│
├── components/dashboard/
│   ├── DashboardShell.tsx           # Main layout
│   ├── DashboardSidebar.tsx         # Navigation
│   ├── DashboardHeader.tsx          # Top header
│   ├── RealtimePanel.tsx            # Live activity panel
│   ├── KPICard.tsx                  # Metrics display
│   ├── DataTable.tsx                # TanStack Table wrapper
│   └── RoleBadge.tsx                # Role visibility indicator
│
└── lib/
    ├── types/dashboard.ts           # TypeScript types
    └── constants/roles.ts           # Role permissions config
```

---

## 🎯 Key Features

### 1. Role-Based Visibility
Mỗi page hiển thị badge cho biết ai có quyền xem/sửa:
```tsx
<DashboardSectionHeader
  title="Products"
  visibleFor={["admin", "seller"]}
  readOnlyFor={["editor"]}
/>
```

### 2. TanStack Table Features
- ✅ Sorting (column headers)
- ✅ Filtering (search bar)
- ✅ Pagination (bottom controls)
- ✅ Column visibility (toggle)
- ✅ Row selection (checkbox)
- ✅ Export CSV

### 3. Real-time Updates
- Live activity panel với event stream
- Auction countdown timers
- Bid notifications
- Order status changes

### 4. Dark Mode Optimized
- Không dùng nền đen thuần (`#000`)
- Dùng `zinc-950` để giảm chói
- Elevation bằng màu sáng hơn, không dùng shadow nặng
- Contrast ratio đảm bảo accessibility

---

## 🚀 Next Steps

### Backend Integration
1. Replace mock data với API calls
2. Implement authentication (NextAuth.js)
3. WebSocket cho real-time updates
4. Role-based API permissions

### UI Enhancements
1. Skeleton loading states
2. Error boundaries
3. Toast notifications
4. Form validation
5. Modal dialogs

### Advanced Features
1. Advanced filters (date range, multiple selection)
2. Bulk actions (multi-select operations)
3. Drag-and-drop reordering
4. Inline editing
5. Chart libraries (Recharts/Chart.js)

---

## 📝 Notes

- **Domain**: admin.signauthentics.vn (separate từ main site)
- **Infrastructure**: Cloudflare Tunnel (không mở cổng)
- **Currency**: VND/EUR là display snapshot, không thay đổi giá thực
- **File Size Limit**: Mỗi `.tsx` file dưới 200 lines (tuân thủ shadcn-guard rule)
- **Component Pattern**: Wrapper approach, không sửa `components/ui/**`

---

## 🔗 References

- [shadcn/ui Dashboard Examples](https://ui.shadcn.com/examples/dashboard)
- [TanStack Table Docs](https://tanstack.com/table/latest)
- [Material Design Dark Theme](https://m3.material.io/styles/color/dark-theme)
- [Apple HIG Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)

---

**Version**: 1.0  
**Last Updated**: October 2025  
**Status**: Wireframe Complete ✅

