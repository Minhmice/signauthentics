"use client";

import * as React from "react";
import { flexRender, Table } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
}

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="border-b border-zinc-800">
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="text-left py-3 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wide"
            >
              {header.isPlaceholder ? null : (
                <div
                  className={cn(
                    "flex items-center gap-2",
                    header.column.getCanSort() && "cursor-pointer select-none"
                  )}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() && (
                    <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                  )}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
