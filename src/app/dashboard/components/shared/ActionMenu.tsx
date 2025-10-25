"use client";

/**
 * ActionMenu Component
 * DropdownMenu wrapper cho row actions
 */

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye, Copy, Archive } from "lucide-react";

interface ActionItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
}

interface ActionMenuProps {
  actions: ActionItem[];
  className?: string;
  size?: "sm" | "default" | "lg";
}

const defaultIconMap: Record<string, React.ReactNode> = {
  edit: <Edit className="w-4 h-4" />,
  delete: <Trash2 className="w-4 h-4" />,
  view: <Eye className="w-4 h-4" />,
  copy: <Copy className="w-4 h-4" />,
  archive: <Archive className="w-4 h-4" />,
};

export function ActionMenu({
  actions,
  className,
  size = "sm",
}: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={size}
          className={`h-8 w-8 p-0 hover:bg-zinc-800 ${className}`}
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-zinc-900 border-zinc-800 text-white"
        align="end"
      >
        {actions?.map((action, index) => (
          <React.Fragment key={action.id}>
            {action.separator && index > 0 && (
              <DropdownMenuSeparator className="bg-zinc-700" />
            )}
            <DropdownMenuItem
              onClick={action.onClick}
              disabled={action.disabled}
              className={cn(
                "text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer",
                action.destructive &&
                  "text-red-400 hover:text-red-300 hover:bg-red-900/20"
              )}
            >
              {action.icon || defaultIconMap[action.id]}
              <span className="ml-2">{action.label}</span>
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Helper function để tạo action items
export function createActionItems(
  onEdit?: () => void,
  onDelete?: () => void,
  onView?: () => void,
  onCopy?: () => void,
  onArchive?: () => void,
  customActions?: ActionItem[]
): ActionItem[] {
  const actions: ActionItem[] = [];

  if (onView) {
    actions.push({
      id: "view",
      label: "View",
      onClick: onView,
    });
  }

  if (onEdit) {
    actions.push({
      id: "edit",
      label: "Edit",
      onClick: onEdit,
    });
  }

  if (onCopy) {
    actions.push({
      id: "copy",
      label: "Copy",
      onClick: onCopy,
    });
  }

  if (onArchive) {
    actions.push({
      id: "archive",
      label: "Archive",
      onClick: onArchive,
    });
  }

  if (onDelete) {
    actions.push({
      id: "delete",
      label: "Delete",
      onClick: onDelete,
      destructive: true,
      separator: actions.length > 0,
    });
  }

  if (customActions) {
    actions.push(...customActions);
  }

  return actions;
}

// Import cn utility
import { cn } from "@/lib/utils";
