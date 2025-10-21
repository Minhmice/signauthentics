"use client";
import Section from "@/components/ui/Section";
import ProductCard from "@/components/cards/ProductCard";
import ArticleCard from "@/components/cards/ArticleCard";
import PlayerTile from "@/components/cards/PlayerTile";
import { clubs } from "@/lib/mock/clubs";
import { products } from "@/lib/mock/products";
import { articles } from "@/lib/mock/articles";
import { playerProfiles, getDisplayName, getHeadshot, getClubName } from "@/lib/mock/playerProfiles";
import Image from "next/image";
import { use, useEffect } from "react";
import { Trophy, MapPin, Calendar } from "lucide-react";

export default function ClubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const club = clubs.find((c) => c.slug === slug) ?? clubs[0];

  // Set accent color based on club
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", club.primaryColor);
    return () => {
      document.documentElement.style.setProperty("--accent", "#0EA5E9");
    };
  }, [club.primaryColor]);

  // Get club players
  const clubPlayers = playerProfiles.filter((p) => {
    const clubName = getClubName(p);
    return clubName.toLowerCase().includes(club.name.toLowerCase()) || club.name.toLowerCase().includes(clubName.toLowerCase());
  });

  // Get club products (mock filter)
  const clubProducts = products.slice(0, 4);
  const clubArticles = articles.slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Club Banner */}
      <Section>
        <div
          className="relative w-full aspect-[21/7] rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${club.primaryColor}, ${club.secondaryColor || club.primaryColor})`,
          }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 flex items-center justify-between p-8 text-white">
            <div className="flex items-center gap-6">
              {/* Crest */}
              <div className="relative w-32 h-32 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/30 p-4 shadow-2xl">
                <Image src={club.crest} alt={club.name} fill className="object-contain p-2" />
              </div>

              {/* Info */}
              <div>
                <div className="text-sm opacity-90 mb-1">{club.league}</div>
                <h1 className="text-5xl font-bold mb-3">{club.name}</h1>
                <div className="flex items-center gap-4 text-sm">
                  {club.founded && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Thành lập {club.founded}</span>
                    </div>
                  )}
                  {club.stadium && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{club.stadium}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{club.playerCount || 0}</div>
                <div className="text-sm opacity-80">Cầu thủ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{club.itemCount || 0}</div>
                <div className="text-sm opacity-80">Món đồ</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Description */}
      {club.description && (
        <Section>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-zinc-600 leading-relaxed">{club.description}</p>
          </div>
        </Section>
      )}

      {/* Club Players */}
      {clubPlayers.length > 0 && (
        <Section title="Cầu thủ">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {clubPlayers.map((p) => (
              <PlayerTile key={p.id} name={getDisplayName(p)} club={getClubName(p)} headshot={getHeadshot(p)} slug={p.slug} />
            ))}
          </div>
        </Section>
      )}

      {/* Top Sellers */}
      <Section title="Sản phẩm bán chạy">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {clubProducts.map((p) => (
            <ProductCard key={p.id} id={p.id} title={p.title} priceVND={p.priceVND} images={p.images} rarity={p.rarity} accentHex={club.primaryColor} />
          ))}
        </div>
      </Section>

      {/* Stories */}
      <Section title="Tin tức & Câu chuyện">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clubArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Section>
    </div>
  );
}


