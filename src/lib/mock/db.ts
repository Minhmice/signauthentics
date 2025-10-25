/**
 * Database Helper Functions
 * Simulate backend API calls với JSON file storage
 */

import data from './data.json';

// Types
export type Product = typeof data.products[0];
export type Order = typeof data.orders[0];
export type Auction = typeof data.auctions[0];
export type Voucher = typeof data.vouchers[0];
export type User = typeof data.users[0];
export type Customer = typeof data.customers[0];
export type Article = typeof data.articles[0];
export type Affiliate = typeof data.affiliates[0];

export type Database = {
  products: Product[];
  orders: Order[];
  auctions: Auction[];
  vouchers: Voucher[];
  users: User[];
  customers: Customer[];
  articles: Article[];
  affiliates: Affiliate[];
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic CRUD operations
export class DatabaseAPI {
  public static data: Database = data as Database;

  // Generic get all
  static async getAll<T extends keyof Database>(table: T): Promise<Database[T]> {
    await delay(100);
    return [...this.data[table]] as Database[T];
  }

  // Generic get by id
  static async getById<T extends keyof Database>(table: T, id: string): Promise<Database[T][0] | null> {
    await delay(50);
    const items = this.data[table] as unknown[];
    const found = items.find((item: unknown) => (item as Record<string, unknown>).id === id);
    return found as Database[T][0] || null;
  }

  // Generic create
  static async create<T extends keyof Database>(table: T, item: Omit<Database[T][0], 'id' | 'createdAt' | 'updatedAt'>): Promise<Database[T][0]> {
    await delay(200);
    const newItem = {
      ...item,
      id: `${table}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Database[T][0];
    
    (this.data[table] as unknown[]).push(newItem);
    return newItem;
  }

  // Generic update
  static async update<T extends keyof Database>(table: T, id: string, updates: Partial<Database[T][0]>): Promise<Database[T][0] | null> {
    await delay(200);
    const items = this.data[table] as unknown[];
    const index = items.findIndex((item: unknown) => (item as Record<string, unknown>).id === id);
    
    if (index === -1) return null;
    
    const updatedItem = {
      ...(items[index] as Record<string, unknown>),
      ...updates,
      updatedAt: new Date().toISOString(),
    } as Database[T][0];
    
    this.data[table][index] = updatedItem;
    return updatedItem;
  }

  // Generic delete
  static async delete<T extends keyof Database>(table: T, id: string): Promise<boolean> {
    await delay(150);
    const items = this.data[table] as unknown[];
    const index = items.findIndex((item: unknown) => (item as Record<string, unknown>).id === id);
    
    if (index === -1) return false;
    
    this.data[table].splice(index, 1);
    return true;
  }

  // Generic bulk delete
  static async bulkDelete<T extends keyof Database>(table: T, ids: string[]): Promise<number> {
    await delay(300);
    const items = this.data[table] as unknown[];
    let deletedCount = 0;
    
    ids.forEach(id => {
      const index = items.findIndex((item: unknown) => (item as Record<string, unknown>).id === id);
      if (index !== -1) {
        this.data[table].splice(index, 1);
        deletedCount++;
      }
    });
    
    return deletedCount;
  }

  // Generic search
  static async search<T extends keyof Database>(
    table: T, 
    query: string, 
    fields: (keyof Database[T][0])[]
  ): Promise<Database[T]> {
    await delay(100);
    const items = this.data[table] as unknown[];
    const searchTerm = query.toLowerCase();
    
    return items.filter(item => 
      fields.some(field => {
        const value = (item as Record<string, unknown>)[field as string];
        return value && value.toString().toLowerCase().includes(searchTerm);
      })
    ) as Database[T];
  }

  // Generic filter
  static async filter<T extends keyof Database>(
    table: T,
    filters: Record<string, unknown>
  ): Promise<Database[T]> {
    await delay(100);
    const items = this.data[table] as unknown[];
    
    return items.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === null || value === undefined) return true;
        if (Array.isArray(value)) return value.includes((item as Record<string, unknown>)[key]);
        return (item as Record<string, unknown>)[key] === value;
      });
    }) as Database[T];
  }

  // Generic paginate
  static async paginate<T extends keyof Database>(
    table: T,
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, unknown>
  ): Promise<{
    data: Database[T];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }> {
    await delay(100);
    let items = this.data[table] as unknown[];
    
    // Apply filters if provided
    if (filters) {
      items = items.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
          if (value === null || value === undefined) return true;
          if (Array.isArray(value)) return value.includes((item as Record<string, unknown>)[key]);
          return (item as Record<string, unknown>)[key] === value;
        });
      });
    }
    
    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const data = items.slice(offset, offset + limit);
    
    return {
      data: data as Database[T],
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }
}

// Specific API functions for each entity
export const productsAPI = {
  getAll: () => DatabaseAPI.getAll('products'),
  getById: (id: string) => DatabaseAPI.getById('products', id),
  create: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => DatabaseAPI.create('products', product),
  update: (id: string, updates: Partial<Product>) => DatabaseAPI.update('products', id, updates),
  delete: (id: string) => DatabaseAPI.delete('products', id),
  bulkDelete: (ids: string[]) => DatabaseAPI.bulkDelete('products', ids),
  search: (query: string) => DatabaseAPI.search('products', query, ['title', 'description', 'category']),
  filter: (filters: Record<string, unknown>) => DatabaseAPI.filter('products', filters),
  paginate: (page: number, limit: number, filters?: Record<string, unknown>) => DatabaseAPI.paginate('products', page, limit, filters),
};

export const ordersAPI = {
  getAll: () => DatabaseAPI.getAll('orders'),
  getById: (id: string) => DatabaseAPI.getById('orders', id),
  create: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => DatabaseAPI.create('orders', order),
  update: (id: string, updates: Partial<Order>) => DatabaseAPI.update('orders', id, updates),
  delete: (id: string) => DatabaseAPI.delete('orders', id),
  bulkDelete: (ids: string[]) => DatabaseAPI.bulkDelete('orders', ids),
  search: (query: string) => DatabaseAPI.search('orders', query, ['orderId', 'buyerName', 'buyerEmail']),
  filter: (filters: Record<string, unknown>) => DatabaseAPI.filter('orders', filters),
  paginate: (page: number, limit: number, filters?: Record<string, unknown>) => DatabaseAPI.paginate('orders', page, limit, filters),
};

export const auctionsAPI = {
  getAll: () => DatabaseAPI.getAll('auctions'),
  getById: (id: string) => DatabaseAPI.getById('auctions', id),
  create: (auction: Omit<Auction, 'id' | 'createdAt' | 'updatedAt'>) => DatabaseAPI.create('auctions', auction),
  update: (id: string, updates: Partial<Auction>) => DatabaseAPI.update('auctions', id, updates),
  delete: (id: string) => DatabaseAPI.delete('auctions', id),
  bulkDelete: (ids: string[]) => DatabaseAPI.bulkDelete('auctions', ids),
  search: (query: string) => DatabaseAPI.search('auctions', query, ['productTitle', 'highestBidderName']),
  filter: (filters: Record<string, unknown>) => DatabaseAPI.filter('auctions', filters),
  paginate: (page: number, limit: number, filters?: Record<string, unknown>) => DatabaseAPI.paginate('auctions', page, limit, filters),
};

export const vouchersAPI = {
  getAll: () => DatabaseAPI.getAll('vouchers'),
  getById: (id: string) => DatabaseAPI.getById('vouchers', id),
  create: (voucher: Omit<Voucher, 'id' | 'createdAt' | 'updatedAt'>) => DatabaseAPI.create('vouchers', voucher),
  update: (id: string, updates: Partial<Voucher>) => DatabaseAPI.update('vouchers', id, updates),
  delete: (id: string) => DatabaseAPI.delete('vouchers', id),
  bulkDelete: (ids: string[]) => DatabaseAPI.bulkDelete('vouchers', ids),
  search: (query: string) => DatabaseAPI.search('vouchers', query, ['code', 'description']),
  filter: (filters: Record<string, unknown>) => DatabaseAPI.filter('vouchers', filters),
  paginate: (page: number, limit: number, filters?: Record<string, unknown>) => DatabaseAPI.paginate('vouchers', page, limit, filters),
};

export const usersAPI = {
  getAll: () => DatabaseAPI.getAll('users'),
  getById: (id: string) => DatabaseAPI.getById('users', id),
  create: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => DatabaseAPI.create('users', user),
  update: (id: string, updates: Partial<User>) => DatabaseAPI.update('users', id, updates),
  delete: (id: string) => DatabaseAPI.delete('users', id),
  bulkDelete: (ids: string[]) => DatabaseAPI.bulkDelete('users', ids),
  search: (query: string) => DatabaseAPI.search('users', query, ['name', 'email']),
  filter: (filters: Record<string, unknown>) => DatabaseAPI.filter('users', filters),
  paginate: (page: number, limit: number, filters?: Record<string, unknown>) => DatabaseAPI.paginate('users', page, limit, filters),
};

export const articlesAPI = {
  getAll: () => DatabaseAPI.getAll('articles'),
  getById: (id: string) => DatabaseAPI.getById('articles', id),
  create: (article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => DatabaseAPI.create('articles', article),
  update: (id: string, updates: Partial<Article>) => DatabaseAPI.update('articles', id, updates),
  delete: (id: string) => DatabaseAPI.delete('articles', id),
  bulkDelete: (ids: string[]) => DatabaseAPI.bulkDelete('articles', ids),
  search: (query: string) => DatabaseAPI.search('articles', query, ['title', 'content', 'excerpt', 'author']),
  filter: (filters: Record<string, unknown>) => DatabaseAPI.filter('articles', filters),
  paginate: (page: number, limit: number, filters?: Record<string, unknown>) => DatabaseAPI.paginate('articles', page, limit, filters),
};

export const affiliatesAPI = {
  getAll: () => DatabaseAPI.getAll('affiliates'),
  getById: (id: string) => DatabaseAPI.getById('affiliates', id),
  create: (affiliate: Omit<Affiliate, 'id' | 'createdAt' | 'updatedAt'>) => DatabaseAPI.create('affiliates', affiliate),
  update: (id: string, updates: Partial<Affiliate>) => DatabaseAPI.update('affiliates', id, updates),
  delete: (id: string) => DatabaseAPI.delete('affiliates', id),
  bulkDelete: (ids: string[]) => DatabaseAPI.bulkDelete('affiliates', ids),
  search: (query: string) => DatabaseAPI.search('affiliates', query, ['name', 'email', 'code']),
  filter: (filters: Record<string, unknown>) => DatabaseAPI.filter('affiliates', filters),
  paginate: (page: number, limit: number, filters?: Record<string, unknown>) => DatabaseAPI.paginate('affiliates', page, limit, filters),
};

// Customers API with special methods
export const customersAPI = {
  getAll: () => DatabaseAPI.getAll('customers'),
  getById: (id: string) => DatabaseAPI.getById('customers', id),
  create: (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => DatabaseAPI.create('customers', customer),
  update: (id: string, updates: Partial<Customer>) => DatabaseAPI.update('customers', id, updates),
  delete: (id: string) => DatabaseAPI.delete('customers', id),
  bulkDelete: (ids: string[]) => DatabaseAPI.bulkDelete('customers', ids),
  search: (query: string) => DatabaseAPI.search('customers', query, ['name', 'email', 'phone']),
  filter: (filters: Record<string, unknown>) => DatabaseAPI.filter('customers', filters),
  paginate: (page: number, limit: number, filters?: Record<string, unknown>) => DatabaseAPI.paginate('customers', page, limit, filters),
};

// Extend customersAPI with special methods
Object.assign(customersAPI, {
  // Ban customer
  banCustomer: async (id: string, reason: string): Promise<Customer | null> => {
    await delay(200);
    const customer = await DatabaseAPI.getById('customers', id);
    if (!customer) return null;
    
    const updatedCustomer = {
      ...customer,
      status: 'banned' as const,
      bannedAt: new Date().toISOString(),
      bannedReason: reason,
    } as Customer;
    
    const index = DatabaseAPI.data.customers.findIndex((c: Customer) => c.id === id);
    if (index !== -1) {
      DatabaseAPI.data.customers[index] = updatedCustomer;
    }
    
    return updatedCustomer;
  },

  // Unban customer
  unbanCustomer: async (id: string): Promise<Customer | null> => {
    await delay(200);
    const customer = await DatabaseAPI.getById('customers', id);
    if (!customer) return null;
    
    const updatedCustomer = {
      ...customer,
      status: 'active' as const,
      bannedAt: null,
      bannedReason: null,
    };
    
    const index = DatabaseAPI.data.customers.findIndex((c: Customer) => c.id === id);
    if (index !== -1) {
      DatabaseAPI.data.customers[index] = updatedCustomer;
    }
    
    return updatedCustomer;
  },

  // Reset password
  resetPassword: async (id: string): Promise<{ success: boolean; tempPassword: string }> => {
    await delay(300);
    const tempPassword = Math.random().toString(36).slice(-8);
    return {
      success: true,
      tempPassword,
    };
  },

  // Get purchase history
  getPurchaseHistory: async (customerId: string): Promise<{ orders: Order[]; auctions: Auction[] }> => {
    await delay(150);
    const orders = DatabaseAPI.data.orders.filter((order: Order) => order.buyerId === customerId);
    const auctions = DatabaseAPI.data.auctions.filter((auction: Auction) => auction.highestBidderId === customerId);
    return { orders, auctions };
  },

  // Get customer stats
  getCustomerStats: async (customerId: string): Promise<{ totalOrders: number; totalSpent: number; totalBids: number; wonAuctions: number }> => {
    await delay(100);
    const customer = await DatabaseAPI.getById('customers', customerId);
    if (!customer) {
      return { totalOrders: 0, totalSpent: 0, totalBids: 0, wonAuctions: 0 };
    }
    
    return {
      totalOrders: customer.totalOrders,
      totalSpent: customer.totalSpent,
      totalBids: customer.totalBids,
      wonAuctions: customer.wonAuctions,
    };
  },
});

// Export all APIs
export const api = {
  products: productsAPI,
  orders: ordersAPI,
  auctions: auctionsAPI,
  vouchers: vouchersAPI,
  users: usersAPI,
  customers: customersAPI,
  articles: articlesAPI,
  affiliates: affiliatesAPI,
};
