// BottomNav.tsx
"use client";
import Icon from "../Icon";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const BottomNav: React.FC = () => {
  const router = useRouter();
  const { total } = useCart(); // ✅ read from context

  const formatPrice = (value: number) => {
    if (typeof value !== "number" || isNaN(value)) return "$0.00";
    return `$${value.toFixed(2)}`;
  };
  return (
    <section className="flex items-center justify-between my-2">
      {/* Left: navigation icons */}
      <div className="flex items-center gap-4">
        <div
          onClick={() => router.push("/")}
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Icon icon="solar:home-2-linear" width={24} height={24} />
          <p className="text-[13px] font-medium">Home</p>
        </div>
        <div
          onClick={() => router.push("")}
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Icon icon="solar:chat-dots-linear" width={24} height={24} />
          <p className="text-[13px] font-medium">Chat</p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <Icon icon="lets-icons:order-light" width={24} height={24} />
          <p className="text-[13px] font-medium">Order</p>
        </div>
      </div>

      {/* Center: total */}
      <div className="flex flex-col items-center justify-center">
        <p className="text-[17px] font-semibold leading-none">
          {formatPrice(total)}
        </p>
        <p className="text-[13px] leading-none pt-1">Total</p>
      </div>

      {/* Right: big checkout button */}
      <button
        onClick={() => router.push("/checkout")}
        className="border rounded-[8px] px-6 py-3 font-semibold shadow-sm hover:opacity-80 active:scale-95 transition"
      >
        Checkout
      </button>
    </section>
  );
};

export default BottomNav;
