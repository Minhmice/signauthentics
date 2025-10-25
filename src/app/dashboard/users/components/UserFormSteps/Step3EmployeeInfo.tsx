"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Step3EmployeeInfoProps {
  form: UseFormReturn<Record<string, unknown>>;
}

export function Step3EmployeeInfo({ form }: Step3EmployeeInfoProps) {
  const { register, formState: { errors } } = form;

  return (
    <FormSection
      title="Employee Information"
      description="Work details and department information"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID *</Label>
            <Input
              id="employeeId"
              {...register("employeeId")}
              placeholder="Enter employee ID"
            />
            {errors.employeeId && (
              <p className="text-sm text-red-500">{errors.employeeId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department *</Label>
            <Input
              id="department"
              {...register("department")}
              placeholder="Enter department"
            />
            {errors.department && (
              <p className="text-sm text-red-500">{errors.department.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Position *</Label>
          <Input
            id="position"
            {...register("position")}
            placeholder="Enter job position"
          />
          {errors.position && (
            <p className="text-sm text-red-500">{errors.position.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hireDate">Hire Date</Label>
            <Input
              id="hireDate"
              type="date"
              {...register("hireDate", { valueAsDate: true })}
            />
            {errors.hireDate && (
              <p className="text-sm text-red-500">{errors.hireDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              type="number"
              min="0"
              step="0.01"
              {...register("salary", { valueAsNumber: true })}
              placeholder="Enter salary amount"
            />
            {errors.salary && (
              <p className="text-sm text-red-500">{errors.salary.message}</p>
            )}
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Employee Guidelines</h4>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>• Employee ID should be unique and follow company format</li>
            <li>• Department should match existing organizational structure</li>
            <li>• Position should reflect the employee&apos;s current role</li>
            <li>• Hire date is used for calculating tenure and benefits</li>
            <li>• Salary information is confidential and secure</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}
