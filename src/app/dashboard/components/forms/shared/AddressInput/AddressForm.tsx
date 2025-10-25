"use client";

import * as React from "react";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { VIETNAM_PROVINCES, VIETNAM_DISTRICTS } from "@/lib/form-utils";

export interface Address {
  id: string;
  label: string;
  fullAddress: string;
  street?: string;
  ward?: string;
  district?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  isDefault: boolean;
}

interface AddressFormProps {
  address: Omit<Address, 'id'>;
  onAddressChange: (address: Omit<Address, 'id'>) => void;
  onSave: () => void;
  onCancel: () => void;
  isEditing?: boolean;
  className?: string;
}

export function AddressForm({
  address,
  onAddressChange,
  onSave,
  onCancel,
  isEditing = false,
  className,
}: AddressFormProps) {
  const [selectedCity, setSelectedCity] = React.useState(address.city || '');
  const [selectedDistrict, setSelectedDistrict] = React.useState(address.district || '');

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict('');
    onAddressChange({
      ...address,
      city,
      district: '',
      ward: '',
    });
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    onAddressChange({
      ...address,
      district,
      ward: '',
    });
  };

  const handleFieldChange = (field: keyof Omit<Address, 'id'>, value: string | boolean) => {
    onAddressChange({
      ...address,
      [field]: value,
    });
  };

  const isFormValid = address.label && address.street && address.city;

  return (
    <Card className={cn("bg-zinc-800 border-zinc-700", className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">
              {isEditing ? "Edit Address" : "Add New Address"}
            </h3>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Label */}
            <div className="md:col-span-2">
              <Label htmlFor="label" className="text-zinc-300">
                Address Label *
              </Label>
              <Input
                id="label"
                placeholder="Home, Office, etc."
                value={address.label}
                onChange={(e) => handleFieldChange('label', e.target.value)}
                className="bg-zinc-700 border-zinc-600 text-white"
              />
            </div>

            {/* Full Address */}
            <div className="md:col-span-2">
              <Label htmlFor="fullAddress" className="text-zinc-300">
                Full Address *
              </Label>
              <Input
                id="fullAddress"
                placeholder="123 Main Street, Ward 1, District 1, HCMC"
                value={address.fullAddress}
                onChange={(e) => handleFieldChange('fullAddress', e.target.value)}
                className="bg-zinc-700 border-zinc-600 text-white"
              />
            </div>

            {/* Street Address */}
            <div className="md:col-span-2">
              <Label htmlFor="street" className="text-zinc-300">
                Street Address
              </Label>
              <Input
                id="street"
                placeholder="123 Main Street"
                value={address.street || ''}
                onChange={(e) => handleFieldChange('street', e.target.value)}
                className="bg-zinc-700 border-zinc-600 text-white"
              />
            </div>

            {/* City */}
            <div>
              <Label htmlFor="city" className="text-zinc-300">
                City/Province *
              </Label>
              <Select value={selectedCity} onValueChange={handleCityChange}>
                <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {VIETNAM_PROVINCES.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District */}
            <div>
              <Label htmlFor="district" className="text-zinc-300">
                District
              </Label>
              <Select 
                value={selectedDistrict} 
                onValueChange={handleDistrictChange}
                disabled={!selectedCity}
              >
                <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {selectedCity && VIETNAM_DISTRICTS[selectedCity as keyof typeof VIETNAM_DISTRICTS]?.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Ward */}
            <div>
              <Label htmlFor="ward" className="text-zinc-300">
                Ward
              </Label>
              <Input
                id="ward"
                placeholder="Ward name"
                value={address.ward || ''}
                onChange={(e) => handleFieldChange('ward', e.target.value)}
                className="bg-zinc-700 border-zinc-600 text-white"
              />
            </div>

            {/* Postal Code */}
            <div>
              <Label htmlFor="postalCode" className="text-zinc-300">
                Postal Code
              </Label>
              <Input
                id="postalCode"
                placeholder="100000"
                value={address.postalCode || ''}
                onChange={(e) => handleFieldChange('postalCode', e.target.value)}
                className="bg-zinc-700 border-zinc-600 text-white"
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-zinc-300">
                Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="+84 123 456 789"
                value={address.phone || ''}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                className="bg-zinc-700 border-zinc-600 text-white"
              />
            </div>

            {/* Default Address */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={address.isDefault}
                  onChange={(e) => handleFieldChange('isDefault', e.target.checked)}
                  className="rounded border-zinc-600 bg-zinc-700 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="isDefault" className="text-zinc-300 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Set as default address
                </Label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="text-zinc-300 border-zinc-600 hover:bg-zinc-700"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onSave}
              disabled={!isFormValid}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isEditing ? "Update Address" : "Add Address"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
