"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Step4Security() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <FormSection
      title="Security & Account Status"
      description="Account security settings and ban information"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="bannedReason">Ban Reason (if applicable)</Label>
          <Textarea
            id="bannedReason"
            {...register("bannedReason")}
            placeholder="Enter reason for ban (leave empty if not banned)"
            rows={3}
          />
          {errors.bannedReason && (
            <p className="text-sm text-red-500">{errors.bannedReason.message as string}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lastLoginAt">Last Login</Label>
            <Input
              id="lastLoginAt"
              type="datetime-local"
              {...register("lastLoginAt", { valueAsDate: true })}
            />
            {errors.lastLoginAt && (
              <p className="text-sm text-red-500">{errors.lastLoginAt.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="createdAt">Account Created</Label>
            <Input
              id="createdAt"
              type="datetime-local"
              {...register("createdAt", { valueAsDate: true })}
            />
            {errors.createdAt && (
              <p className="text-sm text-red-500">{errors.createdAt.message as string}</p>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Security Guidelines</h4>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>• Only ban customers for serious violations</li>
            <li>• Provide clear reason for any account restrictions</li>
            <li>• Monitor login activity for security purposes</li>
            <li>• Keep account creation records for audit trails</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}
