"use client";

import * as React from "react";
import Image from "next/image";

type Props = {
  images: string[];
};

export default function ProductGallery({ images }: Props) {
  const [active, setActive] = React.useState(0);
  return (
    <div className="grid grid-cols-5 gap-3">
      <div className="col-span-4 relative aspect-square rounded-2xl overflow-hidden bg-zinc-100">
        <Image key={active} src={images[active]} alt="product" fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        {images.slice(0, 5).map((src, i) => (
          <button key={i} onClick={() => setActive(i)} className={["relative aspect-square rounded-xl overflow-hidden border", i === active ? "border-[var(--accent)]" : "border-zinc-200"].join(" ")}> 
            <Image src={src} alt="thumb" fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}


