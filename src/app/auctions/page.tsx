"use client";
import Section from "@/components/ui/Section";
import AuctionCard from "@/components/cards/AuctionCard";
import { auctions } from "@/lib/mock/auctions";
import { products } from "@/lib/mock/products";
import { useState } from "react";
import { Filter } from "lucide-react";

export default function AuctionsPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | "live" | "upcoming" | "ended">("all");

  const filteredAuctions = statusFilter === "all" ? auctions : auctions.filter((a) => a.status === statusFilter);

  // Get product for each auction
  const auctionsWithProducts = filteredAuctions.map((auction) => ({
    auction,
    product: products.find((p) => p.id === auction.productId) ?? products[0],
  }));

  const liveCount = auctions.filter((a) => a.status === "live").length;
  const upcomingCount = auctions.filter((a) => a.status === "upcoming").length;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <Section>
        <div className="relative w-full aspect-[21/7] rounded-2xl overflow-hidden bg-gradient-to-br from-orange-900 to-red-700">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1200')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
            <h1 className="text-5xl font-bold mb-4">Đấu giá</h1>
            <p className="text-xl text-orange-100 max-w-2xl mb-6">Tham gia đấu giá để sở hữu những món đồ lưu niệm độc nhất vô nhị</p>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>{liveCount} phiên đang diễn ra</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span>{upcomingCount} phiên sắp diễn ra</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Filters */}
      <Section title="Lọc theo trạng thái">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-4 h-4 text-zinc-500" />
          <button
            onClick={() => setStatusFilter("all")}
            className={`chip cursor-pointer transition-all ${statusFilter === "all" ? "bg-accent text-white" : "hover:border-accent"}`}
          >
            Tất cả ({auctions.length})
          </button>
          <button
            onClick={() => setStatusFilter("live")}
            className={`chip cursor-pointer transition-all ${statusFilter === "live" ? "bg-green-500 text-white" : "hover:border-green-500"}`}
          >
            <span className="w-2 h-2 rounded-full bg-current inline-block mr-1" />
            Đang diễn ra ({liveCount})
          </button>
          <button
            onClick={() => setStatusFilter("upcoming")}
            className={`chip cursor-pointer transition-all ${statusFilter === "upcoming" ? "bg-orange-500 text-white" : "hover:border-orange-500"}`}
          >
            Sắp diễn ra ({upcomingCount})
          </button>
          <button
            onClick={() => setStatusFilter("ended")}
            className={`chip cursor-pointer transition-all ${statusFilter === "ended" ? "bg-zinc-500 text-white" : "hover:border-zinc-500"}`}
          >
            Đã kết thúc ({auctions.filter((a) => a.status === "ended").length})
          </button>
        </div>
      </Section>

      {/* Auctions Grid */}
      <Section title={statusFilter === "all" ? "Tất cả phiên đấu giá" : statusFilter === "live" ? "Đang diễn ra" : statusFilter === "upcoming" ? "Sắp diễn ra" : "Đã kết thúc"}>
        {auctionsWithProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {auctionsWithProducts.map(({ auction, product }) => (
              <AuctionCard key={auction.id} auction={auction} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-zinc-500">Không có phiên đấu giá nào</div>
        )}
      </Section>

      {/* Trending - Horizontal Scroll */}
      {statusFilter === "all" && liveCount > 0 && (
        <Section title="Đấu giá HOT 🔥">
          <div className="flex gap-4 overflow-x-auto pb-4 scrub-x">
            {auctionsWithProducts
              .filter(({ auction }) => auction.status === "live")
              .map(({ auction, product }) => (
                <div key={auction.id} className="shrink-0 w-72">
                  <AuctionCard auction={auction} product={product} />
                </div>
              ))}
          </div>
        </Section>
      )}
    </div>
  );
}


