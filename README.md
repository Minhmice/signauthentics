# SignAuthentics

## 📝 Tổng Quan Dự Án

SignAuthentics là một nền tảng thương mại điện tử chuyên về **các sản phẩm lưu niệm bóng đá có chữ ký** của các cầu thủ Việt Nam. Dự án được xây dựng bằng Next.js 15 với TypeScript và TailwindCSS, cung cấp trải nghiệm người dùng hiện đại với giao diện wireframe đẹp mắt.

### 🎯 Mục Đích

- Cung cấp nền tảng mua bán các sản phẩm lưu niệm bóng đá có chữ ký
- Hiển thị thông tin chi tiết về các cầu thủ Olympic Việt Nam
- Quản lý các bộ sưu tập, câu lạc bộ và đấu giá
- Dashboard quản trị cho admin

## 🚀 Công Nghệ Sử Dụng

### Core Technologies
- **Framework**: Next.js 15.5.5 (với App Router & Turbopack)
- **Ngôn ngữ**: TypeScript 5
- **Styling**: TailwindCSS 4 + CSS Variables
- **Animation**: Framer Motion 11.18.2
- **React**: 19.1.0

### UI Libraries
- **shadcn/ui**: Component library (style: new-york)
- **Radix UI**: Headless components (@radix-ui/react-slot)
- **Lucide React**: Icon library
- **Class Variance Authority**: Variant management
- **Tailwind Merge + CLSX**: Class merging utilities

### Data & Tables
- **@tanstack/react-table**: Table management
- **Mock Data**: JSON-based local data (trong `/src/lib/mock/`)

## 📁 Cấu Trúc Dự Án

```
signauthentics/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (dashboard)/             # Dashboard route group
│   │   │   └── dashboard/           # Các trang admin
│   │   │       ├── page.tsx         # Tổng quan KPIs
│   │   │       ├── products/        # Quản lý sản phẩm
│   │   │       ├── orders/          # Quản lý đơn hàng
│   │   │       ├── users/           # Quản lý người dùng
│   │   │       ├── auctions/        # Quản lý đấu giá
│   │   │       ├── vouchers/        # Quản lý voucher
│   │   │       ├── blog/            # Quản lý blog
│   │   │       └── reports/         # Báo cáo
│   │   ├── auctions/                # Trang đấu giá
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx       # Chi tiết đấu giá
│   │   ├── clubs/                   # Trang câu lạc bộ
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx     # Chi tiết CLB
│   │   ├── collections/             # Trang bộ sưu tập
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx     # Chi tiết collection
│   │   ├── players/                 # Trang cầu thủ
│   │   │   ├── page.tsx             # Danh sách + tìm kiếm
│   │   │   └── [slug]/page.tsx     # Hồ sơ cầu thủ
│   │   ├── products/                # Trang sản phẩm
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx     # Chi tiết sản phẩm
│   │   ├── news/                    # Trang tin tức
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx     # Chi tiết bài viết
│   │   ├── styleguide/              # Style guide UI
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Trang chủ
│   │   └── globals.css              # Global styles + CSS variables
│   │
│   ├── components/
│   │   ├── ui/                      # ⚠️ shadcn/ui components (KHÔNG ĐƯỢC SỬA)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Tabs.tsx
│   │   │   └── WireBox.tsx
│   │   ├── cards/                   # Card components
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── AuctionCard.tsx
│   │   │   ├── ClubCard.tsx
│   │   │   ├── CollectionCard.tsx
│   │   │   ├── PlayerCard.tsx
│   │   │   ├── PlayerTile.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── *Skeleton.tsx        # Loading skeletons
│   │   ├── home/                    # Home page sections
│   │   │   ├── HeroMasthead.tsx
│   │   │   ├── PlayersSlider.tsx
│   │   │   ├── PlayersSpotlight.tsx
│   │   │   ├── PromoSaleWithFeature.tsx
│   │   │   └── LatestNews.tsx
│   │   ├── layout/                  # Layout components
│   │   │   ├── Header.tsx           # Sticky header với search, cart, theme
│   │   │   └── Footer.tsx
│   │   ├── product/
│   │   │   └── ProductGallery.tsx
│   │   ├── tables/
│   │   │   └── TableSkeleton.tsx
│   │   └── providers/
│   │       └── theme-provider.tsx   # Theme context (dark mode, locale, currency)
│   │
│   └── lib/
│       ├── mock/                    # Mock data files
│       │   ├── articles.ts
│       │   ├── auctions.ts
│       │   ├── clubs.ts
│       │   ├── collections.ts
│       │   ├── fx.ts               # Exchange rates
│       │   ├── players.ts          # Cầu thủ U22
│       │   ├── playerProfiles.ts   # Hồ sơ chi tiết
│       │   ├── playerdata.json
│       │   ├── vietnam_olympic_players.json
│       │   ├── playersSlider.ts
│       │   ├── products.ts
│       │   └── vouchers.ts
│       ├── ui/                      # UI utilities
│       │   ├── format.ts           # Format helpers
│       │   ├── price.ts            # VND/EUR conversion
│       │   └── rarity.ts           # Rarity badge logic
│       └── utils.ts                # General utilities (cn function)
│
├── public/
│   └── PlayerImages/               # Hình ảnh cầu thủ (22 ảnh)
│
├── components.json                 # shadcn/ui config
├── next.config.ts                  # Next.js config (image domains)
├── tsconfig.json                   # TypeScript config (paths alias)
├── package.json                    # Dependencies
└── eslint.config.mjs              # ESLint config
```

