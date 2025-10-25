"use client";

/**
 * Product Grid View Component
 * Hiển thị products dạng grid cards thay vì table
 */

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Eye } from "lucide-react";
import { formatPrice } from "@/lib/ui/price";
import { getRarityLabel } from "@/lib/ui/rarity";
import { type Product } from "@/lib/mock/db";

interface ProductGridProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export function ProductGrid({ products, onEdit, onDelete, onView }: ProductGridProps) {
  const rarityColors: Record<string, string> = {
    standard: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    limited: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    rare: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    ultra: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    legendary: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    epic: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    common: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all group">
          <CardContent className="p-0">
            {/* Image placeholder */}
            <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-zinc-700 opacity-50">{product.id.slice(1)}</div>
              </div>
              
              {/* Rarity badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 text-[10px] font-semibold rounded border ${rarityColors[product.rarity] || rarityColors.common}`}>
                  {getRarityLabel(product.rarity)}
                </span>
              </div>

              {/* Stock warning */}
              {product.stock < 10 && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-[10px] font-semibold rounded bg-red-500/10 text-red-500 border border-red-500/20">
                    Low Stock
                  </span>
                </div>
              )}

              {/* Quick actions on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800"
                  onClick={() => onView?.(product.id)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800"
                  onClick={() => onEdit?.(product)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-red-900/50 border-red-700 text-red-500 hover:bg-red-900"
                  onClick={() => onDelete?.(product.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Product info */}
            <div className="p-4">
              <div className="mb-2">
                <h3 className="font-semibold text-sm text-white line-clamp-2 mb-1 min-h-[40px]">{product.title}</h3>
                <p className="text-xs text-zinc-500">SKU: {product.id}</p>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">Category</p>
                  <p className="text-sm text-zinc-300">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500 mb-0.5">Stock</p>
                  <p className={`text-sm font-semibold ${product.stock < 10 ? "text-red-500" : "text-zinc-300"}`}>
                    {product.stock}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">{formatPrice(product.priceVND, "VND")}</span>
                  <span className={`px-2 py-1 text-[10px] rounded ${product.status === "active" ? "bg-green-500/10 text-green-500" : "bg-zinc-500/10 text-zinc-400"}`}>
                    {product.status}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/**
 * Product Grid Skeleton
 * Loading state cho grid view
 */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-0">
            <div className="aspect-square bg-zinc-800 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-zinc-800 rounded animate-pulse" />
              <div className="h-3 bg-zinc-800 rounded w-20 animate-pulse" />
              <div className="flex justify-between">
                <div className="h-8 bg-zinc-800 rounded w-24 animate-pulse" />
                <div className="h-6 bg-zinc-800 rounded w-16 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

