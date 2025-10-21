"use client";

/**
 * Simple Tabs Component (Legacy)
 * Wrapper để maintain backward compatibility
 * Nếu cần features đầy đủ, dùng shadcn tabs từ "./tabs"
 */

import * as React from "react";

type Item = { id: string; label: string };

export default function Tabs({ 
  items, 
  value, 
  onValueChange 
}: { 
  items: Item[]; 
  value: string; 
  onValueChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800">
      {items.map((it) => (
        <button 
          key={it.id} 
          onClick={() => onValueChange(it.id)} 
          className={[
            "h-10 px-3 rounded-t-xl transition-colors",
            value === it.id 
              ? "bg-white border border-b-white dark:bg-zinc-900 dark:border-zinc-800 dark:border-b-zinc-950 text-zinc-900 dark:text-white" 
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
          ].join(" ")}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

