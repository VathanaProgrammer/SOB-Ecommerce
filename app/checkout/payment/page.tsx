"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layouts/Header";

interface PaymentStepProps {
  onNext?: (method: string) => void; // optional
}

const paymentMethods = [
  {
    name: "Visa",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
  },
  {
    name: "MasterCard",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
  },
  {
    name: "PayPal",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  },
];

const PaymentStep: React.FC<PaymentStepProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  // Move handleNext here
  const handleNext = () => {
    if (!selected) return;

    // Optional: call onNext callback
    if (onNext) onNext(selected);

    // Navigate to review page
    router.push("/checkout/review");
  };

  const renderPaymentDetails = (method: string) => {
    if (method === "PayPal") {
      return (
        <p className="text-sm text-gray-500 mt-3">
          You will be redirected to PayPal to complete your payment.
        </p>
      );
    }

    return (
      <div className="flex flex-col gap-3 mt-3">
        <div className="relative">
          <input
            type="text"
            placeholder=" "
            className="peer w-full border border-gray-300 rounded-lg p-3 pt-5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
          />
          <label className="absolute left-3 top-1.5 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs">
            Card Number
          </label>
        </div>

        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder=" "
              className="peer w-full border border-gray-300 rounded-lg p-3 pt-5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            />
            <label className="absolute left-3 top-1.5 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs">
              MM/YY
            </label>
          </div>
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder=" "
              className="peer w-full border border-gray-300 rounded-lg p-3 pt-5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            />
            <label className="absolute left-3 top-1.5 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs">
              CVV
            </label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Header title="Checkout" />
      <h2 className="text-2xl font-semibold text-gray-800">
        Choose Payment Method
      </h2>

      <div className="flex flex-col gap-4">
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

      <button
        disabled={!selected}
        onClick={handleNext}
        className={`mt-6 px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
          selected
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Next: Review
      </button>
    </div>
  );
};

export default PaymentStep;
