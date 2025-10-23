import React from "react";
import Icon from "../Icon";
import { ICONS } from "@/constants/icons";

const BottomNav = () => {
  return (
    <section className="flex flex-row justify-between">
      <div className="flex flex-col p-2 items-center">
        <Icon
          className="text-[#313131]"
          icon="solar:home-2-linear"
          width={28}
          height={28}
        />{" "}
        <p className="text-[14px] font-medium">Home</p>
      </div>
      <div className="flex flex-col p-2 items-center">
        <Icon
          className="text-[#313131]"
          icon="solar:chat-dots-linear"
          width={28}
          height={28}
        />{" "}
        <p className="text-[14px] font-medium">Chat</p>
      </div>
      <div className="flex flex-col p-2 items-center">
        <Icon
          className="text-[#313131]"
          icon="solar:chat-dots-linear"
          width={28}
          height={28}
        />{" "}
        <p className="text-[14px] font-medium">Total</p>
      </div>
      <div className="flex flex-col p-2 items-center">
        <Icon
          icon="material-symbols-light:shopping-cart-checkout"
          width={28}
          height={28}
          className="text-[#313131]"
          style={{ strokeWidth: 0.3, stroke: "#313131" }}
        />{" "}
        <p className="text-[14px] font-medium">Checkout</p>
      </div>
      <div className="flex flex-col p-2 items-center">
        <Icon
          icon="lets-icons:order-light"
          width={28}
          height={28}
          className="text-[#313131]"
        />{" "}
        <p className="text-[14px] font-medium">Order</p>
      </div>
    </section>
  );
};

export default BottomNav;
