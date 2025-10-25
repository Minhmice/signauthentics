"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { AffiliateFormData } from "../AffiliateForm";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Percent,
  FileText,
  Tag
} from "lucide-react";

interface Step2CommissionSettingsProps {
  form: UseFormReturn<AffiliateFormData>;
}

export function Step2CommissionSettings({ form }: Step2CommissionSettingsProps) {
  const commissionRate = form.watch("commissionRate") as number || 0;

  return (
    <AnimatedSection>
      <FormSection
        title="Cài đặt hoa hồng"
        description="Thiết lập tỷ lệ hoa hồng và ghi chú cho đối tác"
        icon={Percent}
      >
        <div className="space-y-6">
          {/* Commission Rate */}
          <AnimatedField>
            <FormField
              control={form.control}
              name="commissionRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-200">
                    Tỷ lệ hoa hồng (%) *
                    <FieldTooltip content="Tỷ lệ hoa hồng mà đối tác sẽ nhận được từ mỗi giao dịch" />
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        placeholder="5.0"
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

          {/* Status */}
          <AnimatedField>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-200">
                    Trạng thái đối tác
                    <FieldTooltip content="Trạng thái hoạt động của đối tác" />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-zinc-500" />
                          <SelectValue placeholder="Chọn trạng thái" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                      <SelectItem value="active" className="hover:bg-zinc-800">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          Hoạt động
                        </div>
                      </SelectItem>
                      <SelectItem value="inactive" className="hover:bg-zinc-800">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          Tạm dừng
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AnimatedField>

          {/* Notes */}
          <AnimatedField>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-200">
                    Ghi chú
                    <FieldTooltip content="Ghi chú thêm về đối tác" />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value as string}
                      placeholder="Ghi chú về đối tác..."
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AnimatedField>

          {/* Commission Info */}
          <AnimatedField>
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Percent className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-zinc-300">Thông tin hoa hồng</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Tỷ lệ hoa hồng:</span>
                  <span className="text-white font-medium">
                    {commissionRate}%
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Ví dụ với đơn hàng 1,000,000 VND:</span>
                  <span className="text-white font-medium">
                    {(1000000 * commissionRate / 100).toLocaleString('vi-VN')} VND
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Thanh toán:</span>
                  <span className="text-white font-medium">
                    Hàng tháng
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
                  <div className="font-medium mb-1">Mẹo cài đặt hoa hồng:</div>
                  <ul className="space-y-1 text-blue-300">
                    <li>• Tỷ lệ hoa hồng thông thường: 3-10%</li>
                    <li>• Đối tác VIP có thể có tỷ lệ cao hơn</li>
                    <li>• Có thể điều chỉnh tỷ lệ sau khi tạo</li>
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
