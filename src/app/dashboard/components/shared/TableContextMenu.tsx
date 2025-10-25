"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { Eye, Edit, Trash2, Copy } from "lucide-react";

interface TableContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export function TableContextMenu({
  isOpen,
  position,
  onClose,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
}: TableContextMenuProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      const handleClickOutside = () => onClose();
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };

      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const menuContent = (
    <div
      className="fixed z-50 min-w-[160px] rounded-md border bg-zinc-900 border-zinc-800 p-1 shadow-md"
      style={{
        left: position.x,
        top: position.y,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {onView && (
        <button
          onClick={() => {
            onView();
            onClose();
          }}
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
      )}
      
      {onEdit && (
        <button
          onClick={() => {
            onEdit();
            onClose();
          }}
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
      )}
      
      {onDuplicate && (
        <button
          onClick={() => {
            onDuplicate();
            onClose();
          }}
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800"
        >
          <Copy className="w-4 h-4" />
          Duplicate
        </button>
      )}
      
      {(onView || onEdit || onDuplicate) && onDelete && <div className="my-1 h-px bg-zinc-700" />}
      
      {onDelete && (
        <button
          onClick={() => {
            onDelete();
            onClose();
          }}
          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-red-400 hover:bg-zinc-800"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      )}
    </div>
  );

  return createPortal(menuContent, document.body);
}
