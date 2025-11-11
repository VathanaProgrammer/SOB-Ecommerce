"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layouts/Header";

interface PaymentStepProps {
  onNext?: (method: string) => void;
}

const paymentMethods = [
  { name: "QR", image: "/qr.jpg" },
  { name: "Cash", image: "/cash.jpg" },
];

const PaymentStep: React.FC<PaymentStepProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => {
    if (!selected) return;
    if (onNext) onNext(selected);
    router.push("/checkout/review");
  };

  const renderPaymentDetails = (method: string) => {
    if (method === "QR") {
      return (
        <p className="text-sm text-gray-500 mt-3">
          Scan the QR code with your banking app to complete the payment.
        </p>
      );
    }
    if (method === "Cash") {
      return (
        <p className="text-sm text-gray-500 mt-3">
          You will pay with cash upon delivery.
        </p>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <Header title="Checkout" />
      <h2 className="text-2xl font-semibold text-gray-800">
        Choose Payment Method
      </h2>

      {/* Payment method list */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        {paymentMethods.map((method) => {
          const isSelected = selected === method.name;
          return (
            <div
              key={method.name}
              onClick={() => setSelected(method.name)}
              className={`cursor-pointer border rounded-xl p-5 flex flex-col gap-2 transition-shadow duration-200 ${
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-lg"
                  : "border-gray-200 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={method.image}
                  alt={method.name}
                  className="w-12 h-12 object-contain"
                />
                <p className="font-semibold text-gray-700">{method.name}</p>
              </div>
              {isSelected && renderPaymentDetails(method.name)}
            </div>
          );
        })}
      </div>

      {/* Next button pushed to bottom */}
      <div className="mt-auto">
        <button
          disabled={!selected}
          onClick={handleNext}
          className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
            selected
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Next: Review
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;
