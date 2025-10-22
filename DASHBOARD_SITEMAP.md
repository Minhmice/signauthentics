# Dashboard Sitemap - SignAuthentics

## 🗺️ Site Structure

```
admin.signauthentics.vn/
│
├── /dashboard                          # Overview (Home)
│   ├── Role: Admin, Seller*, Affiliate*
│   └── Features: KPIs, Charts, Live Auctions, Latest Orders, Top Players
│
├── /dashboard/products                 # Products Management
│   ├── Role: Admin, Seller* | Read-only: Editor
│   └── Features: List, Search, Filter, Add, Edit, Delete
│       └── Detail: Basics, Media, Pricing, Relations, Auction, SEO
│
├── /dashboard/orders                   # Orders Management
│   ├── Role: Admin, Seller*, Customer*
│   └── Features: List, Search, Filter Status, View, Download Invoice
│       └── Detail: Timeline, Address, Payment, Shipping + Tracking
│
├── /dashboard/auctions                 # Auctions Management
│   ├── Role: Admin, Seller | Read-only: Customer
│   └── Features: List, Create, Live Status, Real-time Bids
│       └── Detail: Countdown, Bid Table, Close Session
│
├── /dashboard/vouchers                 # Vouchers Management
│   ├── Role: Admin, Seller* | Own: Customer*
│   └── Features: List, Create, Edit, Delete
│       └── Detail: Rules (min order, scope, eligibility)
│
├── /dashboard/users                    # Users Management
│   ├── Role: Admin only
│   └── Features: List, Add, Change Role, Delete
│
├── /dashboard/affiliates               # Affiliates Module
│   ├── Role: Admin, Affiliate*
│   └── Features: KPIs (Clicks, Conversions, Sales, Payout)
│       ├── Ref Links: Create, Copy, Track Channel
│       ├── Activity Logs: Click Events, Conversions
│       └── Payout Info: Commission, Schedule, Next Payout
│
├── /dashboard/blog                     # Content Management
│   ├── Role: Admin, Editor | Read-only: Seller
│   └── Features: List, Create, Edit, Delete
│       └── Detail: Rich Editor, Media, SEO, Schedule
│
├── /dashboard/reports                  # Reports & Analytics
│   ├── Role: Admin, Seller*, Affiliate*
│   └── Features: Revenue Chart, Top Categories, Top Players, Auction Performance
│       └── Export: CSV for all reports
│
└── /dashboard/settings                 # Settings
    ├── Role: Admin | Read-only: Seller, Customer
    └── Sections:
        ├── Domain & Infrastructure (Cloudflare Tunnel)
        ├── Locale & Currency (VN/EN, VND/EUR)
        ├── Payment Providers (Momo, ZaloPay, VNPay, Stripe)
        ├── Shipping Providers (GHN, GHTK, VNPost, J&T)
        └── Security (API Tokens, Email Templates)

Legend:
* = Own-only data (chỉ xem dữ liệu của mình)
```

---

## 🎯 Role-Based Access Quick Reference

### Admin (Quản trị viên)
✅ Full access to all modules  
✅ Can manage users and change roles  
✅ Can configure system settings  

**Pages**: All

---

### Seller (Người bán)
✅ Own products, orders, auctions, vouchers  
✅ Own revenue reports  
👁️ Read-only: Content, Settings  
❌ Cannot access: Users  

**Pages**: Overview*, Products*, Orders*, Auctions*, Vouchers*, Reports*, Blog (RO), Settings (RO)

---

### Editor (Biên tập viên)
✅ Full content management (Blog)  
👁️ Read-only: Products (no price/stock)  
❌ Cannot access: Orders, Auctions, Vouchers, Users, Affiliates, Reports  

**Pages**: Blog, Products (RO)

---

### Customer (Khách hàng)
✅ Own orders and vouchers  
👁️ Notifications  
❌ No admin access  

**Pages**: Orders*, Vouchers*

---

### Affiliate (Đối tác)
✅ Referral tracking & payouts  
✅ Own affiliate data  
👁️ Read-only: Content  
❌ Cannot access: Products, Orders, Auctions, Vouchers, Users  

