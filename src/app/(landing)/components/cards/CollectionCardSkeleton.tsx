import * as React from "react";
import { WireBox } from "@/components/ui/WireBox";

export function CollectionCardSkeleton() {
  return (
    <div className="border border-dashed border-gray-400 rounded-md bg-gray-50 p-3 flex flex-col gap-2">
      <WireBox className="w-full aspect-[16/9]">Collection Cover</WireBox>
      <WireBox className="h-6">Collection Title</WireBox>
    </div>
  );
}

export default CollectionCardSkeleton;


