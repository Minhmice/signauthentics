import * as React from "react";
import { WireBox } from "@/components/ui/WireBox";

export function ProductCardSkeleton() {
  return (
    <div className="border border-dashed border-gray-400 rounded-md bg-gray-50 p-3 flex flex-col gap-2">
      <WireBox className="w-full aspect-[4/5] bg-gray-200">Product Image</WireBox>
      <WireBox className="h-6">Product Title</WireBox>
      <div className="grid grid-cols-2 gap-2">
        <WireBox className="h-6">Price</WireBox>
        <WireBox className="h-6">CTA</WireBox>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;


