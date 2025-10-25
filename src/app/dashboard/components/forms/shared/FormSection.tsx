"use client";

import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  className?: string;
}

export function FormSection({
  title,
  icon: Icon,
  description,
  children,
  collapsible = false,
  defaultOpen = true,
  className,
}: FormSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const handleToggle = () => {
    if (collapsible) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Section Header */}
      <div
        className={cn(
          "flex items-center justify-between",
          collapsible && "cursor-pointer hover:bg-zinc-800/50 rounded-lg p-2 -m-2 transition-colors"
        )}
        onClick={handleToggle}
      >
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="flex-shrink-0">
              <Icon className="w-5 h-5 text-blue-400" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {description && (
              <p className="text-sm text-zinc-400 mt-1">{description}</p>
            )}
          </div>
        </div>
        {collapsible && (
          <div className="flex-shrink-0">
            {isOpen ? (
              <ChevronDown className="w-5 h-5 text-zinc-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-zinc-400" />
            )}
          </div>
        )}
      </div>

      {/* Section Content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          collapsible && !isOpen && "max-h-0 overflow-hidden opacity-0",
          collapsible && isOpen && "max-h-[2000px] opacity-100"
        )}
      >
        {children}
      </div>
    </div>
  );
}
