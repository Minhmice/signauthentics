"use client";

import * as React from "react";
import { flexRender, Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface DataTableBodyProps<TData> {
  table: Table<TData>;
  loading?: boolean;
  onContextMenu?: (e: React.MouseEvent, row: TData) => void;
}

export function DataTableBody<TData>({
  table,
  loading = false,
  onContextMenu,
}: DataTableBodyProps<TData>) {
  return (
    <tbody>
      {loading ? (
        <tr>
          <td colSpan={table.getAllColumns().length} className="h-24 text-center text-zinc-500">
            Loading...
          </td>
        </tr>
      ) : table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={cn(
              "border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors",
              row.getIsSelected() && "bg-zinc-800/30"
            )}
            data-state={row.getIsSelected() && "selected"}
            onContextMenu={onContextMenu ? (e) => onContextMenu(e, row.original) : undefined}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="py-3 px-4 text-sm text-zinc-200">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={table.getAllColumns().length} className="h-24 text-center text-zinc-500">
            No results found.
          </td>
        </tr>
      )}
    </tbody>
  );
}
