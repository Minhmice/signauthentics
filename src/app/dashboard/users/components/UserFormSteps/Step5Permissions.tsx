"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Step5PermissionsProps {
  form: UseFormReturn<Record<string, unknown>>;
}

export function Step5Permissions({ form }: Step5PermissionsProps) {
  const { register, formState: { errors } } = form;

  const permissions = [
    { id: "read_users", label: "Read Users", description: "View user information" },
    { id: "write_users", label: "Write Users", description: "Create and edit users" },
    { id: "delete_users", label: "Delete Users", description: "Remove users from system" },
    { id: "read_products", label: "Read Products", description: "View product information" },
    { id: "write_products", label: "Write Products", description: "Create and edit products" },
    { id: "delete_products", label: "Delete Products", description: "Remove products from system" },
    { id: "read_orders", label: "Read Orders", description: "View order information" },
    { id: "write_orders", label: "Write Orders", description: "Create and edit orders" },
    { id: "read_customers", label: "Read Customers", description: "View customer information" },
    { id: "write_customers", label: "Write Customers", description: "Create and edit customers" },
    { id: "read_reports", label: "Read Reports", description: "Access reporting features" },
    { id: "admin_access", label: "Admin Access", description: "Full system administration" },
  ];

  return (
    <FormSection
      title="Permissions & Access"
      description="Set user role and access permissions"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="role">User Role *</Label>
          <Select {...register("role")}>
            <SelectTrigger>
              <SelectValue placeholder="Select user role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label>Permissions</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {permissions.map((permission) => (
              <div key={permission.id} className="flex items-start space-x-2">
                <Checkbox
                  id={permission.id}
                  {...register(`permissions.${permission.id}`)}
                />
                <div className="space-y-1">
                  <Label htmlFor={permission.id} className="text-sm font-medium">
                    {permission.label}
                  </Label>
                  <p className="text-xs text-gray-500">{permission.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Permission Guidelines</h4>
          <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
            <li>• <strong>Admin:</strong> Full system access and management</li>
            <li>• <strong>Manager:</strong> Department-level access and reporting</li>
            <li>• <strong>Employee:</strong> Standard operational access</li>
            <li>• <strong>User:</strong> Limited read-only access</li>
            <li>• Select specific permissions based on job requirements</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}
