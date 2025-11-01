"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

type HeaderProps = {
  title: string;
  showBack?: boolean; 
};

const Header: React.FC<HeaderProps> = ({ title, showBack = true }) => {
  const router = useRouter();

  return (
    <header className="flex items-center relative">
      {/* Back icon */}
      {showBack && (
        <div
          onClick={() => router.back()}
          className="absolute left-0 top-0 bg-gray-500 flex items-center p-2 px-3 rounded-[5px]"
        >
          <button>
            <Icon
              className="text-white"
              icon="weui:back-filled"
              width={24}
              height={24}
            />
          </button>
        </div>
      )}

      {/* Centered title */}
      <h1 className="text-center flex-1 text-[24px] font-medium">{title}</h1>
    </header>
  );
};

export default Header;
