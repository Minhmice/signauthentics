import * as React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = { 
  name: string; 
  club: string; 
  headshot: string;
  slug: string;
};

export default function PlayerTile({ name, club, headshot, slug }: Props) {
  return (
    <Link href={`/players/${slug}`} className="block group">
      <div className="rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition group-hover:scale-[1.02] bg-card">
        <div className="relative aspect-square">
          <Image src={headshot} alt={name} fill sizes="(max-width:768px) 50vw, 300px" className="object-cover" />
        </div>
        <div className="p-3">
          <div className="text-sm text-muted-foreground">{club}</div>
          <div className="font-semibold tracking-tight">{name}</div>
        </div>
      </div>
    </Link>
  );
}


