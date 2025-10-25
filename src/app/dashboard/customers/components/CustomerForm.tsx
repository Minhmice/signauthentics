"use client";

import * as React from "react";
import { BaseForm } from "@/app/dashboard/components/forms/BaseForm";
import { CustomerFormSchema } from "@/lib/form-utils";
import { z } from "zod";
import { customersAPI, type Customer } from "@/lib/mock/db";
import { Step1BasicInfo } from "./CustomerFormSteps/Step1BasicInfo";
import { Step2Addresses } from "./CustomerFormSteps/Step2Addresses";
import { Step3Membership } from "./CustomerFormSteps/Step3Membership";
import { Step4Security } from "./CustomerFormSteps/Step4Security";
import { Step5ReviewSummary } from "./CustomerFormSteps/Step5ReviewSummary";

type CustomerFormData = z.infer<typeof CustomerFormSchema>;

interface CustomerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: Customer;
  onSuccess?: () => void;
  onCancel?: () => void;
  onSave?: (data: Record<string, unknown>) => Promise<void>;
  trigger?: React.ReactNode;
}

const steps = [
  { id: "basic", title: "Basic Information", description: "Name, email, and contact details", component: Step1BasicInfo },
  { id: "addresses", title: "Addresses", description: "Shipping and billing addresses", component: Step2Addresses },
  { id: "membership", title: "Membership", description: "Tier and loyalty settings", component: Step3Membership },
  { id: "security", title: "Security", description: "Password and account settings", component: Step4Security },
  { id: "review", title: "Review & Summary", description: "Review and save", component: Step5ReviewSummary },
];

export function CustomerForm({ open, onOpenChange, customer, onSuccess, onCancel, onSave, trigger }: CustomerFormProps) {
  const defaultValues = React.useMemo(() => {
    if (customer) {
      return {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        avatar: customer.avatar as string | null,
        shippingAddresses: customer.shippingAddresses || [],
        membershipTier: customer.membershipTier as "gold" | "silver" | "bronze" | "platinum",
        loyaltyPoints: customer.loyaltyPoints,
        status: customer.status as "active" | "inactive" | "banned",
        bannedReason: customer.bannedReason,
        lastLoginAt: customer.lastLoginAt ? new Date(customer.lastLoginAt) : undefined,
      };
    }
    return {
      name: "",
      email: "",
      phone: "",
      avatar: null,
      shippingAddresses: [],
      membershipTier: "bronze" as "gold" | "silver" | "bronze" | "platinum",
      loyaltyPoints: 0,
      status: "active" as "active" | "inactive" | "banned",
      bannedReason: null,
      lastLoginAt: undefined,
      createdAt: undefined,
    };
  }, [customer]);

  const handleSubmit = async (data: CustomerFormData) => {
    try {
      if (onSave) {
        await onSave(data);
      } else {
        if (customer) {
          await customersAPI.update(customer.id, data as Partial<Customer>);
        } else {
          await customersAPI.create(data as unknown as Omit<Customer, 'id'>);
        }
      }
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      onCancel?.();
    }
  };

  return (
    <>
      {trigger && (
        <div onClick={() => onOpenChange(true)} className="cursor-pointer">
          {trigger}
        </div>
      )}
      <BaseForm
        open={open}
        onOpenChange={handleOpenChange}
        schema={CustomerFormSchema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        steps={steps}
        title={customer ? "Edit Customer" : "Create New Customer"}
      />
    </>
  );
}
