"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { DataTable } from "@/app/dashboard/components/shared/DataTable";
import { FilterPopover, FilterOption } from "@/app/dashboard/components/shared/FilterPopover";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { AnimatedSection, AnimatedField } from "@/app/dashboard/components/forms/shared/FormAnimations";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Package, 
  ShoppingCart,
  CheckCircle2
} from "lucide-react";
import { productsAPI, type Product } from "@/lib/mock/db";
import { formatPrice } from "@/lib/ui/price";
import { getRarityLabel } from "@/lib/ui/rarity";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

// Filter options for products (giống hệt products page)
const filterOptions: FilterOption[] = [
  {
    key: "category",
    label: "Category",
    type: "select",
    options: [
      { value: "Jersey", label: "Jersey" },
      { value: "Ball", label: "Ball" },
      { value: "Boots", label: "Boots" },
      { value: "Photo", label: "Photo" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    key: "rarity",
    label: "Rarity",
    type: "select",
    options: [
      { value: "standard", label: "Standard" },
      { value: "limited", label: "Limited" },
      { value: "rare", label: "Rare" },
      { value: "ultra", label: "Ultra" },
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "draft", label: "Draft" },
    ],
  },
  {
    key: "priceRange",
    label: "Price Range",
    type: "number",
    placeholder: "Min price",
  },
];

interface Step0ProductSelectionProps {
  form: UseFormReturn<any>;
  onNext?: () => void;
  selectedProducts: any[];
  onProductsChange: (products: any[]) => void;
}

export function Step0ProductSelection({ form, onNext, selectedProducts, onProductsChange }: Step0ProductSelectionProps) {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState<Record<string, unknown>>({});

  // Load products
  React.useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.getAll();
      setProducts(data.filter((product): product is Product => product !== null));
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Handle product selection
  const handleProductSelect = (product: Product, checked: boolean) => {
    if (checked) {
      onProductsChange([...selectedProducts, product]);
    } else {
      onProductsChange(selectedProducts.filter(p => p.id !== product.id));
    }
  };

  // Update form when selection changes
  React.useEffect(() => {
    form.setValue("productIds", selectedProducts.map(p => p.id));
    form.setValue("selectedProducts", selectedProducts);
  }, [selectedProducts, form]);

  // Load selected products from form on mount
  React.useEffect(() => {
    const formProductIds = form.getValues("productIds") as string[] || [];
    const formSelectedProducts = form.getValues("selectedProducts") as any[] || [];
    
    if (formProductIds.length > 0 && formSelectedProducts.length > 0) {
      onProductsChange(formSelectedProducts);
    }
  }, [form, onProductsChange]);

  // Auto-advance when products are selected
  React.useEffect(() => {
    if (selectedProducts.length > 0 && onNext) {
      // Small delay to show selection feedback
      const timer = setTimeout(() => {
        onNext();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedProducts.length, onNext]);

  // Product columns with checkbox
  const productColumns: ColumnDef<Product>[] = [
    {
      id: "product-select",
      header: () => (
        <Checkbox
          checked={selectedProducts.length === products.length && products.length > 0}
          onCheckedChange={(value) => {
            if (value) {
              onProductsChange(products);
            } else {
              onProductsChange([]);
            }
          }}
          aria-label="Select all products"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedProducts.some(p => p.id === row.original.id)}
          onCheckedChange={(checked) => handleProductSelect(row.original, !!checked)}
          aria-label="Select product"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Product",
      cell: ({ row }) => (
        <div className="font-medium max-w-xs truncate">{row.original.title}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="text-sm text-zinc-400">{row.original.category}</div>
      ),
    },
    {
      accessorKey: "rarity",
      header: "Rarity",
      cell: ({ row }) => (
        <div className="text-sm">
          {getRarityLabel(row.original.rarity)}
        </div>
      ),
    },
    {
      accessorKey: "priceVND",
      header: "Price",
      cell: ({ row }) => (
        <div className="text-right font-medium">
          {formatPrice(row.original.priceVND, "VND")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className={`text-sm px-2 py-1 rounded-full ${
          row.original.status === 'active' 
            ? 'bg-green-900/20 text-green-400' 
            : 'bg-zinc-900/20 text-zinc-400'
        }`}>
          {row.original.status}
        </div>
      ),
    },
  ];

  return (
    <AnimatedSection>
      <FormSection
        title="Chọn sản phẩm đấu giá"
        description="Chọn một hoặc nhiều sản phẩm để tạo đấu giá"
        icon={Package}
      >
        <div className="space-y-6">
          {/* Selection Summary */}
          {selectedProducts.length > 0 && (
            <AnimatedField>
              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-blue-200">
                    Đã chọn {selectedProducts.length} sản phẩm
                  </span>
                </div>
                <div className="text-sm text-blue-300">
                  {selectedProducts.length === 1 
                    ? "Sẽ tạo 1 đấu giá cho sản phẩm này"
                    : `Sẽ tạo ${selectedProducts.length} đấu giá cho các sản phẩm này`
                  }
                </div>
              </div>
            </AnimatedField>
          )}

          {/* Filters */}
          <AnimatedField>
            <div className="flex items-center gap-4">
              <FilterPopover
                filters={filterOptions}
                values={filters}
                onValuesChange={setFilters}
                onClear={() => setFilters({})}
              />
              <div className="text-sm text-zinc-400">
                {products.length} sản phẩm có sẵn
              </div>
            </div>
          </AnimatedField>

          {/* Products Table */}
          <AnimatedField>
            <DataTable
              columns={productColumns}
              data={products}
              searchKey="title"
              searchPlaceholder="Tìm kiếm sản phẩm..."
              pageSize={10}
              loading={loading}
              getRowId={(row) => row.id}
              showBulkActions={false}
              showExport={false}
            />
          </AnimatedField>

          {/* Instructions */}
          <AnimatedField>
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <ShoppingCart className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-zinc-200">
                  <div className="font-medium mb-1">Hướng dẫn:</div>
                  <ul className="space-y-1 text-zinc-300">
                    <li>• Chọn checkbox để chọn sản phẩm</li>
                    <li>• Có thể chọn nhiều sản phẩm để tạo nhiều đấu giá</li>
                    <li>• Sử dụng filter để lọc theo danh mục, độ hiếm, trạng thái</li>
                    <li>• Form sẽ tự động chuyển sang bước tiếp theo khi chọn xong</li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedField>
        </div>
      </FormSection>
    </AnimatedSection>
  );
}
