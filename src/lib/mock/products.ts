export type Product = {
  id: string;
  slug: string;
  title: string;
  playerId: string;
  category: string;
  rarity: "standard" | "limited" | "rare" | "ultra";
  limitedQty?: number;
  priceVND: number;
  accentHex: string;
  images: string[];
  relatedIds: string[];
};

export const products: Product[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `p${i + 1}`,
  slug: `product-${i + 1}`,
  title: `Signed Jersey #${i + 1}`,
  playerId: `pl${(i % 8) + 1}`,
  category: i % 2 ? "Shirt" : "Ball",
  rarity: ([("standard"), ("limited"), ("rare"), ("ultra")] as const)[i % 4],
  limitedQty: i % 3 === 0 ? 100 : undefined,
  priceVND: 4500000 + i * 250000,
  accentHex: ["#1E90FF", "#E11D48", "#16A34A", "#F59E0B"][i % 4],
  images: [
    "/PlayerImages/chandung22tuyenthu1.jpg",
    "/PlayerImages/chandung22tuyenthu2.jpg",
  ],
  relatedIds: [],
}));

products.forEach((p, i) => {
  p.relatedIds = products
    .filter((_, j) => j !== i)
    .slice(0, 6)
    .map((x) => x.id);
});


