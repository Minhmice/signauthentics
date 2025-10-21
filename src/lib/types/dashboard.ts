/**
 * Dashboard Types & Interfaces
 * Định nghĩa các types cho dashboard system với 5 vai trò
 */

export type UserRole = 'admin' | 'seller' | 'editor' | 'customer' | 'affiliate';

export type AccessLevel = 'full' | 'read-only' | 'own-only' | 'hidden';

export interface RolePermissions {
  role: UserRole;
  modules: {
    overview: AccessLevel;
    products: AccessLevel;
    orders: AccessLevel;
    auctions: AccessLevel;
    vouchers: AccessLevel;
    users: AccessLevel;
    affiliates: AccessLevel;
    content: AccessLevel;
    reports: AccessLevel;
    settings: AccessLevel;
  };
}

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface NotificationEvent {
  id: string;
  type: 'order' | 'bid' | 'outbid' | 'auction_ended' | 'comment';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

export interface KPIMetric {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
  color?: string;
}

