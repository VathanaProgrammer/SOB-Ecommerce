"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

type HeaderProps = {
  title: string;
  showBack?: boolean;
  scrollContainerId?: string; // optional: id of scrollable container
};

const Header: React.FC<HeaderProps> = ({ title, showBack = true, scrollContainerId }) => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Decide which element to listen: window or scrollable container
    const container = scrollContainerId
      ? document.getElementById(scrollContainerId)
      : document.scrollingElement || window;

    scrollContainerRef.current = container as HTMLElement;

    const handleScroll = () => {
      const scrollTop =
        container instanceof Window ? window.scrollY : (container as HTMLElement).scrollTop;
      setScrolled(scrollTop > 10);
    };

    container!.addEventListener("scroll", handleScroll);
    return () => container!.removeEventListener("scroll", handleScroll);
  }, [scrollContainerId]);

  return (
    <header
      className={`sticky top-0 z-50 flex justify-center items-center relative transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* Back icon */}
      {showBack && (
        <div
          onClick={() => router.back()}
          className="absolute left-0 bg-gray-500 flex items-center p-2 rounded"
        >
          <Icon className="text-white" icon="weui:back-filled" width={24} height={24} />
        </div>
      )}

      {/* Title */}
      <h1 className="text-center flex-1 text-[24px] font-medium">{title}</h1>
    </header>
  );
};

export default Header;
