/**
 * Form Utility Functions & Validation Schemas
 * Shared utilities for all dashboard forms
 */

import { z } from "zod";

// ===== GENERATION HELPERS =====

/**
 * Generate a referral code for customers
 * Format: First 3 letters of name + random 3 digits
 */
export function generateReferralCode(name: string): string {
  const cleanName = name.replace(/[^a-zA-Z\s]/g, '').trim();
  const namePart = cleanName.substring(0, 3).toUpperCase().padEnd(3, 'X');
  const numberPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${namePart}${numberPart}`;
}

/**
 * Generate a unique SKU for products
 * Format: Category prefix + random 6 digits
 */
export function generateSKU(category: string): string {
  const categoryPrefix = category.substring(0, 3).toUpperCase().padEnd(3, 'X');
  const numberPart = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `${categoryPrefix}${numberPart}`;
}

/**
 * Generate a slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// ===== FORMATTING HELPERS =====

/**
 * Format phone number for Vietnamese format
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('84')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('0')) {
    return `+84${cleaned.substring(1)}`;
  }
  return `+84${cleaned}`;
}

/**
 * Format currency to Vietnamese Dong
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

// ===== VALIDATION HELPERS =====

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Vietnamese phone number
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate postal code (Vietnamese format)
 */
export function validatePostalCode(code: string): boolean {
  const postalRegex = /^[0-9]{5,6}$/;
  return postalRegex.test(code);
}

// ===== COMMON VALIDATION MESSAGES =====

export const VALIDATION_MESSAGES = {
  required: 'Trường này là bắt buộc',
  email: 'Email không hợp lệ',
  phone: 'Số điện thoại không hợp lệ',
  minLength: (min: number) => `Tối thiểu ${min} ký tự`,
  maxLength: (max: number) => `Tối đa ${max} ký tự`,
  min: (min: number) => `Giá trị tối thiểu là ${min}`,
  max: (max: number) => `Giá trị tối đa là ${max}`,
  positive: 'Giá trị phải lớn hơn 0',
  nonNegative: 'Giá trị phải lớn hơn hoặc bằng 0',
  url: 'URL không hợp lệ',
  postalCode: 'Mã bưu điện không hợp lệ',
  unique: 'Giá trị này đã tồn tại',
} as const;

// ===== FORM FIELD HELPERS =====

/**
 * Get field error message
 */
export function getFieldError(errors: Record<string, unknown>, fieldName: string): string | undefined {
  return (errors?.[fieldName] as { message?: string })?.message;
}

/**
 * Check if field has error
 */
export function hasFieldError(errors: Record<string, unknown>, fieldName: string): boolean {
  return !!errors?.[fieldName];
}

/**
 * Get field className with error state
 */
export function getFieldClassName(hasError: boolean, className?: string): string {
  const baseClasses = className || '';
  const errorClasses = hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
  return `${baseClasses} ${errorClasses}`.trim();
}

// ===== ADDRESS HELPERS =====

/**
 * Vietnamese provinces/cities for address dropdown
 */
export const VIETNAM_PROVINCES = [
  'Hà Nội',
  'TP. Hồ Chí Minh',
  'Đà Nẵng',
  'Hải Phòng',
  'Cần Thơ',
  'An Giang',
  'Bà Rịa - Vũng Tàu',
  'Bạc Liêu',
  'Bắc Giang',
  'Bắc Kạn',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Dương',
  'Bình Phước',
  'Bình Thuận',
  'Cà Mau',
  'Cao Bằng',
  'Đắk Lắk',
  'Đắk Nông',
  'Điện Biên',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Giang',
  'Hà Nam',
  'Hà Tĩnh',
  'Hải Dương',
  'Hậu Giang',
  'Hòa Bình',
  'Hưng Yên',
  'Khánh Hòa',
  'Kiên Giang',
  'Kon Tum',
  'Lai Châu',
  'Lâm Đồng',
  'Lạng Sơn',
  'Lào Cai',
  'Long An',
  'Nam Định',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sóc Trăng',
  'Sơn La',
  'Tây Ninh',
  'Thái Bình',
  'Thái Nguyên',
  'Thanh Hóa',
  'Thừa Thiên Huế',
  'Tiền Giang',
  'Trà Vinh',
  'Tuyên Quang',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Yên Bái',
] as const;

/**
 * Vietnamese districts for major cities
 */
export const VIETNAM_DISTRICTS = {
  'TP. Hồ Chí Minh': [
    'Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8',
    'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Quận Thủ Đức', 'Quận Gò Vấp',
    'Quận Bình Thạnh', 'Quận Tân Bình', 'Quận Tân Phú', 'Quận Phú Nhuận',
    'Quận Hóc Môn', 'Quận Củ Chi', 'Quận Bình Tân', 'Quận Nhà Bè', 'Huyện Cần Giờ'
  ],
  'Hà Nội': [
    'Quận Ba Đình', 'Quận Hoàn Kiếm', 'Quận Tây Hồ', 'Quận Long Biên', 'Quận Cầu Giấy',
    'Quận Đống Đa', 'Quận Hai Bà Trưng', 'Quận Hoàng Mai', 'Quận Thanh Xuân',
    'Huyện Sóc Sơn', 'Huyện Đông Anh', 'Huyện Gia Lâm', 'Quận Nam Từ Liêm',
    'Huyện Thanh Trì', 'Quận Bắc Từ Liêm', 'Huyện Mê Linh', 'Quận Hà Đông',
    'Thị xã Sơn Tây', 'Huyện Ba Vì', 'Huyện Phúc Thọ', 'Huyện Đan Phượng',
    'Huyện Hoài Đức', 'Huyện Quốc Oai', 'Huyện Thạch Thất', 'Huyện Chương Mỹ',
    'Huyện Thanh Oai', 'Huyện Thường Tín', 'Huyện Phú Xuyên', 'Huyện Ứng Hòa',
    'Huyện Mỹ Đức'
  ],
  'Đà Nẵng': [
    'Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn',
    'Quận Liên Chiểu', 'Quận Cẩm Lệ', 'Huyện Hòa Vang', 'Huyện Hoàng Sa'
  ]
} as const;

// ===== FILE UPLOAD HELPERS =====

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Chỉ hỗ trợ file JPG, PNG, WebP' };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'Kích thước file tối đa 5MB' };
  }
  
  return { valid: true };
}

/**
 * Generate preview URL for image file
 */
export function generateImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ===== FORM STATE HELPERS =====

/**
 * Check if form is dirty (has unsaved changes)
 */
export function isFormDirty(defaultValues: Record<string, unknown>, currentValues: Record<string, unknown>): boolean {
  return JSON.stringify(defaultValues) !== JSON.stringify(currentValues);
}

/**
 * Get changed fields
 */
export function getChangedFields(defaultValues: Record<string, unknown>, currentValues: Record<string, unknown>): string[] {
  const changedFields: string[] = [];
  
  for (const key in currentValues) {
    if (defaultValues[key] !== currentValues[key]) {
      changedFields.push(key);
    }
  }
  
  return changedFields;
}

// ===== FORM SCHEMAS =====

/**
 * Article form validation schema
 */
export const ArticleFormSchema = z.object({
  title: z.string().min(1, VALIDATION_MESSAGES.required).max(200, VALIDATION_MESSAGES.maxLength(200)),
  slug: z.string().min(1, VALIDATION_MESSAGES.required).max(200, VALIDATION_MESSAGES.maxLength(200)),
  category: z.enum(["News", "Player Profile", "Guide", "Review", "Analysis", "Interview", "Opinion"]),
  status: z.enum(["draft", "published", "archived"]),
  content: z.string().min(1, VALIDATION_MESSAGES.required),
  excerpt: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  featuredImage: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  publishedAt: z.date().optional(),
});

/**
 * Customer form validation schema
 */
export const CustomerFormSchema = z.object({
  name: z.string().min(1, VALIDATION_MESSAGES.required).max(100, VALIDATION_MESSAGES.maxLength(100)),
  email: z.string().email(VALIDATION_MESSAGES.email),
  phone: z.string().min(1, VALIDATION_MESSAGES.required).refine(validatePhone, VALIDATION_MESSAGES.phone),
  avatar: z.string().nullable(),
  shippingAddresses: z.array(z.object({
    id: z.string(),
    label: z.string(),
    fullAddress: z.string(),
    isDefault: z.boolean(),
  })).optional(),
  membershipTier: z.enum(["bronze", "silver", "gold", "platinum"]),
  loyaltyPoints: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
  status: z.enum(["active", "inactive", "banned"]),
  bannedReason: z.string().nullable().optional(),
  lastLoginAt: z.date().optional(),
  createdAt: z.date().optional(),
});

/**
 * Order form validation schema
 */
export const OrderFormSchema = z.object({
  orderId: z.string().min(1, VALIDATION_MESSAGES.required),
  buyerId: z.string().min(1, VALIDATION_MESSAGES.required),
  buyerName: z.string().min(1, VALIDATION_MESSAGES.required),
  buyerEmail: z.string().email(VALIDATION_MESSAGES.email),
  shippingAddress: z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    phone: z.string(),
  }),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1, VALIDATION_MESSAGES.positive),
    priceVND: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
  })),
  subtotal: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
  shipping: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
  discount: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
  total: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
  paymentMethod: z.enum(["credit_card", "bank_transfer", "cash_on_delivery", "paypal"]),
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]),
  fulfillmentStatus: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
  createdAt: z.string().optional(),
});

/**
 * Voucher form validation schema
 */
export const VoucherFormSchema = z.object({
  code: z.string().min(1, VALIDATION_MESSAGES.required).max(50, VALIDATION_MESSAGES.maxLength(50)),
  name: z.string().min(1, VALIDATION_MESSAGES.required).max(100, VALIDATION_MESSAGES.maxLength(100)),
  description: z.string().optional(),
  type: z.enum(["percentage", "fixed_amount"]),
  value: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
  scope: z.enum(["all", "category", "product", "customer"]),
  minOrderAmount: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
  maxDiscountAmount: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
  usageLimit: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
  usedCount: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
  validFrom: z.date().optional(),
  validUntil: z.date().optional(),
  isActive: z.boolean(),
  createdAt: z.date().optional(),
});

export const UserFormSchema = z.object({
  firstName: z.string().min(1, VALIDATION_MESSAGES.required).max(50, VALIDATION_MESSAGES.maxLength(50)),
  lastName: z.string().min(1, VALIDATION_MESSAGES.required).max(50, VALIDATION_MESSAGES.maxLength(50)),
  email: z.string().email(VALIDATION_MESSAGES.email),
  phone: z.string().min(1, VALIDATION_MESSAGES.required).refine(validatePhone, VALIDATION_MESSAGES.phone),
  avatar: z.string().nullable().optional(),
  role: z.enum(["admin", "manager", "employee", "user"]),
  department: z.string().min(1, VALIDATION_MESSAGES.required).max(100, VALIDATION_MESSAGES.maxLength(100)),
  position: z.string().min(1, VALIDATION_MESSAGES.required).max(100, VALIDATION_MESSAGES.maxLength(100)),
  employeeId: z.string().min(1, VALIDATION_MESSAGES.required).max(20, VALIDATION_MESSAGES.maxLength(20)),
  hireDate: z.date().optional(),
  salary: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
  emergencyContactName: z.string().min(1, VALIDATION_MESSAGES.required).max(100, VALIDATION_MESSAGES.maxLength(100)),
  emergencyContactPhone: z.string().min(1, VALIDATION_MESSAGES.required).refine(validatePhone, VALIDATION_MESSAGES.phone),
  emergencyContactRelation: z.string().min(1, VALIDATION_MESSAGES.required).max(50, VALIDATION_MESSAGES.maxLength(50)),
  permissions: z.array(z.string()).optional(),
  isActive: z.boolean(),
  lastLoginAt: z.date().optional(),
  createdAt: z.date().optional(),
});

export const ProductFormSchema = z.object({
  title: z.string().min(1, VALIDATION_MESSAGES.required).max(200, VALIDATION_MESSAGES.maxLength(200)),
  slug: z.string().min(1, VALIDATION_MESSAGES.required).max(200, VALIDATION_MESSAGES.maxLength(200)),
  description: z.string().min(1, VALIDATION_MESSAGES.required),
  shortDescription: z.string().min(1, VALIDATION_MESSAGES.required).max(500, VALIDATION_MESSAGES.maxLength(500)),
  price: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
  comparePrice: z.number().min(0, VALIDATION_MESSAGES.nonNegative).optional(),
  costPrice: z.number().min(0, VALIDATION_MESSAGES.nonNegative).optional(),
  sku: z.string().min(1, VALIDATION_MESSAGES.required).max(100, VALIDATION_MESSAGES.maxLength(100)),
  barcode: z.string().max(100, VALIDATION_MESSAGES.maxLength(100)).optional(),
  trackQuantity: z.boolean().default(true),
  quantity: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
  lowStockThreshold: z.number().min(0, VALIDATION_MESSAGES.nonNegative).optional(),
  weight: z.number().min(0, VALIDATION_MESSAGES.nonNegative).optional(),
  dimensions: z.object({
    length: z.number().min(0, VALIDATION_MESSAGES.nonNegative).optional(),
    width: z.number().min(0, VALIDATION_MESSAGES.nonNegative).optional(),
    height: z.number().min(0, VALIDATION_MESSAGES.nonNegative).optional(),
  }).optional(),
  category: z.string().min(1, VALIDATION_MESSAGES.required).max(100, VALIDATION_MESSAGES.maxLength(100)),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "active", "archived"]).default("draft"),
  featured: z.boolean().default(false),
  images: z.array(z.string()).optional(),
  seoTitle: z.string().max(60, VALIDATION_MESSAGES.maxLength(60)).optional(),
  seoDescription: z.string().max(160, VALIDATION_MESSAGES.maxLength(160)).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
