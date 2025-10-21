import * as React from "react";
import Image from "next/image";
import { rarityToBadge } from "@/lib/ui/rarity";
import { formatEUR, formatVND, vndToEur } from "@/lib/ui/price";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  id: string;
  title: string;
  priceVND: number;
  images: string[];
  rarity: string;
  accentHex: string;
};

export function ProductCard({ id, title, priceVND, images, rarity, accentHex }: Props) {
  const badge = rarityToBadge(rarity);
  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-[4/5]">
        <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 2px ${accentHex}20` }} />
        <Image src={images[0]} alt={title} fill sizes="(max-width: 768px) 50vw, 300px" className="object-cover" />
        <span className={["chip absolute left-2 top-2 border", badge.className].join(" ")}>{badge.label}</span>
      </div>
      <CardContent>
        <div className="text-sm text-muted-foreground">#{id}</div>
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[15px] font-semibold">{formatVND(priceVND)}</span>
          <span className="text-xs text-muted-foreground">{formatEUR(vndToEur(priceVND))}</span>
        </div>
        <div className="mt-3">
          <Button className="min-w-36">Add to cart</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;


