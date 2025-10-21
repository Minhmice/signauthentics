import * as React from "react";
import { WireBox } from "@/components/ui/WireBox";

export function ArticleCardSkeleton() {
  return (
    <div className="border border-dashed border-gray-400 rounded-md bg-gray-50 p-3 flex flex-col gap-2">
      <WireBox label="Cover" className="w-full aspect-[16/9]" />
      <WireBox label="Title" className="h-6" />
      <WireBox label="Meta" className="h-5" />
    </div>
  );
}

export default ArticleCardSkeleton;


