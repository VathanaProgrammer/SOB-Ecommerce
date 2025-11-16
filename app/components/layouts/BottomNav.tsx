"use client";

import Icon from "../Icon";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckOutContext";
import { useState } from "react";

const BottomNav: React.FC = () => {
  const router = useRouter();
  const { total } = useCheckout(); // ✅ read from context
  const [activePage, setActivePage] = useState<"home" | "chat" | "order">("home");

  const formatPrice = (value: number) => {
    if (typeof value !== "number" || isNaN(value)) return "$0.00";
    return `$${value.toFixed(2)}`;
  };

  const iconColor = (page: "home" | "chat" | "order") =>
    activePage === page ? "#1E40AF" : "#6B7280"; // primary blue for active, gray for inactive

  return (
    <section className="flex items-center justify-between my-2">
      {/* Left: navigation icons */}
      <div className="flex items-center gap-4">
        <div
          onClick={() => {
            router.push("/");
            setActivePage("home");
          }}
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Icon
            icon="solar:home-2-linear"
            width={24}
            height={24}
            style={{ color: iconColor("home") }}
          />
          <p className="text-[13px] font-medium" style={{ color: iconColor("home") }}>
            Home
          </p>
        </div>

        <div
          onClick={() => {
            router.push("/chat");
            setActivePage("chat");
          }}
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Icon
            icon="solar:chat-dots-linear"
            width={24}
            height={24}
            style={{ color: iconColor("chat") }}
          />
          <p className="text-[13px] font-medium" style={{ color: iconColor("chat") }}>
            Chat
          </p>
        </div>

        <div
          onClick={() => {
            router.push("/orders");
            setActivePage("order");
          }}
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Icon
            icon="lets-icons:order-light"
            width={24}
            height={24}
            style={{ color: iconColor("order") }}
          />
          <p className="text-[13px] font-medium" style={{ color: iconColor("order") }}>
            Order
          </p>
        </div>
      </div>

      {/* Center: total */}
      <div className="flex flex-col items-center justify-center">
        <p className="text-[17px] font-semibold leading-none">{formatPrice(total)}</p>
        <p className="text-[13px] leading-none pt-1 text-gray-500">Total</p>
      </div>

      {/* Right: big checkout button */}
      <button
        onClick={() => router.push("/checkout")}
        className="border rounded-[8px] px-6 py-3 font-semibold shadow-sm bg-[#1E40AF] text-white hover:opacity-80 active:scale-95 transition"
      >
        Checkout
      </button>
    </section>
  );
};

export default BottomNav;
