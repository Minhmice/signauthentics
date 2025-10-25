import * as React from "react";
import { WireBox } from "@/components/ui/WireBox";

type TableSkeletonProps = {
  rows?: number;
  cols?: number;
};

export function TableSkeleton({ rows = 5, cols = 5 }: TableSkeletonProps) {
  return (
    <div className="w-full overflow-x-auto border border-dashed border-gray-400 rounded-md">
      <table className="w-full min-w-[640px] text-left">
        <thead className="bg-gray-100">
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="p-3 text-xs font-medium text-gray-600">
                <WireBox className="h-6">Header {i + 1}</WireBox>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r} className="border-t border-dashed border-gray-300">
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c} className="p-3">
                  <WireBox className="h-6">Cell</WireBox>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSkeleton;


