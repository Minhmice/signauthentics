import Section from "@/components/ui/Section";
import ProductGallery from "@/app/(landing)/components/product/ProductGallery";
import ProductCard from "@/app/(landing)/components/cards/ProductCard";
import { products } from "@/lib/mock/products";
import { rarityToBadge } from "@/lib/ui/rarity";
import { formatEUR, formatVND, vndToEur } from "@/lib/ui/price";
import { Button } from "@/components/ui/button";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug) ?? products[0];
  const badge = rarityToBadge(product.rarity);
  return (
    <div className="space-y-8">
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductGallery images={product.images} />
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className={["chip border", badge.className].join(" ")}>{badge.label}</span>
              {product.limitedQty && <span className="chip">Limited {product.limitedQty}</span>}
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{product.title}</h1>
            <div className="flex items-baseline gap-3">
              <div className="text-2xl font-semibold">{formatVND(product.priceVND)}</div>
              <div className="text-sm text-zinc-500">{formatEUR(vndToEur(product.priceVND))}</div>
            </div>
            <div className="flex gap-3">
              <Button className="min-w-40">Add to cart</Button>
              <Button variant="outline">Go to auction</Button>
            </div>
            <div className="space-y-3">
              <div className="border-b pb-2 text-sm text-zinc-500">Description · Specs · Shipping & Returns</div>
              <p className="text-sm text-zinc-700">High-quality signed memorabilia. All items come with a certificate of authenticity. Shipping worldwide. This is mock content for layout only.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Related Products">
        <div className="overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {product.relatedIds.slice(0, 6).map((id) => {
              const p = products.find((x) => x.id === id)!;
              return (
                <div key={id} className="w-64">
                  <ProductCard id={p.id} title={p.title} priceVND={p.priceVND} images={p.images} rarity={p.rarity} accentHex={p.accentHex} />
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}


