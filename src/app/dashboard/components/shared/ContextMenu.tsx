"use client";

import * as React from "react";
import {
  ContextMenu as ContextMenuPrimitive,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
import { ContextMenuItems, ContextMenuAction } from "./ContextMenuItems";

interface ContextMenuProps {
  children: React.ReactNode;
  actions?: ContextMenuAction[];
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  className?: string;
}

export function ContextMenuWrapper({
  children,
  actions = [],
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  className,
}: ContextMenuProps) {
  return (
    <ContextMenuPrimitive>
      <ContextMenuTrigger asChild>
        <div className={cn("w-full", className)}>
          {children}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-zinc-900 border-zinc-700">
        <ContextMenuItems
          actions={actions}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      </ContextMenuContent>
    </ContextMenuPrimitive>
  );
}

export type { ContextMenuAction };
