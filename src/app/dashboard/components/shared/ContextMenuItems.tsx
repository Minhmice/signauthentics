"use client";

import * as React from "react";
import { Eye, Edit, Trash2, Copy } from "lucide-react";

export interface ContextMenuAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "destructive";
}

interface ContextMenuItemsProps {
  actions: ContextMenuAction[];
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export function ContextMenuItems({
  actions,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
}: ContextMenuItemsProps) {
  // Merge default actions with custom actions
  const allActions = React.useMemo(() => {
    const defaultActions: ContextMenuAction[] = [
      {
        id: "view",
        label: "View",
        icon: <Eye className="w-4 h-4" />,
        onClick: onView || (() => {}),
        disabled: !onView,
      },
      {
        id: "edit",
        label: "Edit",
        icon: <Edit className="w-4 h-4" />,
        onClick: onEdit || (() => {}),
        disabled: !onEdit,
      },
      {
        id: "duplicate",
        label: "Duplicate",
        icon: <Copy className="w-4 h-4" />,
        onClick: onDuplicate || (() => {}),
        disabled: !onDuplicate,
      },
      {
        id: "delete",
        label: "Delete",
        icon: <Trash2 className="w-4 h-4" />,
        onClick: onDelete || (() => {}),
        disabled: !onDelete,
        variant: "destructive",
      },
    ];

    // Filter out disabled default actions and merge with custom actions
    const enabledDefaultActions = defaultActions.filter(action => !action.disabled);
    const customActions = actions.filter(action => 
      !enabledDefaultActions.some(defaultAction => defaultAction.id === action.id)
    );

    return [...enabledDefaultActions, ...customActions];
  }, [actions, onView, onEdit, onDelete, onDuplicate]);

  return (
    <>
      {allActions.map((action, index) => (
        <React.Fragment key={action.id}>
          {index > 0 && action.variant === "destructive" && (
            <div className="my-1 h-px bg-zinc-700" />
          )}
          <button
            className={`
              flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors
              hover:bg-zinc-800 focus:bg-zinc-800 focus:outline-none
              ${action.disabled 
                ? "text-zinc-500 cursor-not-allowed" 
                : action.variant === "destructive"
                ? "text-red-400 hover:text-red-300"
                : "text-zinc-300 hover:text-white"
              }
            `}
            onClick={action.onClick}
            disabled={action.disabled}
          >
            {action.icon}
            {action.label}
          </button>
        </React.Fragment>
      ))}
    </>
  );
}
