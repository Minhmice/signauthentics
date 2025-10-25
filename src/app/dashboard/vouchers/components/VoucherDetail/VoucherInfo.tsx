"use client";

import * as React from "react";
import { Copy, Calendar, Tag, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/ui/price";
import { format } from "date-fns";
import { toast } from "sonner";

interface VoucherInfoProps {
  voucher: {
    id: string;
    code: string;
    type: string;
    value: number;
    scope: string;
    validFrom: string;
    validTo: string;
    status: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  };
  onEdit?: () => void;
}

export function VoucherInfo({ voucher, onEdit }: VoucherInfoProps) {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(voucher.code);
    toast.success("Voucher code copied to clipboard!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600 text-white";
      case "expired":
        return "bg-red-600 text-white";
      case "inactive":
        return "bg-gray-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "percent" ? "Percent" : "DollarSign";
  };

  const getTypeLabel = (type: string) => {
    return type === "percent" ? "Percentage" : "Fixed Amount";
  };

  const getScopeLabel = (scope: string) => {
    const scopeLabels: Record<string, string> = {
      all: "All Products",
      jersey: "Jerseys Only",
      ball: "Balls Only",
      photo: "Photos Only",
      boots: "Boots Only",
      vietnam: "Vietnam Products",
      custom: "Custom Scope",
    };
    return scopeLabels[scope] || scope;
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Voucher Information
            </CardTitle>
            <Badge className={getStatusColor(voucher.status)}>
              {voucher.status.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Code */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-300">Code:</span>
            <code className="px-2 py-1 bg-zinc-700 rounded text-white font-mono">
              {voucher.code}
            </code>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyCode}
              className="text-zinc-300 border-zinc-600 hover:bg-zinc-700"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          {/* Type & Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-zinc-300">Type:</span>
              <p className="text-white">{getTypeLabel(voucher.type)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-zinc-300">Value:</span>
              <p className="text-white">
                {voucher.type === "percent" 
                  ? `${voucher.value}%` 
                  : formatPrice(voucher.value)
                }
              </p>
            </div>
          </div>

          {/* Scope */}
          <div>
            <span className="text-sm font-medium text-zinc-300">Scope:</span>
            <p className="text-white">{getScopeLabel(voucher.scope)}</p>
          </div>

          {/* Description */}
          {voucher.description && (
            <div>
              <span className="text-sm font-medium text-zinc-300">Description:</span>
              <p className="text-white mt-1">{voucher.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Validity Period */}
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Validity Period
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-zinc-300">Valid From:</span>
              <p className="text-white flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {format(new Date(voucher.validFrom), "MMM dd, yyyy")}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-zinc-300">Valid To:</span>
              <p className="text-white flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {format(new Date(voucher.validTo), "MMM dd, yyyy")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timestamps */}
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-white">Timestamps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-zinc-300">Created:</span>
            <span className="text-sm text-white">
              {format(new Date(voucher.createdAt), "MMM dd, yyyy HH:mm")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-zinc-300">Updated:</span>
            <span className="text-sm text-white">
              {format(new Date(voucher.updatedAt), "MMM dd, yyyy HH:mm")}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      {onEdit && (
        <div className="flex justify-end">
          <Button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Edit Voucher
          </Button>
        </div>
      )}
    </div>
  );
}