**Pages**: Overview*, Affiliates*, Reports*, Blog (RO)

---

## 🔗 Navigation Flow

### Primary Navigation (Sidebar)
1. Overview
2. Products
3. Orders
4. Auctions
5. Vouchers
6. Users (Admin only)
7. Affiliates
8. Content (Blog)
9. Reports
10. Settings

### Secondary Actions
- **Header**: Global Search, Locale Toggle, Currency Toggle, Notifications, Account Menu
- **Floating Button**: Open Real-time Activity Panel

---

## 📊 Data Tables Overview

All tables implement **TanStack Table** với features:
- ✅ Sorting (column headers)
- ✅ Filtering (search bar)
- ✅ Pagination
- ✅ Column visibility toggle
- ✅ Row selection
- ✅ Export CSV

### Table Columns by Module

**Products**: SKU, Title, Player, Category, Price VND, Rarity, Stock, Status, Actions

**Orders**: Order ID, Buyer, Total, Payment, Fulfillment, Provider, Date, Actions

**Auctions**: Auction ID, Product, Start, End, Starting Price, Min Increment, Status, Highest Bid, Bidders

**Vouchers**: Code, Type, Scope, Start, End, Usage Total, Per User, Status, Actions

**Users**: Name, Email, Role, Created, Last Active, Status, Actions

**Affiliates - Ref Links**: Link, Channel, Clicks, Conversions, Revenue, Created

**Affiliates - Logs**: Event, Customer, Product, Commission, Time

**Content**: Title, Author, Tags, Featured, Status, Publish Date, Views, Actions

**Reports - Categories**: Category, Revenue, Orders, Avg Order Value, Growth

**Reports - Players**: Player, Revenue, Products, Avg Price

**Reports - Auctions**: Auction ID, Product, Start Price, Final Price, Bidders, Duration

---

## 🎨 UI Patterns

### Cards
- **KPI Cards**: Metric + Icon + Trend
- **Section Cards**: Content wrapper với border
- **Info Cards**: Static information display

### Badges
- **Role Badge**: Shows role visibility (Visible, Read-only, Own-only)
- **Status Badge**: Order/Payment/Fulfillment status
- **Type Badge**: Voucher type, Event type

### Actions
- **Primary Button**: Blue (`bg-blue-600`)
- **Secondary Button**: Outline (`border-zinc-800`)
- **Danger Button**: Red (`bg-red-600` or hover red)
- **Icon Buttons**: Edit, Delete, View, Copy

---

## 🚀 Real-time Features

### Live Activity Panel
- New Order notifications
- New Bid notifications
- Outbid alerts
- Auction Ended
- New Comments

### Auction Module
- Live countdown timer
- Real-time bid updates
- Bidder count updates
- Status changes (Scheduled → Live → Ended)

---

## 📱 Responsive Behavior

### Desktop (>1024px)
- Sidebar: 256px wide, always visible
- Header: Full layout với all controls
- Tables: All columns visible
- KPIs: 4 columns grid

### Tablet (768px - 1024px)
- Sidebar: Can collapse to 64px
- Header: Compact layout
- Tables: Scroll horizontal
- KPIs: 2-3 columns grid

### Mobile (<768px)
- Sidebar: Overlay (hidden by default)
- Header: Minimal layout
- Tables: Mobile-optimized cards
- KPIs: 1-2 columns grid

---

## 🔐 Security Notes

- **Domain**: admin.signauthentics.vn (separate từ main site)
- **Infrastructure**: Cloudflare Tunnel (no port forwarding)
- **Authentication**: Required for all routes
- **Role Check**: Server-side permission validation
- **API Tokens**: Managed in Settings → Security

---

## 📋 Wireframe Deliverables

✅ Layout Components (Shell, Sidebar, Header, Panel)  
✅ Data Components (KPICard, DataTable, RoleBadge)  
✅ 10 Module Pages (Overview, Products, Orders, etc.)  
✅ Role Permissions System  
✅ Dark Mode Styling  
✅ TanStack Table Integration  
✅ Real-time Panel  
✅ Documentation (README, Sitemap)  

---

**Status**: Wireframe Complete ✅  
**Next Phase**: Backend Integration + Authentication

