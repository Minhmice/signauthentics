"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock, TrendingUp } from "lucide-react";
import { formatPrice } from "@/lib/ui/price";
import type { Auction } from "@/lib/mock/auctions";
import type { Product } from "@/lib/mock/products";

type Props = {
  auction: Auction;
  product: Product;
};

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - Date.now();
      if (difference > 0) {
        return {
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

export default function AuctionCard({ auction, product }: Props) {
  const timeLeft = useCountdown(auction.endAt);

  const statusColor = {
    live: "bg-green-500",
    upcoming: "bg-orange-500",
    ended: "bg-zinc-400",
  }[auction.status];

  const statusLabel = {
    live: "Đang diễn ra",
    upcoming: "Sắp diễn ra",
    ended: "Đã kết thúc",
  }[auction.status];

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] bg-card">
        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10">
          <div className={`${statusColor} text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5`}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {statusLabel}
          </div>
        </div>

        {/* Product Image */}
        <div className="relative aspect-square bg-muted">
          <Image src={product.images[0]} alt={product.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover" />
        </div>

        {/* Info */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">{product.title}</h3>

          {/* Current Bid */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Giá hiện tại</div>
              <div className="text-lg font-bold text-primary">{formatPrice(auction.highestBidVND, "VND")}</div>
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>

          {/* Countdown */}
          {auction.status === "live" && timeLeft && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted border border-border">
              <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">Kết thúc sau</div>
                <div className="flex items-center gap-1 text-sm font-mono font-semibold">
                  <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded">{String(timeLeft.hours).padStart(2, "0")}</span>
                  <span>:</span>
                  <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <span>:</span>
                  <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, "0")}</span>
                </div>
              </div>
            </div>
          )}

          {auction.status === "upcoming" && (
            <div className="text-xs text-muted-foreground text-center py-2">Bắt đầu: {new Date(auction.startAt).toLocaleString("vi-VN")}</div>
          )}

          {auction.status === "ended" && <div className="text-xs text-muted-foreground text-center py-2">Đã kết thúc</div>}
        </div>
      </div>
    </Link>
  );
}

