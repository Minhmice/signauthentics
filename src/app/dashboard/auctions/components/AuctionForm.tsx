"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { BaseForm, FormStepConfig } from "@/app/dashboard/components/forms/BaseForm";
import { Step0ProductSelection } from "./AuctionFormSteps/Step0ProductSelection";
import { Step1TimeSettings } from "./AuctionFormSteps/Step1TimeSettings";
import { Step2PricingSettings } from "./AuctionFormSteps/Step2PricingSettings";
import { Step3ReviewSummary } from "./AuctionFormSteps/Step3ReviewSummary";
import { SelectedProductsBanner } from "./SelectedProductsBanner";
import { VALIDATION_MESSAGES } from "@/lib/form-utils";
import * as z from "zod";

// Validation schema
const auctionFormSchema = z
  .object({
    productIds: z.array(z.string()).min(1, "Vui lòng chọn ít nhất 1 sản phẩm"),
    selectedProducts: z.array(z.any()).optional(),
    startAt: z.string().min(1, VALIDATION_MESSAGES.required),
    endAt: z.string().min(1, VALIDATION_MESSAGES.required),
    minIncrementVND: z.number().min(10000, VALIDATION_MESSAGES.min(10000)),
    status: z.enum(["upcoming", "live", "ended"]),
  })
  .refine((data) => {
    const startDate = new Date(data.startAt);
    const endDate = new Date(data.endAt);
    return endDate > startDate;
  }, {
    message: "End time must be after start time",
    path: ["endAt"],
  });

type AuctionFormData = z.infer<typeof auctionFormSchema>;

interface AuctionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auction?: {
    id: string;
    productId: string;
    productTitle: string;
    startAt: string;
    endAt: string;
    minIncrementVND: number;
    highestBidVND: number;
    highestBidderId?: string;
    highestBidderName?: string;
    biddersCount: number;
    status: string;
  };
  onSave?: (data: AuctionFormData) => void;
}

export function AuctionForm({ open, onOpenChange, auction, onSave }: AuctionFormProps) {
  const isEdit = !!auction;
  const [selectedProducts, setSelectedProducts] = React.useState<any[]>([]);
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleSubmit = async (data: AuctionFormData) => {
    try {
      await onSave?.(data);
      onOpenChange(false);
      toast.success(
        auction ? "Auction updated successfully!" : "Auction created successfully!"
      );
    } catch (error) {
      console.error("Error saving auction:", error);
      toast.error("Failed to save auction. Please try again.");
    }
  };

  const defaultValues: Partial<AuctionFormData> = {
    productIds: auction?.productId ? [auction.productId] : [],
    selectedProducts: [],
    startAt: auction?.startAt || "",
    endAt: auction?.endAt || "",
    minIncrementVND: auction?.minIncrementVND || 100000,
    status: (auction?.status as "upcoming" | "live" | "ended") || "upcoming",
  };

  // Handlers
  const handleProductSelection = (products: any[]) => {
    setSelectedProducts(products);
  };

  const handleEditSelection = () => {
    setCurrentStep(0);
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Sync selectedProducts with form state when form is available
  React.useEffect(() => {
    // This will be handled by the form steps
  }, []);

  // Step wrapper components
  const Step0Wrapper = ({ form }: { form: UseFormReturn<AuctionFormData> }) => (
    <Step0ProductSelection 
      form={form} 
      selectedProducts={selectedProducts}
      onProductsChange={setSelectedProducts}
      onNext={() => setCurrentStep(1)}
    />
  );
  const Step1Wrapper = ({ form }: { form: UseFormReturn<AuctionFormData> }) => <Step1TimeSettings form={form} />;
  const Step2Wrapper = ({ form }: { form: UseFormReturn<AuctionFormData> }) => <Step2PricingSettings form={form} />;
  const Step3Wrapper = ({ form }: { form: UseFormReturn<AuctionFormData> }) => <Step3ReviewSummary form={form} selectedProducts={selectedProducts} />;

  const steps: FormStepConfig<AuctionFormData>[] = [
    {
      id: "products",
      title: "Chọn sản phẩm",
      description: "Chọn sản phẩm để tạo đấu giá",
      component: Step0Wrapper,
    },
    {
      id: "time",
      title: "Thời gian đấu giá",
      description: "Thiết lập thời gian bắt đầu và kết thúc",
      component: Step1Wrapper,
    },
    {
      id: "pricing",
      title: "Cài đặt giá",
      description: "Thiết lập bước nhảy tối thiểu",
      component: Step2Wrapper,
    },
    {
      id: "review",
      title: "Xem lại",
      description: "Kiểm tra thông tin trước khi tạo",
      component: Step3Wrapper,
    },
  ];

  return (
    <BaseForm
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Chỉnh sửa đấu giá" : "Tạo đấu giá mới"}
      description={isEdit ? "Cập nhật thông tin đấu giá" : "Tạo đấu giá mới cho sản phẩm"}
      steps={steps}
      schema={auctionFormSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Cập nhật" : "Tạo mới"}
      allowStepNavigation={true}
      headerContent={
        selectedProducts.length > 0 ? (
          <SelectedProductsBanner
            selectedProducts={selectedProducts}
            onEditSelection={handleEditSelection}
            onRemoveProduct={handleRemoveProduct}
          />
        ) : null
      }
    />
  );
}
