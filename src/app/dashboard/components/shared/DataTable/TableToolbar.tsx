"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchBar } from "../SearchBar";
import { ExportButton } from "../ExportButton";
import { Table } from "@tanstack/react-table";

interface TableToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder?: string;
  searchKey?: string;
  showColumnVisibility?: boolean;
  showExport?: boolean;
  onExport?: (format: string, data: TData[]) => void;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  selectedRows: TData[];
  allData: TData[];
}

export function TableToolbar<TData>({
  table,
  searchPlaceholder = "Search...",
  searchKey,
  showColumnVisibility = true,
  showExport = true,
  onExport,
  globalFilter,
  onGlobalFilterChange,
  selectedRows,
  allData,
}: TableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* Search */}
      {searchKey && (
        <SearchBar
          placeholder={searchPlaceholder}
          value={globalFilter}
          onChange={onGlobalFilterChange}
          className="max-w-sm"
        />
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Column Visibility */}
        {showColumnVisibility && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800"
              >
                <Settings className="w-4 h-4 mr-2" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 border-zinc-800 text-white" align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="text-zinc-300 hover:text-white hover:bg-zinc-800"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Export */}
        {showExport && onExport && (
          <ExportButton
            data={selectedRows.length > 0 ? selectedRows : allData}
            onExport={(format, data) => onExport(format, data as TData[])}
          />
        )}
      </div>
    </div>
  );
}

