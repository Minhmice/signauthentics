"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AddressForm, Address } from "./AddressForm";
import { AddressList } from "./AddressList";

interface AddressInputProps {
  addresses: Address[];
  onAddressesChange: (addresses: Address[]) => void;
  className?: string;
}

export function AddressInput({ 
  addresses, 
  onAddressesChange, 
  className 
}: AddressInputProps) {
  const [editingAddress, setEditingAddress] = React.useState<Address | null>(null);
  const [newAddress, setNewAddress] = React.useState<Omit<Address, 'id'>>({
    label: '',
    fullAddress: '',
    street: '',
    ward: '',
    district: '',
    city: '',
    postalCode: '',
    phone: '',
    isDefault: addresses.length === 0, // First address is default
  });

  const addAddress = () => {
    if (!newAddress.label || !newAddress.fullAddress) {
      return;
    }

    const address: Address = {
      ...newAddress,
      id: `addr-${Date.now()}`,
    };

    const updatedAddresses = [...addresses, address];
    
    // If this is the first address or marked as default, set it as default
    if (address.isDefault || addresses.length === 0) {
      updatedAddresses.forEach(addr => {
        addr.isDefault = addr.id === address.id;
      });
    }

    onAddressesChange(updatedAddresses);
    setNewAddress({
      label: '',
      fullAddress: '',
      street: '',
      ward: '',
      district: '',
      city: '',
      postalCode: '',
      phone: '',
      isDefault: false,
    });
  };

  const updateAddress = () => {
    if (!editingAddress || !editingAddress.label || !editingAddress.fullAddress) {
      return;
    }

    const updatedAddresses = addresses.map(addr => 
      addr.id === editingAddress.id ? editingAddress : addr
    );

    // If this address is marked as default, unset others
    if (editingAddress.isDefault) {
      updatedAddresses.forEach(addr => {
        addr.isDefault = addr.id === editingAddress.id;
      });
    }

    onAddressesChange(updatedAddresses);
    setEditingAddress(null);
  };

  const deleteAddress = (id: string) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    
    // If we deleted the default address, set the first remaining as default
    if (updatedAddresses.length > 0 && !updatedAddresses.some(addr => addr.isDefault)) {
      updatedAddresses[0].isDefault = true;
    }

    onAddressesChange(updatedAddresses);
  };

  const setDefaultAddress = (id: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    }));
    onAddressesChange(updatedAddresses);
  };

  const startEditing = (address: Address) => {
    setEditingAddress({ ...address });
  };

  const cancelEditing = () => {
    setEditingAddress(null);
  };

  const handleNewAddressChange = (address: Omit<Address, 'id'>) => {
    setNewAddress(address);
  };

  const handleEditingAddressChange = (address: Omit<Address, 'id'>) => {
    if (editingAddress) {
      setEditingAddress({ ...address, id: editingAddress.id });
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Address List */}
      <AddressList
        addresses={addresses}
        onEdit={startEditing}
        onDelete={deleteAddress}
        onSetDefault={setDefaultAddress}
        onAddNew={() => setEditingAddress({ ...newAddress, id: 'new' })}
      />

      {/* Add/Edit Form */}
      {editingAddress && (
        <AddressForm
          address={editingAddress.id === 'new' ? newAddress : editingAddress}
          onAddressChange={editingAddress.id === 'new' ? handleNewAddressChange : handleEditingAddressChange}
          onSave={editingAddress.id === 'new' ? addAddress : updateAddress}
          onCancel={cancelEditing}
          isEditing={editingAddress.id !== 'new'}
        />
      )}
    </div>
  );
}

export type { Address };
