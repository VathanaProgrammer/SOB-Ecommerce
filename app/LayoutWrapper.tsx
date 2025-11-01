"use client";

import { AuthProvider } from "./context/AuthContext";
import { IconProvider } from "@/context/IconContext";
import { usePathname } from "next/navigation";
import TopNav from "@/components/layouts/TopNav";
import BottomNav from "@/components/layouts/BottomNav";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noTopBarRoutes = [
    "/checkout",
    "/sign-up",
    "/sign-in",
    "/checkout/payment",
    "/checkout/review",
    "/checkout/success",
    "/account",
  ];
  const hideTopBar = noTopBarRoutes.includes(pathname);

  return (
    <AuthProvider>
      <IconProvider value={{ width: 32, height: 32, color: "blue" }}>
        <div className="flex justify-center items-center m-0 p-0 min-h-screen bg-gray-200">
          <div className="relative p-6 w-full max-w-[430px] aspect-[430/932] bg-white shadow-xl rounded-[30px] overflow-hidden flex flex-col m-2">
            {!hideTopBar && <TopNav />}
            <main className="flex-1 overflow-y-auto my-2 hide-scrollbar">
              {children}
            </main>
            <BottomNav />
          </div>
        </div>
      </IconProvider>
    </AuthProvider>
  );
}
