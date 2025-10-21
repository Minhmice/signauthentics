"use client";
import Section from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Filter as FilterIcon, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { products } from "@/lib/mock/products";
import { formatPrice } from "@/lib/ui/price";
import { getRarityLabel } from "@/lib/ui/rarity";

export default function DashboardProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-8">
      {/* Toolbar */}
      <Section title="Quản lý sản phẩm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-10 pr-4 rounded-lg border border-zinc-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
            />
          </div>
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Lọc
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Thêm sản phẩm
          </Button>
        </div>
      </Section>

      {/* Products Table */}
      <Section>
        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Tên sản phẩm</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Độ hiếm</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-zinc-700">Giá</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.slice(0, 10).map((product) => (
                    <tr key={product.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                      <td className="py-3 px-4 text-sm font-mono">{product.id}</td>
                      <td className="py-3 px-4">
                        <div className="font-medium line-clamp-1">{product.title}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`chip text-xs ${product.rarity === "legendary" ? "bg-purple-100 text-purple-700" : product.rarity === "epic" ? "bg-blue-100 text-blue-700" : "bg-zinc-100 text-zinc-700"}`}>
                          {getRarityLabel(product.rarity)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-right font-semibold">{formatPrice(product.priceVND, "VND")}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-zinc-600" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}


