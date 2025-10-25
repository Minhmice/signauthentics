"use client";

import * as React from "react";
import { MapPin, Edit, Trash2, Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Address } from "./AddressForm";

interface AddressListProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
  onAddNew: () => void;
  className?: string;
}

export function AddressList({
  addresses,
  onEdit,
  onDelete,
  onSetDefault,
  onAddNew,
  className,
}: AddressListProps) {
  if (addresses.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <MapPin className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-zinc-300 mb-2">
          No addresses added
        </h3>
        <p className="text-zinc-500 mb-4">
          Add your first address to get started
        </p>
        <Button
          onClick={onAddNew}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Address
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Add New Button */}
      <div className="flex justify-end">
        <Button
          onClick={onAddNew}
          variant="outline"
          className="text-zinc-300 border-zinc-600 hover:bg-zinc-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {/* Address List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <Card
            key={address.id}
            className={cn(
              "bg-zinc-800 border-zinc-700 hover:border-zinc-600 transition-colors",
              address.isDefault && "ring-2 ring-blue-500"
            )}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white">{address.label}</h4>
                    {address.isDefault && (
                      <Badge variant="secondary" className="bg-blue-600 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(address)}
                      className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(address.id)}
                      className="h-8 w-8 p-0 text-zinc-400 hover:text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Address Details */}
                <div className="space-y-1 text-sm text-zinc-300">
                  <p className="font-medium">{address.fullAddress}</p>
                  {address.street && <p>Street: {address.street}</p>}
                  {address.ward && <p>Ward: {address.ward}</p>}
                  {address.district && <p>District: {address.district}</p>}
                  {address.city && <p>City: {address.city}</p>}
                  {address.postalCode && <p>Postal Code: {address.postalCode}</p>}
                  {address.phone && <p>Phone: {address.phone}</p>}
                </div>

                {/* Set as Default Button */}
                {!address.isDefault && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSetDefault(address.id)}
                    className="w-full text-zinc-300 border-zinc-600 hover:bg-zinc-700"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Set as Default
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
