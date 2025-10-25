"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
// Import schema from parent component
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { 
  Package, 
  Tag, 
  Hash, 
  User, 
  Star, 
  Palette,
  DollarSign,
  BarChart3
} from "lucide-react";

interface Step1BasicDetailsProps {
  form: UseFormReturn<any>;
  images: Array<{ id: string; url: string; name: string }>;
  setImages: React.Dispatch<React.SetStateAction<Array<{ id: string; url: string; name: string }>>>;
}

export function Step1BasicDetails({
  form,
  images,
  setImages,
}: Step1BasicDetailsProps) {
  // const watchedCategory = form.watch("category");
  // const watchedRarity = form.watch("rarity");

  return (
    <AnimatedSection>
      <FormSection
        title="Thông tin cơ bản sản phẩm"
        description="Nhập thông tin cơ bản và phân loại sản phẩm"
        icon={Package}
      >
        <div className="space-y-6">
          {/* Product Name and Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedField>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      Tên sản phẩm *
                      <FieldTooltip content="Tên sản phẩm sẽ hiển thị trên website" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          {...field}
                          value={field.value as string}
                          placeholder="Nhập tên sản phẩm"
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
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      URL slug
                      <FieldTooltip content="URL thân thiện cho sản phẩm (tự động tạo từ tên)" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          {...field}
                          value={field.value as string}
                          placeholder="product-name"
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

          {/* Category and Rarity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedField>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      Danh mục *
                      <FieldTooltip content="Phân loại sản phẩm theo loại" />
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                      <FormControl>
                        <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-zinc-500" />
                            <SelectValue placeholder="Chọn danh mục" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                        <SelectItem value="jersey" className="hover:bg-zinc-800">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded"></div>
                            Áo đấu
                          </div>
                        </SelectItem>
                        <SelectItem value="ball" className="hover:bg-zinc-800">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-white rounded"></div>
                            Bóng đá
                          </div>
                        </SelectItem>
                        <SelectItem value="photo" className="hover:bg-zinc-800">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                            Ảnh ký
                          </div>
                        </SelectItem>
                        <SelectItem value="boots" className="hover:bg-zinc-800">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded"></div>
                            Giày đá bóng
                          </div>
                        </SelectItem>
                        <SelectItem value="vietnam" className="hover:bg-zinc-800">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded"></div>
                            Đội tuyển Việt Nam
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AnimatedField>

            <AnimatedField>
              <FormField
                control={form.control}
                name="rarity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      Độ hiếm *
                      <FieldTooltip content="Mức độ hiếm của sản phẩm" />
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                      <FormControl>
                        <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-zinc-500" />
                            <SelectValue placeholder="Chọn độ hiếm" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                        <SelectItem value="common" className="hover:bg-zinc-800">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gray-500 rounded"></div>
                            Thường
                          </div>
                        </SelectItem>
                        <SelectItem value="rare" className="hover:bg-zinc-800">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded"></div>
                            Hiếm
                          </div>
                        </SelectItem>
                        <SelectItem value="epic" className="hover:bg-zinc-800">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-500 rounded"></div>
                            Cực hiếm
                          </div>
                        </SelectItem>
                        <SelectItem value="legendary" className="hover:bg-zinc-800">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded"></div>
                            Huyền thoại
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AnimatedField>
          </div>

          {/* Player ID and Limited Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedField>
              <FormField
                control={form.control}
                name="playerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      ID cầu thủ
                      <FieldTooltip content="ID của cầu thủ liên quan đến sản phẩm" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          {...field}
                          value={field.value as string}
                          placeholder="player-001"
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

          {/* Price and Accent Color */}
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
                name="accentHex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      Màu chủ đạo
                      <FieldTooltip content="Màu chủ đạo của sản phẩm (hex code)" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          {...field}
                          value={field.value as string}
                          placeholder="#FF0000"
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

          {/* Description */}
          <AnimatedField>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-200">
                    Mô tả sản phẩm
                    <FieldTooltip content="Mô tả chi tiết về sản phẩm" />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value as string}
                      placeholder="Nhập mô tả chi tiết về sản phẩm..."
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[100px]"
                    />
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
                    Trạng thái sản phẩm
                    <FieldTooltip content="Trạng thái hiển thị của sản phẩm" />
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.value === "active"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "active" : "inactive")
                        }
                        className="data-[state=checked]:bg-green-600"
                      />
                      <Label className="text-sm text-zinc-300">
                        {field.value === "active" ? "Hoạt động" : "Tạm dừng"}
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


