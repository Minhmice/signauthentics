import * as React from "react";
import Image from "next/image";
import { formatDate } from "@/lib/ui/format";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  title: string;
  image: string;
  dateISO: string;
  excerpt: string;
};

export function ArticleCard({ title, image, dateISO, excerpt }: Props) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-[16/9]">
        <Image src={image} alt={title} fill sizes="(max-width:768px) 100vw, 400px" className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="text-xs text-muted-foreground">{formatDate(dateISO)}</div>
        <h3 className="mt-1 text-base font-semibold tracking-tight line-clamp-2">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
        <div className="mt-3 text-sm text-primary">Read →</div>
      </CardContent>
    </Card>
  );
}

export default ArticleCard;


