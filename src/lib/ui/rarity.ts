export function rarityToBadge(rarity: string) {
  switch (rarity) {
    case "ultra":
      return { label: "Ultra", className: "bg-amber-100 text-amber-800 border-amber-200" };
    case "rare":
      return { label: "Rare", className: "bg-indigo-100 text-indigo-800 border-indigo-200" };
    case "limited":
      return { label: "Limited", className: "bg-emerald-100 text-emerald-800 border-emerald-200" };
    default:
      return { label: "Standard", className: "bg-zinc-100 text-zinc-700 border-zinc-200" };
  }
}

export function getRarityLabel(rarity: string): string {
  return rarityToBadge(rarity).label;
}
