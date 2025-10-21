import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroMasthead() {
  return (
    <section className="relative h-[72vh] min-h-[480px] w-full overflow-hidden rounded-2xl">
      <Image src="/PlayerImages/QuangHai.jpeg" alt="Hero" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-screen-2xl mx-auto w-full px-4 md:px-6 pb-10">
          <div className="text-white max-w-2xl">
            <div className="eyebrow text-zinc-300">International football</div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">The home of official signed merchandise</h1>
            <div className="mt-5 flex gap-3">
              <Button className="min-w-36">Shop now</Button>
              <Button className="min-w-36">Browse collections</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


