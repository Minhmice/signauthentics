"use client";
import Section from "@/components/ui/Section";
import { ProductCardSkeleton } from "@/components/cards/ProductCardSkeleton";
import Tabs from "@/components/ui/Tabs";
import { playerBySlug, getDisplayName, getHeadshot, getClubName, type PlayerProfile } from "@/lib/mock/playerProfiles";
import { products } from "@/lib/mock/products";
import ProductCard from "@/components/cards/ProductCard";
import { use, useEffect, useState } from "react";
import Image from "next/image";

export default function PlayerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const player = playerBySlug.get(slug) ?? Array.from(playerBySlug.values())[0];
  // set page accent on client
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", "#1E90FF");
  }, []);
  const playerProducts = products.filter((p) => p.playerId === (player?.id ?? ""));
  const [tab, setTab] = useState("overview");
  return (
    <div className="space-y-8">
      <Section>
        <div className="relative w-full aspect-[21/7] rounded-2xl overflow-hidden">
          <Image src={getHeadshot(player)} alt={getDisplayName(player)} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <div className="eyebrow text-zinc-300">{getClubName(player)}</div>
            <h1 className="text-4xl font-semibold">{getDisplayName(player)}</h1>
          </div>
        </div>
      </Section>

      <Section>
        <Tabs items={[{ id: "overview", label: "Overview" }, { id: "products", label: "Products" }, { id: "auctions", label: "Auctions" }]} value={tab} onValueChange={setTab} />
        {tab === "overview" && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Thông tin cá nhân</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-zinc-500">Tên đầy đủ</div>
                    <div className="font-medium">{player.identifiers?.full_name || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Tên thường gọi</div>
                    <div className="font-medium">{player.identifiers?.known_as || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Ngày sinh</div>
                    <div className="font-medium">{player.date_of_birth || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Nơi sinh</div>
                    <div className="font-medium">{player.place_of_birth || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Chiều cao</div>
                    <div className="font-medium">{player.height_m ? `${player.height_m}m` : "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Cân nặng</div>
                    <div className="font-medium">{player.weight_kg ? `${player.weight_kg}kg` : "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Vị trí</div>
                    <div className="font-medium">{player.positions?.join(", ") || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Chân thuận</div>
                    <div className="font-medium">{player.preferred_foot || "N/A"}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Thông tin câu lạc bộ</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-zinc-500">Câu lạc bộ hiện tại</div>
                    <div className="font-medium">{player.club_career?.current_club?.name || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Giải đấu</div>
                    <div className="font-medium">{player.club_career?.current_club?.league || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Số áo CLB</div>
                    <div className="font-medium">#{player.identifiers?.jersey_number || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500">Trạng thái hợp đồng</div>
                    <div className="font-medium">{player.contract?.status || "N/A"}</div>
                  </div>
                  {player.contract?.on_loan_from && (
                    <div className="col-span-2">
                      <div className="text-zinc-500">Cho mượn từ</div>
                      <div className="font-medium">{player.contract?.on_loan_from}</div>
                    </div>
                  )}
                </div>
              </div>

              {player.youth_clubs && player.youth_clubs.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Đội trẻ</h3>
                  <div className="flex flex-wrap gap-2">
                    {player.youth_clubs.map((club: string, i: number) => (
                      <span key={i} className="chip">{club}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {player.tournament_numbers && player.tournament_numbers.length > 0 && (
                <div className="p-4 rounded-xl border border-zinc-200">
                  <h3 className="text-sm font-semibold mb-3">Giải đấu</h3>
                  {player.tournament_numbers.map((t, i: number) => (
                    <div key={i} className="mb-3 last:mb-0">
                      <div className="text-xs text-zinc-500">{t.tournament}</div>
                      <div className="text-lg font-bold text-accent">#{t.number}</div>
                    </div>
                  ))}
                </div>
              )}
              {player?.national_team?.teams?.[0] && (
                <div className="p-4 rounded-xl border border-zinc-200">
                  <h3 className="text-sm font-semibold mb-3">Đội tuyển quốc gia</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-zinc-500">Cấp độ:</span>
                      <span className="ml-2 font-medium">{player.national_team.teams[0].level}</span>
                    </div>
                    {player.national_team.teams[0].caps && (
                      <div>
                        <span className="text-zinc-500">Số trận:</span>
                        <span className="ml-2 font-medium">{player.national_team.teams[0].caps}</span>
                      </div>
                    )}
                    {player.national_team.teams[0].goals !== undefined && (
                      <div>
                        <span className="text-zinc-500">Bàn thắng:</span>
                        <span className="ml-2 font-medium">{player.national_team.teams[0].goals}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {tab === "products" && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {playerProducts.map((p) => (
              <ProductCard key={p.id} id={p.id} title={p.title} priceVND={p.priceVND} images={p.images} rarity={p.rarity} accentHex={p.accentHex} />
            ))}
          </div>
        )}
        {tab === "auctions" && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}


