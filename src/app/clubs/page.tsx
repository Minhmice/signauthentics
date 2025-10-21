"use client";
import Section from "@/components/ui/Section";
import ClubCard from "@/components/cards/ClubCard";
import { clubs } from "@/lib/mock/clubs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ClubsPage() {
  const [selectedLeague, setSelectedLeague] = useState<string>("all");

  const leagues = Array.from(new Set(clubs.map((c) => c.league)));
  const filteredClubs = selectedLeague === "all" ? clubs : clubs.filter((c) => c.league === selectedLeague);

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <Section>
        <div className="relative w-full aspect-[21/7] rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900 to-emerald-700">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
            <h1 className="text-5xl font-bold mb-4">Câu lạc bộ</h1>
            <p className="text-xl text-emerald-100 max-w-2xl">
              Khám phá các câu lạc bộ và sưu tầm đồ lưu niệm có chữ ký từ các đội bóng hàng đầu
            </p>
          </div>
        </div>
      </Section>

      {/* Club Logos Carousel */}
      <Section title="Câu lạc bộ nổi bật">
        <div className="flex gap-4 overflow-x-auto pb-4 scrub-x">
          {clubs.map((club) => (
            <Link
              key={club.id}
              href={`/clubs/${club.slug}`}
              className="group shrink-0 flex flex-col items-center gap-2"
              style={
                {
                  "--club-color": club.primaryColor,
                } as React.CSSProperties
              }
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-zinc-200 group-hover:border-[var(--club-color)] transition-all duration-300 group-hover:scale-110 shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-zinc-100" />
                <Image src={club.crest} alt={club.name} width={80} height={80} className="relative z-10 object-contain p-2" />
              </div>
              <span className="text-xs font-medium text-zinc-700 group-hover:text-[var(--club-color)] transition-colors max-w-[80px] text-center line-clamp-2">
                {club.shortName || club.name}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* League Filter */}
      <Section title="Lọc theo giải đấu">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedLeague("all")}
            className={`chip cursor-pointer transition-all ${selectedLeague === "all" ? "bg-accent text-white" : "hover:border-accent"}`}
          >
            Tất cả ({clubs.length})
          </button>
          {leagues.map((league) => {
            const count = clubs.filter((c) => c.league === league).length;
            return (
              <button
                key={league}
                onClick={() => setSelectedLeague(league)}
                className={`chip cursor-pointer transition-all ${selectedLeague === league ? "bg-accent text-white" : "hover:border-accent"}`}
              >
                {league} ({count})
              </button>
            );
          })}
        </div>
      </Section>

      {/* Clubs Grid */}
      <Section title={selectedLeague === "all" ? "Tất cả câu lạc bộ" : selectedLeague}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </Section>
    </div>
  );
}