## ✨ Các Tính Năng Chính

### 1. **Trang Chủ** (`/`)
- Hero masthead với hình ảnh nổi bật
- Players slider với animation
- World XI Sale promotion
- Players spotlight
- Collections grid
- Ballon d'Or horizontal scroller
- Latest news section

### 2. **Trang Cầu Thủ** (`/players`)
- Danh sách tất cả cầu thủ Olympic Việt Nam
- Tìm kiếm theo tên hoặc câu lạc bộ
- Players spotlight carousel
- Chi tiết cầu thủ (`/players/[slug]`)

### 3. **Trang Sản Phẩm** (`/products`)
- Grid hiển thị sản phẩm với rarity badges
- Product detail với gallery
- Thông tin giá VND/EUR
- Add to cart functionality

### 4. **Trang Bộ Sưu Tập** (`/collections`)
- Hiển thị các collections
- Chi tiết collection

### 5. **Trang Đấu Giá** (`/auctions`)
- Danh sách đấu giá
- Chi tiết phiên đấu giá

### 6. **Trang Tin Tức** (`/news`)
- Blog/tin tức bóng đá
- Chi tiết bài viết

### 7. **Dashboard Admin** (`/dashboard`)
- **Tổng quan**: KPIs (doanh thu, đơn hàng, sản phẩm, users)
- **Quản lý sản phẩm**: CRUD products
- **Quản lý đơn hàng**: Order tracking
- **Quản lý người dùng**: User management
- **Quản lý đấu giá**: Auction management
- **Quản lý vouchers**: Voucher/promo codes
- **Blog**: Content management
- **Báo cáo**: Analytics

### 9. **Header & Navigation**
- Sticky header với backdrop blur
- Search bar
- Wishlist, Cart, Account icons
- Language toggle (EN/VI)
- Currency toggle (VND/EUR)
- Dark mode toggle

### 10. **Theme System**
- Dark mode support
- Locale switching (EN/VI)
- Currency conversion (VND ⇄ EUR)
- CSS variables-based theming

## 🎨 Design System

### Colors
- **Primary**: Dark gray/black (`oklch(0.205 0 0)`)
- **Accent**: Dynamic per product (hex colors)
- **Rarity Colors**:
  - Standard: Gray
  - Limited: Blue
  - Rare: Purple
  - Ultra: Gold/Orange

