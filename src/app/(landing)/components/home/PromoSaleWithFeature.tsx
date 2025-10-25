import * as React from "react";
import { products } from "@/lib/mock/products";
import ProductCard from "@/components/cards/ProductCard";

export default function PromoSaleWithFeature() {
  const featured = products[0];
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-2xl bg-[#0B0E11] text-white p-8 md:col-span-2">
        <div className="eyebrow text-zinc-400">Up to 50% off</div>
        <h2 className="text-4xl font-semibold tracking-tight">WORLD XI SALE</h2>
        <p className="mt-3 text-zinc-300 max-w-lg">Limited-time offers on exclusive signed memorabilia. Shop official frames and jerseys.</p>
        <div className="mt-6 inline-flex items-center gap-2 text-[var(--accent)]">Shop the sale →</div>
      </div>
      <div>
        <ProductCard id={featured.id} title={featured.title} priceVND={featured.priceVND} images={featured.images} rarity={featured.rarity} accentHex={featured.accentHex} />
      </div>
    </section>
  );
}


