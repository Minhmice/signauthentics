"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { AddressInput } from "@/app/dashboard/components/forms/shared/AddressInput";

export function Step2Addresses() {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const shippingAddresses = watch("shippingAddresses") || [];

  const handleAddressesChange = (addresses: Array<{ id: string; label: string; fullAddress: string; isDefault: boolean }>) => {
    setValue("shippingAddresses", addresses);
  };

  return (
    <FormSection
      title="Shipping Addresses"
      description="Manage customer's shipping addresses"
    >
      <div className="space-y-4">
        <AddressInput
          addresses={shippingAddresses}
          onAddressesChange={handleAddressesChange}
        />
        {errors.shippingAddresses && (
          <p className="text-sm text-red-500">{errors.shippingAddresses.message as string}</p>
        )}
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Address Guidelines</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Customers can have multiple shipping addresses</li>
            <li>• One address can be set as default for quick checkout</li>
            <li>• Addresses are used for order delivery and billing</li>
            <li>• Ensure addresses are complete and accurate</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}