### Typography
- **Font**: Inter (Google Fonts)
- **Heading styles**: Semibold tracking-tight
- **Body**: Regular/Medium

### Components
- **Wireframe style**: Border-based với glass morphism
- **Cards**: Shadow + border + rounded corners
- **Buttons**: Primary, Outline, Ghost variants
- **Chips**: Badge-style labels

## 🛠 Hướng Dẫn Cài Đặt

### Yêu Cầu
- **Node.js**: >= 20.x
- **npm**: >= 10.x

### Cài Đặt

```bash
# Clone repository
git clone <repo-url>
cd signauthentics

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Chạy production server
npm start

# Lint code
npm run lint
```

### Environment Variables
Hiện tại không có environment variables bắt buộc. Tất cả dữ liệu đang dùng mock data.

### Truy Cập Ứng Dụng
- Development: http://localhost:3000
- Style Guide: http://localhost:3000/styleguide
- Dashboard: http://localhost:3000/dashboard

## ⚠️ QUY TẮC QUAN TRỌNG: SHADCN GUARD

### 🚨 KHÔNG BAO GIỜ SỬA CÁC FILE SAU:

```
❌ src/components/ui/**
❌ Bất kỳ file nào trong thư mục ui/
```

### ✅ Quy Trình Wrapper

Khi cần customize component từ shadcn/ui:

1. **TẠO WRAPPER** trong:
   - `src/components/app/**`
   - `src/components/shared/**`
   - `src/features/**/components/**`

2. **IMPORT** component gốc:
   ```tsx
   import { Button } from "@/components/ui/button";
   ```

3. **MỞ RỘNG** qua wrapper:
   ```tsx
   export function AppButton({ intent = "primary", ...props }) {
     const intentClass = intent === "danger" ? "bg-red-500" : "";
     return <Button className={intentClass} {...props} />;
   }
   ```

4. **KHÔNG** copy/paste code gốc trừ khi thực sự cần fork

### Tại Sao?
- Giữ khả năng update shadcn/ui components
- Tách biệt customization với base components
- Dễ maintain và debug

## 📦 Mock Data

Tất cả dữ liệu hiện tại đều là **mock data** trong `src/lib/mock/`:

- **players.ts**: 8 cầu thủ U22 Việt Nam
- **playerProfiles.ts**: Hồ sơ chi tiết với data từ JSON
- **products.ts**: 12 sản phẩm mẫu (jerseys, balls)
- **clubs.ts**: Các câu lạc bộ
- **collections.ts**: Bộ sưu tập
- **auctions.ts**: Phiên đấu giá
- **articles.ts**: Bài viết tin tức
- **vouchers.ts**: Mã giảm giá
- **fx.ts**: Tỷ giá VND/EUR

### Khi Tích Hợp API/Database

1. Thay thế mock imports bằng API calls
2. Giữ nguyên TypeScript interfaces
3. Update data fetching trong Server Components
4. Implement loading states và error handling

## 🖼 Assets

### Hình Ảnh Cầu Thủ
- **Location**: `public/PlayerImages/`
- **Files**: 22 ảnh chân dung cầu thủ U22 VN
- **Format**: `.jpg`
- **Naming**: `chandung22tuyenthu[1-22].jpg`
- **Special**: `QuangHai.jpeg` (hero image)

### Remote Images
Next.js config cho phép images từ:
- images.unsplash.com
- upload.wikimedia.org
- static.fifa.com
- media.api-sports.io

## 🎯 Path Aliases

```typescript
@/*              → src/*
@PlayerImages/*  → public/PlayerImages/*
```

## 📱 Responsive Design

- **Mobile-first**: Grid cols-1 → sm:2 → md:3 → lg:4/6
- **Breakpoints**: sm, md, lg, xl, 2xl (TailwindCSS defaults)
- **Touch-friendly**: Buttons min-w-36, adequate padding

