"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { AffiliateFormData } from "../AffiliateForm";
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
  User, 
  Mail,
  Phone,
  Building,
  Globe
} from "lucide-react";

interface Step1BasicInfoProps {
  form: UseFormReturn<AffiliateFormData>;
}

export function Step1BasicInfo({ form }: Step1BasicInfoProps) {
  return (
    <AnimatedSection>
      <FormSection
        title="Thông tin cơ bản"
        description="Thông tin liên hệ và công ty của đối tác"
        icon={User}
      >
        <div className="space-y-6">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedField>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      Tên đối tác *
                      <FieldTooltip content="Tên đầy đủ của đối tác affiliate" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          {...field}
                          value={field.value as string}
                          placeholder="Nhập tên đối tác"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      Email *
                      <FieldTooltip content="Email liên hệ của đối tác" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          {...field}
                          type="email"
                          value={field.value as string}
                          placeholder="email@example.com"
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

          {/* Phone and Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedField>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      Số điện thoại *
                      <FieldTooltip content="Số điện thoại liên hệ" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          {...field}
                          type="tel"
                          value={field.value as string}
                          placeholder="0123456789"
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
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      Công ty
                      <FieldTooltip content="Tên công ty (tùy chọn)" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          {...field}
                          value={field.value as string}
                          placeholder="Tên công ty"
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

          {/* Website */}
          <AnimatedField>
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-200">
                    Website
                    <FieldTooltip content="Website của đối tác (tùy chọn)" />
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <Input
                        {...field}
                        type="url"
                        value={field.value as string}
                        placeholder="https://example.com"
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
      </FormSection>
    </AnimatedSection>
  );
}
