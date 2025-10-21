"use client";

/**
 * Products Management Page
 * Enhanced với Grid/Table view toggle và Create/Edit forms
 * Admin/Seller: Full, Editor: Read-only (no price/stock)
 */

import * as React from "react";
import { DashboardSectionHeader } from "@/components/dashboard/RoleBadge";
import { DataTable } from "@/components/dashboard/DataTable";
import { ProductGrid } from "@/components/dashboard/ProductGrid";
import { ProductForm } from "@/components/dashboard/ProductForm";
import { Button } from "@/components/ui/button";
import { Plus, Filter as FilterIcon, Edit, Trash, Grid3x3, List } from "lucide-react";
import { products } from "@/lib/mock/products";
import { formatPrice } from "@/lib/ui/price";
import { getRarityLabel } from "@/lib/ui/rarity";
import { ColumnDef } from "@tanstack/react-table";

type Product = {
  id: string;
  title: string;
  category: string;
  player?: string;
  priceVND: number;
  rarity: string;
  stock: number;
  status: string;
};

const productData: Product[] = products.map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  player: p.playerId, // Use playerId from product
  priceVND: p.priceVND,
  rarity: p.rarity,
  stock: Math.floor(Math.random() * 50) + 1,
  status: "active",
}));

const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "SKU",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="font-medium max-w-xs truncate">{row.original.title}</div>,
  },
  {
    accessorKey: "player",
    header: "Player",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "priceVND",
    header: "Price VND",
    cell: ({ row }) => <span className="font-semibold">{formatPrice(row.original.priceVND, "VND")}</span>,
  },
  {
    accessorKey: "rarity",
    header: "Rarity",
    cell: ({ row }) => {
      const rarity = row.original.rarity;
      const colorMap: Record<string, string> = {
        legendary: "bg-purple-500/10 text-purple-500",
        epic: "bg-blue-500/10 text-blue-500",
        rare: "bg-green-500/10 text-green-500",
        common: "bg-zinc-500/10 text-zinc-400",
      };
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${colorMap[rarity] || "bg-zinc-500/10 text-zinc-400"}`}>
          {getRarityLabel(rarity)}
        </span>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <span className={row.original.stock < 10 ? "text-red-500 font-semibold" : "text-zinc-300"}>
        {row.original.stock}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          row.original.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex items-center gap-1">
        <button className="p-2 hover:bg-zinc-800 rounded transition-colors">
          <Edit className="w-4 h-4 text-zinc-400" />
        </button>
        <button className="p-2 hover:bg-red-900/50 rounded transition-colors">
          <Trash className="w-4 h-4 text-red-500" />
        </button>
      </div>
    ),
  },
];

export default function DashboardProductsPage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("grid");
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<{
    id: string;
    title: string;
    category: string;
    player?: string;
    priceVND: number;
    rarity: string;
    stock: number;
    status: string;
  } | undefined>();

  const handleEdit = (product: Product) => {
    setSelectedProduct({
      id: product.id,
      title: product.title,
      category: product.category,
      player: product.player,
      priceVND: product.priceVND,
      rarity: product.rarity,
      stock: product.stock,
      status: product.status,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete logic
    console.log("Delete product:", id);
  };

  const handleCreateNew = () => {
    setSelectedProduct(undefined);
    setIsFormOpen(true);
  };

  const handleSave = (data: Record<string, unknown>) => {
    // TODO: Implement save logic
    console.log("Save product:", data);
  };

  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        title="Products"
        description={`Quản lý sản phẩm - ${productData.length} products total`}
        visibleFor={["admin", "seller"]}
        readOnlyFor={["editor"]}
        actions={
          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 text-sm transition-colors ${
                  viewMode === "grid" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
                }`}
                title="Grid view"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-2 text-sm transition-colors ${
                  viewMode === "table" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
                }`}
                title="Table view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-200">
              <FilterIcon className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        }
      />

      {/* View Content */}
      {viewMode === "grid" ? (
        <ProductGrid products={productData} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <DataTable
          columns={productColumns}
          data={productData}
          searchKey="title"
          searchPlaceholder="Search products..."
          pageSize={10}
        />
      )}

      {/* Product Form Dialog */}
      <ProductForm open={isFormOpen} onOpenChange={setIsFormOpen} product={selectedProduct} onSave={handleSave} />

      {/* Wireframe Note */}
      <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
        <p className="text-xs text-zinc-500">
          <strong className="text-zinc-400">Features:</strong> Grid/Table toggle view, Create/Edit dialog, Bulk actions, Filter by category/rarity/status, Image upload
        </p>
      </div>
    </div>
  );
}


