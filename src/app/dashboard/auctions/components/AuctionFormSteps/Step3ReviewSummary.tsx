"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { AnimatedSection, AnimatedField } from "@/app/dashboard/components/forms/shared/FormAnimations";
import { 
  Package,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle
} from "lucide-react";
import { productsAPI } from "@/lib/mock/db";
import { formatPrice } from "@/lib/ui/price";

interface Step3ReviewSummaryProps {
  form: UseFormReturn<any>;
  selectedProducts: any[];
}

export function Step3ReviewSummary({ form, selectedProducts }: Step3ReviewSummaryProps) {
  const formData = form.getValues();
  const startAt = formData.startAt as string;
  const endAt = formData.endAt as string;
  const minIncrementVND = formData.minIncrementVND as number;
  const status = formData.status as string;

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-500';
      case 'live': return 'text-green-500';
      case 'ended': return 'text-red-500';
      default: return 'text-zinc-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Sắp diễn ra';
      case 'live': return 'Đang diễn ra';
      case 'ended': return 'Đã kết thúc';
      default: return status;
    }
  };

  return (
    <AnimatedSection>
      <FormSection
        title="Xem lại thông tin"
        description="Kiểm tra lại thông tin trước khi tạo đấu giá"
        icon={CheckCircle}
      >
        <div className="space-y-6">
          {/* Selected Products */}
          <AnimatedField>
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-zinc-300">
                  Sản phẩm đã chọn ({selectedProducts.length})
                </span>
              </div>
              
              <div className="space-y-3">
                {selectedProducts.map((product, index) => (
                  <div key={product.id} className="bg-zinc-700/50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-white font-medium">{product.title}</div>
                        <div className="text-sm text-zinc-400">{product.category}</div>
                        <div className="text-sm text-green-400 font-medium">
                          {formatPrice(product.priceVND, "VND")}
                        </div>
                      </div>
                      <div className="text-xs text-zinc-500">
                        #{index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedField>

          {/* Auction Timing */}
          <AnimatedField>
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-zinc-300">Thời gian đấu giá</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Bắt đầu:</span>
                  <span className="text-white font-medium">
                    {startAt ? formatDateTime(startAt) : "Chưa chọn"}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Kết thúc:</span>
                  <span className="text-white font-medium">
                    {endAt ? formatDateTime(endAt) : "Chưa chọn"}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Trạng thái:</span>
                  <span className={`font-medium ${getStatusColor(status)}`}>
                    {getStatusText(status)}
                  </span>
                </div>
              </div>
            </div>
          </AnimatedField>

          {/* Pricing Settings */}
          <AnimatedField>
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-zinc-300">Cài đặt giá</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Bước nhảy tối thiểu:</span>
                  <span className="text-white font-medium">
                    {minIncrementVND ? formatPrice(minIncrementVND, "VND") : "Chưa chọn"}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Giá khởi điểm:</span>
                  <span className="text-white font-medium">
                    Sẽ lấy từ giá sản phẩm
                  </span>
                </div>
              </div>
            </div>
          </AnimatedField>

          {/* Summary */}
          <AnimatedField>
            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-200">
                  <div className="font-medium mb-1">
                    Sẵn sàng tạo {selectedProducts.length} đấu giá!
                  </div>
                  <div className="text-green-300">
                    {selectedProducts.length === 1 
                      ? "Đấu giá sẽ được tạo cho sản phẩm đã chọn với các cài đặt trên."
                      : `${selectedProducts.length} đấu giá sẽ được tạo cho các sản phẩm đã chọn với cùng cài đặt thời gian và giá.`
                    }
                  </div>
                </div>
              </div>
            </div>
          </AnimatedField>
        </div>
      </FormSection>
    </AnimatedSection>
  );
}
