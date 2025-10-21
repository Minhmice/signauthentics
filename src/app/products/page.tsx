"use client";
import Section from "@/components/ui/Section";
import ProductCard from "@/components/cards/ProductCard";
import { products } from "@/lib/mock/products";
import { Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <Section title="Bộ lọc">
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="w-4 h-4 text-zinc-500" />
          <button className="chip cursor-pointer hover:border-accent">Tất cả danh mục</button>
          <button className="chip cursor-pointer hover:border-accent">Legendary</button>
          <button className="chip cursor-pointer hover:border-accent">Epic</button>
          <button className="chip cursor-pointer hover:border-accent">Rare</button>
          <button className="chip cursor-pointer hover:border-accent ml-auto">
            Sắp xếp: Giá tăng dần
          </button>
        </div>
      </Section>

      <Section title="Product Grid">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.slice(0, 12).map((p) => (
            <ProductCard key={p.id} id={p.id} title={p.title} priceVND={p.priceVND} images={p.images} rarity={p.rarity} accentHex={p.accentHex} />
          ))}
        </div>
        <div className="flex items-center justify-center mt-8 gap-2">
          <Button variant="outline">Prev</Button>
          {Array.from({ length: 3 }).map((_, i) => (
            <Button key={i} variant={i === 0 ? "primary" : "outline"} size="sm" className="w-10">{i + 1}</Button>
          ))}
          <Button variant="outline">Next</Button>
        </div>
      </Section>
    </div>
  );
}


