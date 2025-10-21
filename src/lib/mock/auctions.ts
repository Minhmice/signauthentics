export type Auction = {
  id: string;
  productId: string;
  startAt: string; // ISO
  endAt: string; // ISO
  minIncrementVND: number;
  highestBidVND: number;
  status: "live" | "upcoming" | "ended";
};

const now = Date.now();

export const auctions: Auction[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `a${i + 1}`,
  productId: `p${(i % 12) + 1}`,
  startAt: new Date(now - 60 * 60 * 1000).toISOString(),
  endAt: new Date(now + (i + 1) * 60 * 60 * 1000).toISOString(),
  minIncrementVND: 100000,
  highestBidVND: 5000000 + i * 300000,
  status: i % 3 === 0 ? "upcoming" : i % 3 === 1 ? "live" : "ended",
}));


