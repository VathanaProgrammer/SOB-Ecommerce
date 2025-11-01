"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Address = {
  id: number;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  postal: string;
};

interface ShippingStepProps {
  savedAddresses: Address[];
}

const ShippingStep: React.FC<ShippingStepProps> = ({ savedAddresses }) => {
  const [selected, setSelected] = useState<Address | "current" | null>(null);
  const router = useRouter();

  const handleNext = () => {
    if (!selected) return;

    // You can pass selected address via query if needed
    // router.push(`/checkout/payment?address=${selected === 'current' ? 'current' : selected.id}`);
    
    // Or just navigate to payment page
    router.push("/checkout/payment");
  };

  return (
    <div className="flex flex-col gap-6 mt-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Choose Shipping Address
      </h2>

      {/* Current location */}
      <div
        onClick={() => setSelected("current")}
        className={`cursor-pointer border rounded-xl p-5 flex items-center justify-between transition-shadow duration-200 ${
          selected === "current"
            ? "border-blue-500 bg-blue-50 shadow-lg"
            : "border-gray-200 hover:shadow-md"
        }`}
      >
        <div>
          <p className="font-semibold text-gray-700">Use Current Location</p>
          <p className="text-sm text-gray-500">Detected automatically via GPS</p>
        </div>
        {selected === "current" && (
          <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
        )}
      </div>

      {/* Saved addresses */}
      <div className="flex flex-col gap-4">
        {savedAddresses.map((addr) => (
          <div
            key={addr.id}
            onClick={() => setSelected(addr)}
            className={`cursor-pointer border rounded-xl p-5 flex justify-between items-center transition-shadow duration-200 ${
              selected && selected !== "current" && selected.id === addr.id
                ? "border-blue-500 bg-blue-50 shadow-lg"
                : "border-gray-200 hover:shadow-md"
            }`}
          >
            <div>
              <p className="font-semibold text-gray-700">{addr.label}</p>
              <p className="text-sm text-gray-500">
                {addr.line1}
                {addr.line2 ? `, ${addr.line2}` : ""}
              </p>
              <p className="text-sm text-gray-500">
                {addr.city}, {addr.postal}
              </p>
            </div>
            {selected && selected !== "current" && selected.id === addr.id && (
              <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      <button
        disabled={!selected}
        onClick={handleNext}
        className={`mt-6 px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
          selected ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Next: Payment
      </button>
    </div>
  );
};

export default ShippingStep;
