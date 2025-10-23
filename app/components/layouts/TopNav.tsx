"use client";
import React from "react";
import Icon from "../Icon";
import { ICONS } from "@/constants/icons";
import { useRouter } from "next/navigation";

const TopNav = () => {
  const router = useRouter();
  return (
    <section className="flex flex-row justify-between">
      <div className="flex flex-col">
        <h1 onClick={() => router.push('/checkout')} className="text-[32px] font-bold main-text">LUXE</h1>
        <p className="second-text text-[14px] font-medium">
          Fast Finds. Easy Checkout.
        </p>
      </div>

      <div className="flex flex-row gap-2">
        <div className="p-2 flex fle-row max-w-[95px] max-h-[45px] rounded-[10px] bg-[#F3F4F6] items-center ">
          <Icon
            className="text-gray-500"
            icon="vaadin:database"
            width={22}
            height={22}
          />{" "}
          <p className="second-text text-[14px] font-medium">128 pts</p>
        </div>
        <div className="p-2 px-2 flex fle-row max-w-[80px] max-h-[45px] rounded-[10px] border border-gray-300 items-center ">
          <Icon
            className="text-gray-500"
            icon="mdi:cart"
            width={27}
            height={27}
          />{" "}
        </div>
        <div className="p-2 px-2 flex fle-row max-w-[80px] max-h-[45px] rounded-[10px] border border-gray-300 items-center ">
          <Icon
            className="text-gray-500"
            icon="ion:notifcations"
            width={27}
            height={27}
          />{" "}
        </div>
      </div>
    </section>
  );
};

export default TopNav;
