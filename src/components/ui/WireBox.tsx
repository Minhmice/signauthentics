"use client";

import * as React from "react";

type WireBoxProps = React.PropsWithChildren<{
  label?: string;
  className?: string;
  centerLabel?: boolean;
}>;

export function WireBox({ label, className, centerLabel = true, children }: WireBoxProps) {
  return (
    <div
      className={
        [
          "relative border border-dashed border-gray-400 bg-gray-100 text-gray-600",
          "rounded-md",
          "min-h-20",
          className,
        ]
          .filter(Boolean)
          .join(" ")
      }
    >
      {centerLabel ? (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-medium uppercase tracking-wide">
          {label}
        </div>
      ) : (
        <div className="absolute top-1 left-2 text-[11px] text-gray-500 bg-gray-100 px-1">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

export default WireBox;


