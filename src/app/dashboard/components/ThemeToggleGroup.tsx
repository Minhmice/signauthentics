"use client";

import * as React from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";

export function ThemeToggleGroup({ className }: { className?: string }) {
  const { dark, toggleDark } = useTheme();

  return (
    <ButtonGroup className={className}>
      <Button
        variant="outline"
        size="sm"
        aria-pressed={!dark}
        aria-label="Chế độ sáng"
        className={!dark ? "bg-accent text-accent-foreground" : ""}
        onClick={() => {
          if (dark) toggleDark();
        }}
      >
        Light
      </Button>
      <ButtonGroupSeparator />
      <Button
        variant="outline"
        size="sm"
        aria-pressed={dark}
        aria-label="Chế độ tối"
        className={dark ? "bg-accent text-accent-foreground" : ""}
        onClick={() => {
          if (!dark) toggleDark();
        }}
      >
        Dark
      </Button>
    </ButtonGroup>
  );
}
