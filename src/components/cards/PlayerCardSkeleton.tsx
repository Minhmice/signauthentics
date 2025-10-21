import * as React from "react";
import { WireBox } from "@/components/ui/WireBox";

export function PlayerCardSkeleton() {
  return (
    <div className="border border-dashed border-gray-400 rounded-md bg-gray-50 p-3 flex flex-col gap-2 items-center">
      <WireBox label="Player Photo" className="w-full aspect-square rounded-full" />
      <WireBox label="Player Name" className="h-6 w-full" />
    </div>
  );
}

export default PlayerCardSkeleton;


