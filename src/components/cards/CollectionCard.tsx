import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/mock/collections";

type Props = {
  collection: Collection;
};

export default function CollectionCard({ collection }: Props) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group block relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
      style={
        {
          "--collection-accent": collection.accentHex,
        } as React.CSSProperties
      }
    >
      {/* Image */}
      <div className="relative aspect-[4/5]">
        <Image src={collection.heroImage} alt={collection.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2 group-hover:translate-y-[-4px] transition-transform">{collection.name}</h3>
          <p className="text-sm text-zinc-200 mb-4 line-clamp-2">{collection.description}</p>

          {/* CTA */}
          <div className="inline-flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Khám phá bộ sưu tập</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--collection-accent)]" />
    </Link>
  );
}

