"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
// Import schema from parent component
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { AnimatedSection, AnimatedField } from "@/app/dashboard/components/forms/shared/FormAnimations";
import { 
  Package, 
  Tag, 
  Star, 
  DollarSign, 
  BarChart3,
  FileText,
  Hash,
  CheckCircle,
  Image as ImageIcon
} from "lucide-react";

interface Step5ReviewSummaryProps {
  form: UseFormReturn<any>;
  images: Array<{ id: string; url: string; name: string }>;
}

export function Step5ReviewSummary({ form, images }: Step5ReviewSummaryProps) {
  const watchedData = form.watch();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "jersey": return "bg-blue-600/20 text-blue-400 border-blue-600/30";
      case "ball": return "bg-white/20 text-white border-white/30";
      case "photo": return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30";
      case "boots": return "bg-green-600/20 text-green-400 border-green-600/30";
      case "vietnam": return "bg-red-600/20 text-red-400 border-red-600/30";
      default: return "bg-zinc-600/20 text-zinc-400 border-zinc-600/30";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-600/20 text-gray-400 border-gray-600/30";
      case "rare": return "bg-blue-600/20 text-blue-400 border-blue-600/30";
      case "epic": return "bg-purple-600/20 text-purple-400 border-purple-600/30";
      case "legendary": return "bg-orange-600/20 text-orange-400 border-orange-600/30";
      default: return "bg-zinc-600/20 text-zinc-400 border-zinc-600/30";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <AnimatedSection>
      <FormSection
        title="Xem lại thông tin sản phẩm"
        description="Kiểm tra lại tất cả thông tin trước khi lưu"
        icon={CheckCircle}
      >
        <div className="space-y-6">
          {/* Basic Information Summary */}
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Package className="w-5 h-5" />
                Thông tin cơ bản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{watchedData.title as string}</h3>
                <p className="text-sm text-zinc-400">{watchedData.slug as string}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={getCategoryColor(watchedData.category as string)}>
                  {(watchedData.category as string)?.toUpperCase()}
                </Badge>
                <Badge className={getRarityColor(watchedData.rarity as string)}>
                  {(watchedData.rarity as string)?.toUpperCase()}
                </Badge>
                <Badge className={(watchedData.status as string) === "active" ? "bg-green-600/20 text-green-400 border-green-600/30" : "bg-red-600/20 text-red-400 border-red-600/30"}>
                  {(watchedData.status as string) === "active" ? "Hoạt động" : "Tạm dừng"}
                </Badge>
              </div>

              {(watchedData.playerId as string) && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-500">Cầu thủ:</span>
                  <span className="text-sm text-zinc-300">{watchedData.playerId as string}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing Summary */}
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Giá cả và tồn kho
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wide">Giá bán</span>
                  <p className="text-lg font-semibold text-white">{formatCurrency((watchedData.priceVND as number) || 0)}</p>
                </div>
                {(watchedData.originalPrice as number) && (watchedData.originalPrice as number) > 0 && (
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wide">Giá gốc</span>
                    <p className="text-sm text-zinc-400 line-through">{formatCurrency(watchedData.originalPrice as number)}</p>
                  </div>
                )}
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wide">Tồn kho</span>
                  <p className="text-sm text-zinc-200">{(watchedData.stock as number) || 0} sản phẩm</p>
                </div>
                {(watchedData.limitedQty as number) && (watchedData.limitedQty as number) > 0 && (
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wide">Giới hạn</span>
                    <p className="text-sm text-zinc-200">{watchedData.limitedQty as number} sản phẩm</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Media Summary */}
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Hình ảnh sản phẩm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-300">
                  {images.length} hình ảnh đã tải lên
                </span>
                {images.length > 0 && (
                  <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
                    Hoàn thành
                  </Badge>
                )}
              </div>
              {images.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {images.slice(0, 3).map((image, index) => (
                    <div key={image.id} className="w-16 h-16 rounded-lg overflow-hidden border border-zinc-700">
                      <img
                        src={image.url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {images.length > 3 && (
                    <div className="w-16 h-16 rounded-lg border border-zinc-700 flex items-center justify-center bg-zinc-800">
                      <span className="text-xs text-zinc-400">+{images.length - 3}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Description Summary */}
          {(watchedData.description as string) && (
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Mô tả sản phẩm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-300 line-clamp-3">
                  {watchedData.description as string}
                </p>
              </CardContent>
            </Card>
          )}

          {/* SEO Summary */}
          {((watchedData.metaTitle as string) || (watchedData.metaDescription as string) || (watchedData.keywords as string)) && (
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  Thông tin SEO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(watchedData.metaTitle as string) && (
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wide">Meta Title</span>
                    <p className="text-sm text-zinc-200">{watchedData.metaTitle as string}</p>
                  </div>
                )}
                {(watchedData.metaDescription as string) && (
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wide">Meta Description</span>
                    <p className="text-sm text-zinc-200 line-clamp-2">{watchedData.metaDescription as string}</p>
                  </div>
                )}
                {(watchedData.keywords as string) && (
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wide">Từ khóa</span>
                    <p className="text-sm text-zinc-200">{watchedData.keywords as string}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </FormSection>
    </AnimatedSection>
  );
}


