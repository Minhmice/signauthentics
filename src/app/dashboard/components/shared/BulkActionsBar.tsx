"use client";

/**
 * Bulk Actions Bar Component
 * Hiển thị khi có items được selected
 */

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Trash2, Edit, Download, MoreHorizontal } from "lucide-react";

interface BulkAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onClick: (selectedIds: string[]) => void;
}

interface BulkActionsBarProps {
  selectedCount: number;
  selectedIds?: string[];
  actions?: BulkAction[];
  onClearSelection: () => void;
  className?: string;
}

export function BulkActionsBar({
  selectedCount,
  selectedIds = [],
  actions = [],
  onClearSelection,
  className,
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className={cn(
      "flex items-center justify-between p-3 bg-zinc-800 border border-zinc-700 rounded-lg mb-4",
      className
    )}>
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="bg-blue-600 text-white">
          {selectedCount} selected
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant || "outline"}
            size="sm"
            onClick={() => action.onClick(selectedIds)}
            className="bg-zinc-700 border-zinc-600 text-zinc-200 hover:bg-zinc-600"
          >
            {action.icon && <span className="mr-1">{action.icon}</span>}
            {action.label}
          </Button>
        ))}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="text-zinc-400 hover:text-white hover:bg-zinc-700"
        >
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}