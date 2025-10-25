import Section from "@/components/ui/Section";
import CollectionCard from "@/app/(landing)/components/cards/CollectionCard";
import { collections } from "@/lib/mock/collections";

export default function CollectionsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <Section>
        <div className="relative w-full aspect-[21/7] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900 to-pink-700">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1200')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
            <h1 className="text-5xl font-bold mb-4">Bộ sưu tập</h1>
            <p className="text-xl text-purple-100 max-w-2xl">
              Khám phá các bộ sưu tập độc quyền với những món đồ lưu niệm hiếm có và đặc biệt
            </p>
          </div>
        </div>
      </Section>

      {/* Featured Collection - Large */}
      {collections[0] && (
        <Section title="Bộ sưu tập nổi bật">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <CollectionCard collection={collections[0]} />
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">{collections[0].name}</h2>
              <p className="text-lg text-zinc-600 leading-relaxed">{collections[0].description}</p>
              <div className="flex gap-4">
                <div className="p-4 rounded-xl border border-zinc-200">
                  <div className="text-2xl font-bold text-accent">50+</div>
                  <div className="text-sm text-zinc-500">Món đồ</div>
                </div>
                <div className="p-4 rounded-xl border border-zinc-200">
                  <div className="text-2xl font-bold text-accent">20+</div>
                  <div className="text-sm text-zinc-500">Cầu thủ</div>
                </div>
                <div className="p-4 rounded-xl border border-zinc-200">
                  <div className="text-2xl font-bold text-accent">Độc quyền</div>
                  <div className="text-sm text-zinc-500">Phiên bản giới hạn</div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* All Collections - Mosaic */}
      <Section title="Tất cả bộ sưu tập">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </Section>
    </div>
  );
}


