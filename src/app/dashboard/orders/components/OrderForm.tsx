"use client";

import * as React from "react";
import { BaseForm } from "@/app/dashboard/components/forms/BaseForm";
import { OrderFormSchema } from "@/lib/form-utils";
import { z } from "zod";

type OrderFormData = z.infer<typeof OrderFormSchema>;
import { ordersAPI, type Order } from "@/lib/mock/db";
import { Step1OrderDetails } from "./OrderFormSteps/Step1OrderDetails";
import { Step2CustomerInfo } from "./OrderFormSteps/Step2CustomerInfo";
import { Step3OrderItems } from "./OrderFormSteps/Step3OrderItems";
import { Step4PaymentShipping } from "./OrderFormSteps/Step4PaymentShipping";
import { Step5ReviewSummary } from "./OrderFormSteps/Step5ReviewSummary";

interface OrderFormProps {
  order?: Order;
  onSuccess?: () => void;
  onCancel?: () => void;
  trigger?: React.ReactNode;
}

const steps = [
  { id: "details", title: "Order Details", description: "Basic order information", component: Step1OrderDetails },
  { id: "customer", title: "Customer Info", description: "Customer and shipping details", component: Step2CustomerInfo },
  { id: "items", title: "Order Items", description: "Products and quantities", component: Step3OrderItems },
  { id: "payment", title: "Payment & Shipping", description: "Payment and shipping options", component: Step4PaymentShipping },
  { id: "review", title: "Review & Summary", description: "Review and save order", component: Step5ReviewSummary },
];

export function OrderForm({ order, onSuccess, onCancel, trigger }: OrderFormProps) {
  const [open, setOpen] = React.useState(false);
  const defaultValues = React.useMemo(() => {
    if (order) {
      return {
        orderId: order.orderId,
        buyerId: order.buyerId,
        buyerName: order.buyerName,
        buyerEmail: order.buyerEmail,
        shippingAddress: order.shippingAddress,
        items: order.items || [],
        subtotal: order.subtotal,
        shipping: order.shipping,
        discount: order.discount,
        total: order.total,
        paymentMethod: order.paymentMethod as "credit_card" | "bank_transfer" | "cash_on_delivery" | "paypal",
        paymentStatus: order.paymentStatus as "pending" | "paid" | "failed" | "refunded",
        fulfillmentStatus: order.fulfillmentStatus as "pending" | "processing" | "shipped" | "delivered" | "cancelled",
        createdAt: order.createdAt,
      };
    }
    return {
      orderId: "",
      buyerId: "",
      buyerName: "",
      buyerEmail: "",
      shippingAddress: { name: "", address: "", city: "", phone: "" },
      items: [],
      subtotal: 0,
      shipping: 0,
      discount: 0,
      total: 0,
      paymentMethod: "credit_card" as "credit_card" | "bank_transfer" | "cash_on_delivery" | "paypal",
      paymentStatus: "pending" as "pending" | "paid" | "failed" | "refunded",
      fulfillmentStatus: "pending" as "pending" | "processing" | "shipped" | "delivered" | "cancelled",
      createdAt: undefined,
    };
  }, [order]);

  const handleSubmit = async (data: OrderFormData) => {
    try {
      if (order) {
        await ordersAPI.update(order.id, data);
      } else {
        await ordersAPI.create(data);
      }
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      onCancel?.();
    }
  };

  return (
    <>
      {trigger && (
        <div onClick={() => setOpen(true)} className="cursor-pointer">
          {trigger}
        </div>
      )}
      <BaseForm
        open={open}
        onOpenChange={handleOpenChange}
        schema={OrderFormSchema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        steps={steps}
        title={order ? "Edit Order" : "Create New Order"}
      />
    </>
  );
}