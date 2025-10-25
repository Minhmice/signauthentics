"use client";

/**
 * Ban/Unban Customer Dialog
 * Dialog để ban hoặc unban customer với reason
 */

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Ban, Shield } from "lucide-react";
import type { Customer } from "@/lib/mock/db";

interface BanCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: Customer;
  onBan: (reason: string) => void;
  onUnban: () => void;
}

export function BanCustomerDialog({ open, onOpenChange, customer, onBan, onUnban }: BanCustomerDialogProps) {
  const [reason, setReason] = React.useState("");

  const isBanned = customer?.status === 'banned';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isBanned) {
      onUnban();
    } else {
      if (reason.trim()) {
        onBan(reason);
        setReason("");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isBanned ? (
              <>
                <Shield className="w-5 h-5 text-green-500" />
                Unban Customer
              </>
            ) : (
              <>
                <Ban className="w-5 h-5 text-red-500" />
                Ban Customer
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {isBanned 
              ? `Are you sure you want to unban ${customer?.name}? They will be able to access the platform again.`
              : `Are you sure you want to ban ${customer?.name}? This will prevent them from accessing the platform.`
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isBanned && (
            <div>
              <Label htmlFor="reason" className="text-zinc-300">
                Reason for banning (required)
              </Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter the reason for banning this customer..."
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
          )}

          {isBanned && customer?.bannedReason && (
            <div>
              <Label className="text-zinc-300">Current ban reason:</Label>
              <div className="p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300">
                {customer.bannedReason}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className={isBanned ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {isBanned ? "Unban Customer" : "Ban Customer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
