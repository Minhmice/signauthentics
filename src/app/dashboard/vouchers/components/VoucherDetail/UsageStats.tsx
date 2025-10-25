"use client";

import * as React from "react";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UsageStatsProps {
  voucher: {
    usageLimit: number;
    usedCount: number;
    userLimit?: number;
    validFrom: string;
    validTo: string;
  };
}

export function UsageStats({ voucher }: UsageStatsProps) {
  const usagePercentage = voucher.usageLimit > 0 
    ? (voucher.usedCount / voucher.usageLimit) * 100 
    : 0;

  const remainingUses = voucher.usageLimit - voucher.usedCount;
  const isNearLimit = usagePercentage >= 80;
  const isExpired = new Date(voucher.validTo) < new Date();

  const getUsageStatus = () => {
    if (isExpired) return "Expired";
    if (voucher.usedCount >= voucher.usageLimit) return "Fully Used";
    if (isNearLimit) return "Near Limit";
    return "Active";
  };

  const getUsageColor = () => {
    if (isExpired || voucher.usedCount >= voucher.usageLimit) return "bg-red-600";
    if (isNearLimit) return "bg-yellow-600";
    return "bg-green-600";
  };

  return (
    <div className="space-y-6">
      {/* Usage Overview */}
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Usage Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Usage Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-300">Usage Progress</span>
              <span className="text-white">
                {voucher.usedCount} / {voucher.usageLimit} uses
              </span>
            </div>
            <Progress 
              value={usagePercentage} 
              className="h-2"
            />
            <div className="flex justify-between text-xs text-zinc-400">
              <span>{Math.round(usagePercentage)}% used</span>
              <span>{remainingUses} remaining</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-300">Status:</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getUsageColor()}`}>
              {getUsageStatus()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Usage Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Usage */}
        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-zinc-300">Total Usage</p>
                <p className="text-2xl font-bold text-white">{voucher.usedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Limit */}
        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-zinc-300">Usage Limit</p>
                <p className="text-2xl font-bold text-white">{voucher.usageLimit}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Limit (if applicable) */}
      {voucher.userLimit && (
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white text-sm">Per User Limit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-zinc-300">Max uses per user</p>
                <p className="text-xl font-bold text-white">{voucher.userLimit}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validity Status */}
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Validity Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-zinc-300">Valid From:</span>
              <span className="text-sm text-white">
                {new Date(voucher.validFrom).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-300">Valid To:</span>
              <span className="text-sm text-white">
                {new Date(voucher.validTo).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-300">Status:</span>
              <span className={`text-sm font-medium ${
                isExpired ? "text-red-400" : "text-green-400"
              }`}>
                {isExpired ? "Expired" : "Active"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
