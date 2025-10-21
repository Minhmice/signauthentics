import Section from "@/components/ui/Section";
import { CollectionCardSkeleton } from "@/components/cards/CollectionCardSkeleton";
import ProductCard from "@/components/cards/ProductCard";
import { products } from "@/lib/mock/products";
import HeroMasthead from "@/components/home/HeroMasthead";
import PlayersSlider from "@/components/home/PlayersSlider";
import PromoSaleWithFeature from "@/components/home/PromoSaleWithFeature";
import PlayersSpotlight from "@/components/home/PlayersSpotlight";
import LatestNews from "@/components/home/LatestNews";

export default function Home() {
  return (
    <div className="space-y-8">
      <Section container>
        <HeroMasthead />
      </Section>

      <PlayersSlider />

      <Section title="World XI Sale">
        <PromoSaleWithFeature />
      </Section>

      <Section title="Players Spotlight">
        <PlayersSpotlight />
      </Section>

      <Section title="Collections Grid">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CollectionCardSkeleton key={i} />
          ))}
        </div>
      </Section>

      <Section title="Ballon d'Or Winners – Horizontal Scroller">
        <div className="relative">
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-4 min-w-max">
              {products.slice(0, 10).map((p) => (
                <div key={p.id} className="w-64 shrink-0">
                  <ProductCard id={p.id} title={p.title} priceVND={p.priceVND} images={p.images} rarity={p.rarity} accentHex={p.accentHex} />
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-white via-transparent to-white [mask-image:linear-gradient(to_right,black,transparent_20%,transparent_80%,black)]" />
        </div>
      </Section>

      <Section title="Latest News">
        <LatestNews />
      </Section>
    </div>
  );
}
