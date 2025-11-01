"use client";
import React from "react";
import Header from "@/components/layouts/Header";
import { useRouter } from "next/navigation";

const ReviewPage = () => {
  const router = useRouter();

  // Example data
  const shipping = {
    type: "saved",
    label: "Home",
    line1: "123 Main St",
    line2: "Apt 4B",
    city: "Phnom Penh",
    postal: "12000",
  };

  const payment = "Visa";

  const items = [
    {
      title: "Product 1",
      price: 25.99,
      qty: 2,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
    },
    {
      title: "Product 2",
      price: 40.99,
      qty: 1,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
    },
    {
      title: "Product 3",
      price: 15.99,
      qty: 3,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
    },
  ];

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="flex flex-col gap-6">
        <Header title="Checkout" />
      <h2 className="text-2xl font-bold text-gray-800 text-start">
        Review Your Order
      </h2>

      {/* Cart Items */}
      <div className="overflow-hidden flex flex-col">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between border-b border-gray-300 p-4 `}
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-md text-gray-500">x {item.qty}</p>
              </div>
            </div>
            <p className="font-semibold text-gray-800">
              ${(item.price * item.qty).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Shipping Address */}
      <div className=" flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg  text-gray-700">Shipping Address</p>
          <button
            className="text-blue-600 text-sm hover:underline"
            onClick={() => router.push("/checkout/shipping")}
          >
            Edit
          </button>
        </div>
        <div className="text-gray-500 text-sm space-y-1 border-b border-gray-300 pb-4">
          {shipping.type === "current" ? (
            <p>Using Current Location</p>
          ) : (
            <>
              <p className="text-m font-medium">{shipping.label}</p>
              <p className="text-m font-medium">
                {shipping.line1}
                {shipping.line2 ? `, ${shipping.line2}` : ""}
              </p>
              <p className="text-m font-medium">
                {shipping.city}, {shipping.postal}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Payment Method */}
      <div className="flex flex-col gap-3 border-b border-gray-300 pb-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg text-gray-700">Payment Method</p>
          <button
            className="text-blue-600 text-sm hover:underline"
            onClick={() => router.push("/checkout/payment")}
          >
            Edit
          </button>
        </div>
        <p className="text-gray-500 text-md font-medium">{payment}</p>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center rounded-xl font-semibold text-gray-800 text-lg">
        <p>Total</p>
        <p>${subtotal.toFixed(2)}</p>
      </div>

      {/* Place Order */}
      <button
        onClick={() => router.push("/checkout/success")}
        className="w-full mt-2 px-6 py-3 rounded-[5px] font-semibold text-white bg-gray-600 hover:bg-gray-700 shadow-lg transition-colors"
      >
        Place Order
      </button>
    </div>
  );
};

export default ReviewPage;
