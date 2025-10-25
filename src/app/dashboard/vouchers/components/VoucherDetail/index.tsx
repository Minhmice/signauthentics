"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VoucherInfo } from "./VoucherInfo";
import { UsageStats } from "./UsageStats";

interface VoucherDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  voucher?: {
    id: string;
    code: string;
    type: string;
    value: number;
    scope: string;
    usageLimit: number;
    usedCount: number;
    userLimit?: number;
    validFrom: string;
    validTo: string;
    status: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  };
  onEdit?: () => void;
}

export function VoucherDetail({ 
  open, 
  onOpenChange, 
  voucher, 
  onEdit 
}: VoucherDetailProps) {
  if (!voucher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-4xl !max-h-[90vh] !w-[95vw] overflow-y-auto bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Voucher Details
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            View detailed information about this voucher
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <VoucherInfo voucher={voucher} onEdit={onEdit} />
          <UsageStats voucher={voucher} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
