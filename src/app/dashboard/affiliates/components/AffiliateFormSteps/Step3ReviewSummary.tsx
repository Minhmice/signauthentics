"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { AffiliateFormData } from "../AffiliateForm";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { AnimatedSection, AnimatedField } from "@/app/dashboard/components/forms/shared/FormAnimations";
import { 
  User,
  Percent,
  CheckCircle
} from "lucide-react";

interface Step3ReviewSummaryProps {
  form: UseFormReturn<AffiliateFormData>;
}

export function Step3ReviewSummary({ form }: Step3ReviewSummaryProps) {
  const formData = form.getValues();
  const name = formData.name as string;
  const email = formData.email as string;
  const phone = formData.phone as string;
  const company = formData.company as string;
  const website = formData.website as string;
  const commissionRate = formData.commissionRate as number;
  const status = formData.status as string;
  const notes = formData.notes as string;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'inactive': return 'text-red-500';
      default: return 'text-zinc-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Hoạt động';
      case 'inactive': return 'Tạm dừng';
      default: return status;
    }
  };

  return (
    <AnimatedSection>
      <FormSection
        title="Xem lại thông tin"
        description="Kiểm tra lại thông tin trước khi tạo đối tác"
        icon={CheckCircle}
      >
        <div className="space-y-6">
          {/* Basic Information */}
          <AnimatedField>
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-zinc-300">Thông tin cơ bản</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Tên đối tác:</span>
                  <span className="text-white font-medium">{name || "Chưa nhập"}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Email:</span>
                  <span className="text-white font-medium">{email || "Chưa nhập"}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Số điện thoại:</span>
                  <span className="text-white font-medium">{phone || "Chưa nhập"}</span>
                </div>
                
                {company && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Công ty:</span>
                    <span className="text-white font-medium">{company}</span>
                  </div>
                )}
                
                {website && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Website:</span>
                    <span className="text-white font-medium">{website}</span>
                  </div>
                )}
              </div>
            </div>
          </AnimatedField>

          {/* Commission Settings */}
          <AnimatedField>
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Percent className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-zinc-300">Cài đặt hoa hồng</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Tỷ lệ hoa hồng:</span>
                  <span className="text-white font-medium">
                    {commissionRate ? `${commissionRate}%` : "Chưa chọn"}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Trạng thái:</span>
                  <span className={`font-medium ${getStatusColor(status)}`}>
                    {getStatusText(status)}
                  </span>
                </div>
                
                {commissionRate > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Ví dụ (1M VND):</span>
                    <span className="text-white font-medium">
                      {(1000000 * commissionRate / 100).toLocaleString('vi-VN')} VND
                    </span>
                  </div>
                )}
              </div>
            </div>
          </AnimatedField>

          {/* Notes */}
          {notes && (
            <AnimatedField>
              <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-zinc-300">Ghi chú</span>
                </div>
                
                <div className="text-sm text-white">
                  {notes}
                </div>
              </div>
            </AnimatedField>
          )}

          {/* Summary */}
          <AnimatedField>
            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-200">
                  <div className="font-medium mb-1">Sẵn sàng tạo đối tác!</div>
                  <div className="text-green-300">
                    Đối tác affiliate sẽ được tạo với các thông tin trên. Bạn có thể chỉnh sửa sau khi tạo.
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
