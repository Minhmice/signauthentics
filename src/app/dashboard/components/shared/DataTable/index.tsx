"use client";

/**
 * Enhanced Data Table Component với TanStack Table
 * Features: sorting, filtering, column visibility, pin, resize, pagination, row-select, bulk actions
 * Wrapper component theo shadcn pattern
 */

import * as React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { TableToolbar } from "./TableToolbar";
import { TablePagination } from "./TablePagination";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { BulkActionsBar } from "../BulkActionsBar";
import { TableContextMenu } from "../TableContextMenu";

interface BulkAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onClick: (selectedIds: string[]) => void;
  disabled?: boolean;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  searchKey?: string;
  showPagination?: boolean;
  showExport?: boolean;
  showColumnVisibility?: boolean;
  showBulkActions?: boolean;
  onExport?: (format: string, data: TData[]) => void;
  bulkActions?: BulkAction[];
  pageSize?: number;
  loading?: boolean;
  getRowId?: (row: TData) => string;
  onRowView?: (row: TData) => void;
  onRowEdit?: (row: TData) => void;
  onRowDelete?: (row: TData) => void;
  onRowDuplicate?: (row: TData) => void;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchKey,
  showPagination = true,
  showExport = true,
  showColumnVisibility = true,
  showBulkActions = true,
  onExport,
  bulkActions = [],
  pageSize = 10,
  loading = false,
  getRowId,
  onRowView,
  onRowEdit,
  onRowDelete,
  onRowDuplicate,
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [contextMenu, setContextMenu] = React.useState<{
    isOpen: boolean;
    position: { x: number; y: number };
    rowData: TData | null;
  }>({
    isOpen: false,
    position: { x: 0, y: 0 },
    rowData: null,
  });

  // Add selection column if bulk actions are enabled
  const selectionColumn: ColumnDef<TData, TValue> = React.useMemo(
    () => ({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-zinc-600"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-zinc-600"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    []
  );

  const tableColumns = React.useMemo(() => {
    if (showBulkActions) {
      return [selectionColumn, ...columns];
    }
    return columns;
  }, [columns, selectionColumn, showBulkActions]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getRowId,
    enableRowSelection: showBulkActions,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  // Get selected rows data
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedIds = selectedRows.map(row => getRowId ? getRowId(row.original) : row.id);

  // Notify parent when row selection changes
  React.useEffect(() => {
    if (onRowSelectionChange) {
      const selectedRowsData = selectedRows.map(row => row.original);
      onRowSelectionChange(selectedRowsData);
    }
  }, [selectedRows, onRowSelectionChange]);

  const handleClearSelection = () => {
    setRowSelection({});
  };

  const handleContextMenu = (e: React.MouseEvent, rowData: TData) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      rowData,
    });
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <TableToolbar
        table={table}
        searchPlaceholder={searchPlaceholder}
        searchKey={searchKey}
        showColumnVisibility={showColumnVisibility}
        showExport={showExport}
        onExport={onExport}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        selectedRows={selectedRows.map(row => row.original)}
        allData={data}
      />

      {/* Table */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <DataTableHeader table={table} />
              <DataTableBody 
                table={table} 
                loading={loading}
                onContextMenu={handleContextMenu}
              />
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Context Menu */}
      <TableContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={() => setContextMenu(prev => ({ ...prev, isOpen: false }))}
        onView={contextMenu.rowData && onRowView ? () => onRowView(contextMenu.rowData!) : undefined}
        onEdit={contextMenu.rowData && onRowEdit ? () => onRowEdit(contextMenu.rowData!) : undefined}
        onDelete={contextMenu.rowData && onRowDelete ? () => onRowDelete(contextMenu.rowData!) : undefined}
        onDuplicate={contextMenu.rowData && onRowDuplicate ? () => onRowDuplicate(contextMenu.rowData!) : undefined}
      />

      {/* Pagination */}
      <TablePagination
        table={table}
        showPagination={showPagination}
        selectedRowsCount={selectedRows.length}
      />

      {/* Bulk Actions Bar */}
      {showBulkActions && selectedRows.length > 0 && (
        <BulkActionsBar
          selectedCount={selectedRows.length}
          selectedIds={selectedIds}
          onClearSelection={handleClearSelection}
          actions={bulkActions}
        />
      )}
    </div>
  );
}
