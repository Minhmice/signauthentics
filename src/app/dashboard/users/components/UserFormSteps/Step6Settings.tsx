"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

interface Step6SettingsProps {
  form: UseFormReturn<Record<string, unknown>>;
}

export function Step6Settings({ form }: Step6SettingsProps) {
  const { register, formState: { errors } } = form;

  return (
    <FormSection
      title="Account Settings"
      description="Account preferences and status settings"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              {...register("isActive")}
            />
            <Label htmlFor="isActive">Active Account</Label>
          </div>
          <p className="text-sm text-gray-500">
            Inactive accounts cannot log in to the system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lastLoginAt">Last Login</Label>
            <Input
              id="lastLoginAt"
              type="datetime-local"
              {...register("lastLoginAt", { valueAsDate: true })}
              disabled
            />
            <p className="text-xs text-gray-500">
              Automatically updated when user logs in
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="createdAt">Account Created</Label>
            <Input
              id="createdAt"
              type="datetime-local"
              {...register("createdAt", { valueAsDate: true })}
              disabled
            />
            <p className="text-xs text-gray-500">
              Automatically set when account is created
            </p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Account Settings Guidelines</h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>• <strong>Active Status:</strong> Controls whether user can log in</li>
            <li>• <strong>Last Login:</strong> Shows when user last accessed the system</li>
            <li>• <strong>Account Created:</strong> Shows when the account was first created</li>
            <li>• Deactivate accounts for users who no longer need access</li>
            <li>• Monitor last login dates for security purposes</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}
