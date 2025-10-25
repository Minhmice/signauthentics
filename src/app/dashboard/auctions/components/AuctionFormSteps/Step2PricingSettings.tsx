"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { FieldTooltip } from "@/app/dashboard/components/forms/shared/FieldTooltip";
import { AnimatedSection, AnimatedField } from "@/app/dashboard/components/forms/shared/FormAnimations";
import { 
  DollarSign,
  TrendingUp,
  Calculator
} from "lucide-react";

interface Step2PricingSettingsProps {
  form: UseFormReturn<any>;
}

export function Step2PricingSettings({ form }: Step2PricingSettingsProps) {
  const minIncrement = form.watch("minIncrementVND") as number || 0;

  return (
    <AnimatedSection>
      <FormSection
        title="Cài đặt giá"
        description="Thiết lập giá khởi điểm và bước nhảy cho đấu giá"
        icon={DollarSign}
      >
        <div className="space-y-6">
          {/* Minimum Increment */}
          <AnimatedField>
            <FormField
              control={form.control}
              name="minIncrementVND"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-200">
                    Bước nhảy tối thiểu (VND) *
                    <FieldTooltip content="Số tiền tối thiểu mà người đấu giá phải tăng thêm" />
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <Input
                        {...field}
                        type="number"
                        placeholder="100000"
                        value={field.value as number || ""}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AnimatedField>

          {/* Pricing Info */}
          <AnimatedField>
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-zinc-300">Thông tin giá</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Bước nhảy tối thiểu:</span>
                  <span className="text-white font-medium">
                    {minIncrement.toLocaleString('vi-VN')} VND
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Giá khởi điểm:</span>
                  <span className="text-white font-medium">
                    Sẽ được lấy từ sản phẩm
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Phí đấu giá:</span>
                  <span className="text-white font-medium">
                    Miễn phí
                  </span>
                </div>
              </div>
            </div>
          </AnimatedField>

          {/* Tips */}
          <AnimatedField>
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="text-sm text-blue-200">
                  <div className="font-medium mb-1">Mẹo cài đặt giá:</div>
                  <ul className="space-y-1 text-blue-300">
                    <li>• Bước nhảy tối thiểu nên từ 10,000 - 100,000 VND</li>
                    <li>• Giá khởi điểm sẽ được lấy từ giá sản phẩm</li>
                    <li>• Đấu giá sẽ tự động kết thúc khi hết thời gian</li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedField>
        </div>
      </FormSection>
    </AnimatedSection>
  );
}
