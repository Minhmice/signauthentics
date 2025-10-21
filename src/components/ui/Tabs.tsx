"use client";

import * as React from "react";

type Item = { id: string; label: string };

export default function Tabs({ items, value, onValueChange }: { items: Item[]; value: string; onValueChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800">
      {items.map((it) => (
        <button key={it.id} onClick={() => onValueChange(it.id)} className={["h-10 px-3 rounded-t-xl", value === it.id ? "bg-white border border-b-white dark:bg-zinc-900" : "text-zinc-600 hover:text-zinc-900"].join(" ")}>{it.label}</button>
      ))}
    </div>
  );
}


