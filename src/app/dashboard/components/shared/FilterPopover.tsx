"use client";

/**
 * FilterPopover Component
 * Reusable filter popover với các filter options
 */

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter as FilterIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  key: string;
  label: string;
  type: "text" | "select" | "checkbox" | "number" | "date";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface FilterPopoverProps {
  filters: FilterOption[];
  values: Record<string, unknown>;
  onValuesChange: (values: Record<string, unknown>) => void;
  onClear: () => void;
  className?: string;
}

export function FilterPopover({
  filters,
  values,
  onValuesChange,
  onClear,
  className,
}: FilterPopoverProps) {
  const [open, setOpen] = React.useState(false);

  const handleValueChange = (key: string, value: unknown) => {
    onValuesChange({ ...(values || {}), [key]: value });
  };

  const hasActiveFilters = values ? Object.values(values).some(value => 
    value !== undefined && value !== null && value !== "" && 
    (!Array.isArray(value) || value.length > 0)
  ) : false;

  const renderFilterInput = (filter: FilterOption) => {
    const value = values?.[filter.key];

    switch (filter.type) {
      case "text":
        return (
          <Input
            placeholder={filter.placeholder || `Filter by ${filter.label.toLowerCase()}`}
            value={(value as string) || ""}
            onChange={(e) => handleValueChange(filter.key, e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        );

      case "number":
        return (
          <Input
            type="number"
            placeholder={filter.placeholder || `Filter by ${filter.label.toLowerCase()}`}
            value={(value as string) || ""}
            onChange={(e) => handleValueChange(filter.key, e.target.value ? Number(e.target.value) : null)}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        );

      case "select":
        return (
          <Select
            value={(value as string) || "all"}
            onValueChange={(val) => handleValueChange(filter.key, val === "all" ? null : val)}
          >
            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder={filter.placeholder || `Select ${filter.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              <SelectItem value="all">All {filter.label}</SelectItem>
              {filter.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {filter.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${filter.key}-${option.value}`}
                  checked={Array.isArray(value) ? value.includes(option.value) : false}
                  onCheckedChange={(checked) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    if (checked) {
                      handleValueChange(filter.key, [...currentValues, option.value]);
                    } else {
                      handleValueChange(filter.key, currentValues.filter(v => v !== option.value));
                    }
                  }}
                />
                <Label
                  htmlFor={`${filter.key}-${option.value}`}
                  className="text-sm text-zinc-300"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );

      case "date":
        return (
          <Input
            type="date"
            value={(value as string) || ""}
            onChange={(e) => handleValueChange(filter.key, e.target.value || null)}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        );

      default:
        return null;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800",
            hasActiveFilters && "border-blue-500 text-blue-400",
            className
          )}
        >
          <FilterIcon className="w-4 h-4 mr-2" />
          Filter
          {hasActiveFilters && (
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded-full">
              {Object.values(values).filter(v => v !== undefined && v !== null && v !== "" && (!Array.isArray(v) || v.length > 0)).length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-zinc-900 border-zinc-800 text-white" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Filter Options</h4>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="text-zinc-400 hover:text-white h-auto p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className="space-y-4">
            {filters?.map((filter) => (
              <div key={filter.key} className="space-y-2">
                <Label className="text-sm font-medium text-zinc-300">
                  {filter.label}
                </Label>
                {renderFilterInput(filter)}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
