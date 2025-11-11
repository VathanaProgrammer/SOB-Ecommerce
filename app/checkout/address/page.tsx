"use client";

import React, { useState } from "react";
import Header from "@/components/layouts/Header";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckOutContext";
import { Autocomplete } from "@react-google-maps/api";

type Address = {
  id?: number;
  label: string;
  details?: string;
  phone?: string;
  coordinates?: { lat: number; lng: number };
};

const savedAddresses: Address[] = [
  {
    id: 1,
    label: "Home",
    details: "123 Street 1928, Phnom Penh Thmei, Khan Sen Sok, Phnom Penh",
    phone: "012345678",
    coordinates: { lat: 11.567, lng: 104.928 },
  },
  {
    id: 2,
    label: "Work",
    details: "456 Street 2000, Sangkat Y, Khan Z, Phnom Penh",
    phone: "0987654321",
    coordinates: { lat: 11.560, lng: 104.920 },
  },
];

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " +
  "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

export default function AddressPage() {
  const router = useRouter();
  const { selectedAddress, setSelectedAddress, currentAddress, setCurrentAddress } = useCheckout();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const handleInputChange = (field: keyof Address, value: string) => {
    setCurrentAddress({ ...currentAddress, [field]: value });
  };

  const handlePlaceChanged = () => {
    if (!autocomplete) return;
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.formatted_address) return;

    setCurrentAddress({
      ...currentAddress,
      details: place.formatted_address,
      coordinates: {
        lat: place.geometry.location!.lat(),
        lng: place.geometry.location!.lng(),
      },
    });
  };

  const handleNext = () => {
    if (isAddingNew || selectedAddress === "current" || selectedAddress === null) {
      setSelectedAddress("current");
    }
    router.push("/checkout/payment");
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <Header title="Checkout" />
      <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto hide-scrollbar">

        {/* Not adding new */}
        {!isAddingNew && (
          <>
            <div
              onClick={() => setSelectedAddress("current")}
              className={`cursor-pointer border rounded-lg p-4 bg-white 
                  ${selectedAddress === "current" ? "border-blue-500" : "border-gray-300"}`}
            >
              <p className="font-medium text-gray-900">Use a New Address</p>

              {selectedAddress === "current" && (
                <div className="mt-4 grid grid-cols-1 gap-4">

                  <input
                    placeholder="Label (Home, Work)"
                    value={currentAddress.label}
                    onChange={(e) => handleInputChange("label", e.target.value)}
                    className={inputClass}
                  />

                  <input
                    placeholder="Phone"
                    value={currentAddress.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={inputClass}
                  />

                  <Autocomplete
                    onLoad={(auto) => setAutocomplete(auto)}
                    onPlaceChanged={handlePlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder="Search your address..."
                      className={inputClass}
                    />
                  </Autocomplete>

                  {currentAddress.details && (
                    <div className="p-2 bg-gray-100 rounded">{currentAddress.details}</div>
                  )}

                </div>
              )}
            </div>

            {/* Saved Addresses */}
            {savedAddresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => setSelectedAddress(addr)}
                className={`cursor-pointer border rounded-lg p-4 bg-white
                    ${selectedAddress === addr ? "border-blue-500" : "border-gray-300"}`}
              >
                <p className="font-medium text-gray-900">{addr.label}</p>
                <p className="text-gray-600 text-sm mt-1">{addr.details}</p>
                <p className="text-gray-600 text-sm mt-1">Phone: {addr.phone}</p>
              </div>
            ))}

            <button
              onClick={() => setIsAddingNew(true)}
              className="text-blue-600 font-medium hover:underline mt-2"
            >
              + Add New Address
            </button>
          </>
        )}

        {/* Next button for saved addresses */}
        {!isAddingNew && (
          <button
            onClick={handleNext}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium mt-2"
          >
            Next: Payment
          </button>
        )}
      </div>
    </div>
  );
}
