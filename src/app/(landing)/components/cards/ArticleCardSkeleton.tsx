import * as React from "react";
import { WireBox } from "@/components/ui/WireBox";

export function ArticleCardSkeleton() {
  return (
    <div className="border border-dashed border-gray-400 rounded-md bg-gray-50 p-3 flex flex-col gap-2">
      <WireBox className="w-full aspect-[16/9]">Cover</WireBox>
      <WireBox className="h-6">Title</WireBox>
      <WireBox className="h-5">Meta</WireBox>
    </div>
  );
}

export default ArticleCardSkeleton;


