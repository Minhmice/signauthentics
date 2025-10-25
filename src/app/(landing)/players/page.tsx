"use client";
import Section from "@/components/ui/Section";
import PlayerTile from "@/components/cards/PlayerTile";
import { playerProfiles } from "@/lib/mock/playerProfiles";
import { getDisplayName, getHeadshot, getClubName } from "@/lib/mock/playerProfiles";
import { Search } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PlayersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPlayers = playerProfiles.filter((p) => {
    const name = getDisplayName(p).toLowerCase();
    const club = getClubName(p).toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || club.includes(query);
  });

  // Featured/Spotlight players - first 8
  const spotlightPlayers = playerProfiles.slice(0, 8);

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <Section>
        <div className="relative w-full aspect-[21/7] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-700">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
            <h1 className="text-5xl font-bold mb-4">Cầu thủ Việt Nam</h1>
            <p className="text-xl text-zinc-300 max-w-2xl">
              Khám phá thông tin và sưu tầm các món đồ lưu niệm có chữ ký từ các cầu thủ Olympic Việt Nam
            </p>
          </div>
        </div>
      </Section>

      {/* Search */}
      <Section title="Tìm kiếm cầu thủ">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Tìm theo tên cầu thủ hoặc câu lạc bộ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-zinc-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
          />
        </div>
        {searchQuery && (
          <div className="text-sm text-zinc-500 text-center mt-4">
            Tìm thấy {filteredPlayers.length} cầu thủ
          </div>
        )}
      </Section>

      {/* Players Grid */}
      <Section title={searchQuery ? "Kết quả tìm kiếm" : "Tất cả cầu thủ"}>
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredPlayers.map((p) => (
              <PlayerTile 
                key={p.id} 
                name={getDisplayName(p)} 
                club={getClubName(p)} 
                headshot={getHeadshot(p)}
                slug={p.slug}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-zinc-500">
            Không tìm thấy cầu thủ nào phù hợp với &ldquo;{searchQuery}&rdquo;
          </div>
        )}
      </Section>

      {/* Spotlight Players */}
      <Section title="Cầu thủ nổi bật">
        <div className="flex gap-4 overflow-x-auto pb-4 scrub-x">
          {spotlightPlayers.map((p) => (
            <Link 
              key={p.id} 
              href={`/players/${p.slug}`}
              className="group shrink-0 w-48"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <Image 
                  src={getHeadshot(p)} 
                  alt={getDisplayName(p)} 
                  fill 
                  sizes="200px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="text-xs opacity-80 mb-1">{getClubName(p)}</div>
                  <div className="font-semibold text-sm leading-tight">{getDisplayName(p)}</div>
                  {p.identifiers?.jersey_number && (
                    <div className="text-2xl font-bold opacity-50 absolute top-2 right-2">
                      #{p.identifiers.jersey_number}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}