## 🌙 Dark Mode

- Implemented qua `ThemeProvider`
- Toggle trong Header
- CSS variables tự động switch
- Class `.dark` trên `<html>`

## 🔄 Next Steps / TODO

### Backend Integration
- [ ] Setup database (PostgreSQL/MongoDB)
- [ ] Create API routes trong `app/api/`
- [ ] Replace mock data với real data
- [ ] Implement authentication (NextAuth.js?)
- [ ] User management
- [ ] Order processing
- [ ] Payment gateway integration

### Features
- [ ] Shopping cart functionality
- [ ] Checkout flow
- [ ] User authentication & profiles
- [ ] Admin authentication
- [ ] Real auction system với bidding
- [ ] Image upload for products
- [ ] Search functionality (Algolia/MeiliSearch?)
- [ ] Product filtering & sorting
- [ ] Wishlist persistence
- [ ] Order tracking
- [ ] Email notifications
- [ ] Product reviews & ratings

### UI/UX
- [ ] Loading states cho all pages
- [ ] Error boundaries
- [ ] Toast notifications
- [ ] Form validation
- [ ] Pagination for lists
- [ ] Infinite scroll options
- [ ] Accessibility improvements (ARIA labels)
- [ ] SEO optimization (metadata)
- [ ] OG images

### Performance
- [ ] Image optimization (next/image đã dùng)
- [ ] Code splitting optimization
- [ ] Caching strategies
- [ ] CDN setup
- [ ] Analytics integration (Google Analytics?)

### Testing
- [ ] Unit tests (Jest + Testing Library)
- [ ] E2E tests (Playwright?)
- [ ] Visual regression testing

## 👨‍💻 Development Notes

### Adding New Pages
1. Tạo file trong `src/app/[route]/page.tsx`
2. Export default function component
3. Dùng Server Components cho data fetching
4. Client Components cần `"use client"` directive

### Adding New Components
1. Cards → `src/components/cards/`
2. Layouts → `src/components/layout/`
3. Domain-specific → `src/components/[domain]/`
4. **KHÔNG** thêm vào `src/components/ui/` (reserved cho shadcn)

### Adding New Mock Data
1. Create type trong file
2. Export data array
3. Import trong page component

### Styling
- **Prefer**: TailwindCSS utility classes
- **Custom styles**: globals.css hoặc component-scoped
- **Reusable patterns**: CSS utility classes (`.chip`, `.eyebrow`, `.glass`)
- **Dark mode**: Dùng `dark:` prefix

### TypeScript
- **Strict mode**: Enabled
- **Type everything**: Props, data, functions
- **Avoid `any`**: Dùng `unknown` nếu cần
- **Use interfaces**: Cho object shapes

## 📚 Documentation Links

- [Next.js 15 Docs](https://nextjs.org/docs)
- [TailwindCSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com)
- [TanStack Table](https://tanstack.com/table)

## 🤝 Contributing

### Workflow
1. Branch từ `master`
2. Implement feature/fix
3. Test locally
4. Commit với descriptive message
5. Push và tạo Pull Request
6. Code review
7. Merge sau khi approved

### Commit Message Format
```
feat: Add auction countdown timer
fix: Fix player search not filtering correctly
style: Update hero masthead spacing
refactor: Extract product card logic
docs: Update README with API integration notes
```

## 📄 License

[Specify license here]

---

## 🆘 Cần Trợ Giúp?

### Common Issues

**Build errors với Turbopack:**
```bash
# Thử build không dùng Turbopack
npm run build -- --no-turbopack
```

**TypeScript errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

**Port 3000 đã được sử dụng:**
```bash
# Chạy trên port khác
npx next dev -p 3001
```

---

**Dự án này là wireframe prototype đang trong giai đoạn phát triển. Dữ liệu hiện tại là mock data để demo UI/UX flow.**

Last Updated: October 2025
