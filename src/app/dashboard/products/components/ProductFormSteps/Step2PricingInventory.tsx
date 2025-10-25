"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
// Import schema from parent component
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
import { DollarSign, Package, BarChart3, TrendingUp } from "lucide-react";

interface Step2PricingInventoryProps {
  form: UseFormReturn<Record<string, unknown>>;
}

export function Step2PricingInventory({ form }: Step2PricingInventoryProps) {
  return (
    <AnimatedSection>
      <FormSection
        title="Giá cả và tồn kho"
        description="Cấu hình giá bán và quản lý tồn kho"
        icon={DollarSign}
      >
        <div className="space-y-6">
          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedField>
              <FormField
                control={form.control}
                name="priceVND"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      Giá bán (VND) *
                      <FieldTooltip content="Giá bán sản phẩm bằng VND" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          {...field}
                          type="number"
                          placeholder="0"
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

            <AnimatedField>
              <FormField
                control={form.control}
                name="originalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      Giá gốc (VND)
                      <FieldTooltip content="Giá gốc trước khi giảm giá" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          {...field}
                          type="number"
                          placeholder="0"
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
          </div>

          {/* Inventory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedField>
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      Số lượng tồn kho *
                      <FieldTooltip content="Số lượng sản phẩm hiện có trong kho" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          {...field}
                          type="number"
                          placeholder="0"
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

            <AnimatedField>
              <FormField
                control={form.control}
                name="limitedQty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      Số lượng giới hạn
                      <FieldTooltip content="Số lượng tối đa có thể bán (0 = không giới hạn)" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          {...field}
                          type="number"
                          placeholder="0"
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
          </div>

          {/* Inventory Settings */}
          <AnimatedField>
            <FormField
              control={form.control}
              name="trackInventory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-200">
                    Theo dõi tồn kho
                    <FieldTooltip content="Tự động cập nhật số lượng khi có đơn hàng" />
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.value as boolean}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-blue-600"
                      />
                      <Label className="text-sm text-zinc-300">
                        {field.value ? "Bật" : "Tắt"}
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AnimatedField>
        </div>
      </FormSection>
    </AnimatedSection>
  );
}


