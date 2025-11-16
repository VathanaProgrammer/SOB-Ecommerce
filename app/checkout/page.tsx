"use client";
import React from "react";
import Header from "@/components/layouts/Header";
import { useCheckout } from "@/context/CheckOutContext";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";

const CheckoutPage = () => {
  const { cart, total, updateItemQty } = useCheckout();
  const router = useRouter();



  console.log(cart)

  const handleNext = () => {
    router.push("/checkout/address");
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <Header title="Checkout" />

      <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
        {cart.length === 0 && <p>Your cart is empty</p>}
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gray-300 p-3 gap-3"
          >
            <img
              src={process.env.NEXT_PUBLIC_IMAGE_URL+item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-gray-600">
                ${item.price.toFixed(2)} x {item.qty} = $
                {(item.price * item.qty).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateItemQty(item.id, item.qty > 1 ? item.qty - 1 : 1)
                }
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="w-6 text-center">{item.qty}</span>
              <button
                onClick={() => updateItemQty(item.id, item.qty + 1)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 flex justify-between items-center font-semibold text-lg">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        onClick={handleNext}
        className="mt-auto w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Next: Address
      </button>
    </div>
  );
};

export default CheckoutPage;
