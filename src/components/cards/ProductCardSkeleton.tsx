import * as React from "react";
import { WireBox } from "@/components/ui/WireBox";

export function ProductCardSkeleton() {
  return (
    <div className="border border-dashed border-gray-400 rounded-md bg-gray-50 p-3 flex flex-col gap-2">
      <WireBox label="Product Image" className="w-full aspect-[4/5] bg-gray-200" />
      <WireBox label="Product Title" className="h-6" />
      <div className="grid grid-cols-2 gap-2">
        <WireBox label="Price" className="h-6" />
        <WireBox label="CTA" className="h-6" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;


