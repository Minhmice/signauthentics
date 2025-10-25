"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight
} from "lucide-react";
import { Table } from "@tanstack/react-table";

interface TablePaginationProps<TData> {
  table: Table<TData>;
  showPagination?: boolean;
  selectedRowsCount: number;
}

export function TablePagination<TData>({
  table,
  showPagination = true,
  selectedRowsCount,
}: TablePaginationProps<TData>) {
  if (!showPagination) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-zinc-500">
        Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
        {Math.min(
          (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
          table.getFilteredRowModel().rows.length
        )}{" "}
        of {table.getFilteredRowModel().rows.length} entries
        {selectedRowsCount > 0 && (
          <span className="ml-2 text-blue-400">
            ({selectedRowsCount} selected)
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800"
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm text-zinc-400">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
