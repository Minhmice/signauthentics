"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  X,
  Edit3
} from "lucide-react";
import { formatPrice } from "@/lib/ui/price";
import { getRarityLabel } from "@/lib/ui/rarity";
import type { Product } from "@/lib/mock/db";

interface SelectedProductsBannerProps {
  selectedProducts: Product[];
  onEditSelection: () => void;
  onRemoveProduct: (productId: string) => void;
}

export function SelectedProductsBanner({ 
  selectedProducts, 
  onEditSelection, 
  onRemoveProduct 
}: SelectedProductsBannerProps) {
  if (selectedProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/50 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-blue-200">
            Sản phẩm đã chọn ({selectedProducts.length})
          </span>
          <Badge variant="secondary" className="bg-blue-800/50 text-blue-200">
            {selectedProducts.length === 1 ? "1 đấu giá" : `${selectedProducts.length} đấu giá`}
          </Badge>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onEditSelection}
          className="text-blue-300 border-blue-700 hover:bg-blue-800/20"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Thay đổi
        </Button>
      </div>

      <div className="space-y-2">
        {selectedProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between bg-zinc-800/50 rounded-lg p-3"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 bg-zinc-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-zinc-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">
                  {product.title}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>{getRarityLabel(product.rarity)}</span>
                  <span>•</span>
                  <span className="font-medium text-green-400">
                    {formatPrice(product.priceVND, "VND")}
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveProduct(product.id)}
              className="text-zinc-400 hover:text-red-400 hover:bg-red-900/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {selectedProducts.length > 1 && (
        <div className="mt-3 pt-3 border-t border-zinc-700">
          <div className="text-xs text-zinc-400">
            💡 Mỗi sản phẩm sẽ tạo thành một đấu giá riêng biệt với cùng cài đặt thời gian và giá
          </div>
        </div>
      )}
    </div>
  );
}
