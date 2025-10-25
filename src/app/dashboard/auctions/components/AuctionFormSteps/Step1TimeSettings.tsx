"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
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
  Calendar,
  Clock,
  Tag
} from "lucide-react";

interface Step1TimeSettingsProps {
  form: UseFormReturn<any>;
}

export function Step1TimeSettings({ form }: Step1TimeSettingsProps) {
  return (
    <AnimatedSection>
      <FormSection
        title="Thời gian đấu giá"
        description="Thiết lập thời gian bắt đầu và kết thúc đấu giá"
        icon={Clock}
      >
        <div className="space-y-6">
          {/* Start Time */}
          <AnimatedField>
            <FormField
              control={form.control}
              name="startAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-200">
                    Thời gian bắt đầu *
                    <FieldTooltip content="Thời gian bắt đầu đấu giá" />
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <Input
                        {...field}
                        type="datetime-local"
                        value={field.value as string}
                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AnimatedField>

          {/* End Time */}
          <AnimatedField>
            <FormField
              control={form.control}
              name="endAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-200">
                    Thời gian kết thúc *
                    <FieldTooltip content="Thời gian kết thúc đấu giá" />
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <Input
                        {...field}
                        type="datetime-local"
                        value={field.value as string}
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
                    Trạng thái đấu giá
                    <FieldTooltip content="Trạng thái ban đầu của đấu giá" />
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
                      <SelectItem value="upcoming" className="hover:bg-zinc-800">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded"></div>
                          Sắp diễn ra
                        </div>
                      </SelectItem>
                      <SelectItem value="live" className="hover:bg-zinc-800">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          Đang diễn ra
                        </div>
                      </SelectItem>
                      <SelectItem value="ended" className="hover:bg-zinc-800">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          Đã kết thúc
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AnimatedField>

          {/* Tips */}
          <AnimatedField>
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="text-sm text-blue-200">
                  <div className="font-medium mb-1">Mẹo thiết lập thời gian:</div>
                  <ul className="space-y-1 text-blue-300">
                    <li>• Thời gian đấu giá nên từ 24 giờ đến 7 ngày</li>
                    <li>• Trạng thái &quot;Sắp diễn ra&quot; sẽ tự động chuyển thành &quot;Đang diễn ra&quot;</li>
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
