"use client";

import * as React from "react";
import { BaseForm } from "@/app/dashboard/components/forms/BaseForm";
import { UserFormSchema } from "@/lib/form-utils";
import { z } from "zod";
import { usersAPI, type User } from "@/lib/mock/db";
import { Step1BasicInfo } from "@/app/dashboard/users/components/UserFormSteps/Step1BasicInfo";
import { Step2Password } from "@/app/dashboard/users/components/UserFormSteps/Step2Password";
import { Step3EmployeeInfo } from "@/app/dashboard/users/components/UserFormSteps/Step3EmployeeInfo";
import { Step4EmergencyContact } from "@/app/dashboard/users/components/UserFormSteps/Step4EmergencyContact";
import { Step5Permissions } from "@/app/dashboard/users/components/UserFormSteps/Step5Permissions";
import { Step6Settings } from "@/app/dashboard/users/components/UserFormSteps/Step6Settings";

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
  onSuccess?: () => void;
  onCancel?: () => void;
  onSave?: (data: Record<string, unknown>) => Promise<void>;
}

const steps = [
  { id: "basic-info", title: "Basic Information", description: "Personal details and contact information", component: Step1BasicInfo as any },
  { id: "password", title: "Password", description: "Set up password and security", component: Step2Password as any },
  { id: "employee-info", title: "Employee Information", description: "Work details and department", component: Step3EmployeeInfo as any },
  { id: "emergency-contact", title: "Emergency Contact", description: "Emergency contact information", component: Step4EmergencyContact as any },
  { id: "permissions", title: "Permissions", description: "Role and access permissions", component: Step5Permissions as any },
  { id: "settings", title: "Settings", description: "Account preferences and settings", component: Step6Settings as any },
];

export function UserForm({ open, onOpenChange, user, onSuccess, onCancel, onSave }: UserFormProps) {
  const [firstName, lastName] = user?.name ? user.name.split(' ') : ['', ''];
  const defaultValues: z.infer<typeof UserFormSchema> = {
    firstName: firstName || "",
    lastName: lastName || "",
    email: user?.email || "",
    phone: "",
    avatar: user?.avatar || null,
    role: (user?.role as "admin" | "manager" | "employee" | "user") || "user",
    department: user?.department || "",
    position: "",
    employeeId: "",
    hireDate: undefined,
    salary: 0,
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    permissions: [],
    isActive: user?.status === "active",
    lastLoginAt: user?.lastLoginAt ? new Date(user.lastLoginAt) : undefined,
    createdAt: undefined,
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      if (onSave) {
        await onSave(data);
      } else {
        if (user) {
          await usersAPI.update(user.id, data as unknown as Partial<User>);
        } else {
          await usersAPI.create(data as unknown as Omit<User, 'id'>);
        }
      }
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <BaseForm
      open={open}
      onOpenChange={onOpenChange}
      title={user ? "Edit User" : "Create User"}
      description={user ? "Update user information" : "Add a new user to the system"}
      steps={steps}
      defaultValues={defaultValues}
      schema={UserFormSchema}
      onSubmit={handleSubmit}
    />
  );
}
