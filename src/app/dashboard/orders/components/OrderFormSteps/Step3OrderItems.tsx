"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

export function Step3OrderItems() {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const items = watch("items") || [];

  const addItem = () => {
    const newItems = [...items, { productId: "", name: "", quantity: 1, price: 0 }];
    setValue("items", newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_: unknown, i: number) => i !== index);
    setValue("items", newItems);
  };

  const updateItem = (index: number, field: string, value: unknown) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setValue("items", newItems);
  };

  return (
    <FormSection
      title="Order Items"
      description="Products and quantities for this order"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Order Items</h3>
          <Button type="button" onClick={addItem} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No items added yet. Click &quot;Add Item&quot; to start.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item: { productId: string; quantity: number; priceVND: number }, index: number) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Item {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`item-${index}-productId`}>Product ID</Label>
                    <Input
                      id={`item-${index}-productId`}
                      value={item.productId}
                      onChange={(e) => updateItem(index, "productId", e.target.value)}
                      placeholder="Enter product ID"
                    />
                  </div>

            <div className="space-y-2">
              <Label htmlFor={`item-${index}-name`}>Product Name</Label>
              <Input
                id={`item-${index}-name`}
                value={item.productId}
                onChange={(e) => updateItem(index, "productId", e.target.value)}
                placeholder="Enter product ID"
              />
            </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`item-${index}-quantity`}>Quantity</Label>
                    <Input
                      id={`item-${index}-quantity`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 1)}
                      placeholder="Enter quantity"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`item-${index}-price`}>Price (VND)</Label>
                    <Input
                      id={`item-${index}-price`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.priceVND}
                      onChange={(e) => updateItem(index, "priceVND", parseFloat(e.target.value) || 0)}
                      placeholder="Enter price in VND"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {errors.items && (
          <p className="text-sm text-red-500">{errors.items.message as string}</p>
        )}

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Item Guidelines</h4>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>• Product ID should match your inventory system</li>
            <li>• Product name should be descriptive and clear</li>
            <li>• Quantity must be a positive number</li>
            <li>• Price should be in your base currency</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}