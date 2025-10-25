"use client";

/**
 * Reset Password Dialog
 * Dialog để reset password cho customer và hiển thị temp password
 */

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Copy, Check } from "lucide-react";
import type { Customer } from "@/lib/mock/db";

interface ResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: Customer;
  onConfirm: () => void;
}

export function ResetPasswordDialog({ open, onOpenChange, customer, onConfirm }: ResetPasswordDialogProps) {
  const [tempPassword, setTempPassword] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const handleReset = async () => {
    onConfirm();
    // Generate a temporary password (in real app, this would come from the API)
    const tempPass = Math.random().toString(36).slice(-8);
    setTempPassword(tempPass);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(tempPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-blue-500" />
            Reset Password
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Reset password for {customer?.name}. A temporary password will be generated.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!tempPassword ? (
            <div className="text-center py-4">
              <p className="text-zinc-300 mb-4">
                Are you sure you want to reset the password for {customer?.name}?
              </p>
              <p className="text-sm text-zinc-400">
                A temporary password will be generated and can be shared with the customer.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="text-zinc-300">Temporary Password Generated:</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    value={tempPassword}
                    readOnly
                    className="bg-zinc-800 border-zinc-700 text-white font-mono"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                <p className="text-sm text-blue-300">
                  <strong>Important:</strong> Share this temporary password with the customer. 
                  They should change it on their next login.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
            {tempPassword ? "Close" : "Cancel"}
          </Button>
          {!tempPassword && (
            <Button onClick={handleReset} className="bg-blue-600 hover:bg-blue-700">
              Generate Password
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
