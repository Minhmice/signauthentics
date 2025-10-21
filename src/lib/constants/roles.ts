/**
 * Role Permissions Configuration
 * Cấu hình quyền truy cập theo từng vai trò
 */

import { RolePermissions } from '@/lib/types/dashboard';

export const ROLE_PERMISSIONS: Record<string, RolePermissions> = {
  admin: {
    role: 'admin',
    modules: {
      overview: 'full',
      products: 'full',
      orders: 'full',
      auctions: 'full',
      vouchers: 'full',
      users: 'full',
      affiliates: 'full',
      content: 'full',
      reports: 'full',
      settings: 'full',
    },
  },
  seller: {
    role: 'seller',
    modules: {
      overview: 'own-only', // Chỉ doanh thu và đơn của mình
      products: 'own-only',
      orders: 'own-only',
      auctions: 'own-only',
      vouchers: 'own-only',
      users: 'hidden',
      affiliates: 'hidden',
      content: 'read-only',
      reports: 'own-only',
      settings: 'read-only',
    },
  },
  editor: {
    role: 'editor',
    modules: {
      overview: 'hidden',
      products: 'read-only', // Chỉ nội dung, không thấy giá/stock
      orders: 'hidden',
      auctions: 'hidden',
      vouchers: 'hidden',
      users: 'hidden',
      affiliates: 'hidden',
      content: 'full',
      reports: 'hidden',
      settings: 'hidden',
    },
  },
  customer: {
    role: 'customer',
    modules: {
      overview: 'hidden',
      products: 'hidden',
      orders: 'own-only', // My Orders
      auctions: 'hidden',
      vouchers: 'own-only', // My Vouchers
      users: 'hidden',
      affiliates: 'hidden',
      content: 'hidden',
      reports: 'hidden',
      settings: 'read-only',
    },
  },
  affiliate: {
    role: 'affiliate',
    modules: {
      overview: 'own-only', // Chỉ số của riêng họ
      products: 'hidden',
      orders: 'hidden',
      auctions: 'hidden',
      vouchers: 'hidden',
      users: 'hidden',
      affiliates: 'own-only', // Ref Links, Clicks, Conversions
      content: 'read-only',
      reports: 'own-only',
      settings: 'hidden',
    },
  },
};

export const NAVIGATION_ITEMS = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard', href: '/dashboard' },
  { id: 'products', label: 'Products', icon: 'Package', href: '/dashboard/products' },
  { id: 'orders', label: 'Orders', icon: 'ShoppingCart', href: '/dashboard/orders' },
  { id: 'auctions', label: 'Auctions', icon: 'Gavel', href: '/dashboard/auctions' },
  { id: 'vouchers', label: 'Vouchers', icon: 'Ticket', href: '/dashboard/vouchers' },
  { id: 'users', label: 'Users', icon: 'Users', href: '/dashboard/users' },
  { id: 'affiliates', label: 'Affiliates', icon: 'Link', href: '/dashboard/affiliates' },
  { id: 'content', label: 'Content', icon: 'FileText', href: '/dashboard/blog' },
  { id: 'reports', label: 'Reports', icon: 'BarChart3', href: '/dashboard/reports' },
  { id: 'settings', label: 'Settings', icon: 'Settings', href: '/dashboard/settings' },
] as const;

