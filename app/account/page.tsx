"use client";

import React, { useState, ChangeEvent } from "react";
import Header from "@/components/layouts/Header";
import Image from "next/image";
import Icon from "@/components/Icon";

const Page: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string>(
    "https://i.pinimg.com/736x/a9/37/4c/a9374c0559c6708ca67248e8b6b34f22.jpg"
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const handleButtonClick = () => {
    const input = document.getElementById("image_url") as HTMLInputElement | null;
    input?.click();
  };

  const accountSections = [
    {
      icon: "mdi:account",
      title: "Profile Information",
      desc: "Manage your name, email, and phone number.",
      action: "Edit Profile",
    },
    {
      icon: "mdi:map-marker",
      title: "Shipping Addresses",
      desc: "View and update your shipping and billing addresses.",
      action: "Manage Addresses",
    },
    {
      icon: "mdi:package-variant-closed",
      title: "My Orders",
      desc: "Track your recent orders, deliveries, and returns.",
      action: "View Orders",
    },
    {
      icon: "mdi:lock-outline",
      title: "Security",
      desc: "Change password or review login activity.",
      action: "Update Password",
    },
    {
      icon: "mdi:bell-outline",
      title: "Notifications",
      desc: "Choose what alerts and messages you want to receive.",
      action: "Manage Preferences",
    },
    {
      icon: "lucide:database",
      title: "Rewards",
      desc: "Check available coupons and loyalty points.",
      action: "View Rewards",
    },
    {
      icon: "mdi:cog-outline",
      title: "Account Settings",
      desc: "Language, currency, and delete account options.",
      action: "Open Settings",
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-[440px] min-h-screen">
        <Header title="My Account" />

        {/* Profile Section */}
        <div className="w-full mt-10 flex flex-col items-center justify-center">
          <div className="relative w-[120px] h-[120px]">
            <Image
              id="profileImage"
              src={profileImage}
              alt="Profile image"
              fill
              className="object-cover rounded-full border-4 border-gray-700"
              sizes="120px"
            />

            <input
              type="file"
              id="image_url"
              name="image_url"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <button
              type="button"
              id="editImageBtn"
              onClick={handleButtonClick}
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-[#6a00b0] transition"
            >
              <Icon
                icon="iconamoon:edit-light"
                width={18}
                height={18}
                className="text-gray-800 hover:text-white"
              />
            </button>
          </div>

          <div className="mt-3 text-center">
            <p className="font-semibold text-lg text-gray-900">Sieng Vathana</p>
            <p className="text-gray-500 text-sm">vathana@example.com</p>
          </div>
        </div>

        {/* Account Options */}
        <div className="mt-8 space-y-4 pb-20">
          {accountSections.map((item, i) => (
            <div
              key={i}
              className="bg-gray-300 p-4 rounded-2xl shadow-sm flex flex-col gap-1 hover:shadow-md transition"
            >
              <div className="flex items-center gap-2">
                <Icon icon={item.icon} width={22} height={22} className="text-gray-700" />
                <h3 className="font-medium text-gray-800">{item.title}</h3>
              </div>
              <p className="text-sm text-gray-500">{item.desc}</p>
              <button className="mt-2 text-sm font-medium text-blue-600 hover:underline self-start">
                {item.action}
              </button>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="px-4 pb-10">
          <button className="w-full bg-red-500 text-white py-2 rounded-[5px] font-semibold hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
