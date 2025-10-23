import type { Metadata } from "next";
import { IconProvider } from "@/context/IconContext";
import { Geist, Geist_Mono } from "next/font/google";
import TopNav from '@/components/layouts/TopNav';
import BottomNav from "@/components/layouts/BottomNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SOB-Ecommerce",
  description: "Best online shop for all products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <IconProvider value={{ width: 32, height: 32, color: "blue" }}>
        <body className="flex justify-center items-center m-0 p-0 min-h-screen bg-gray-200">
        <div className="relative p-6 w-full max-w-[430px] aspect-[430/932] bg-white shadow-xl rounded-[30px] overflow-hidden flex flex-col m-2">
          <TopNav />
          <main className="flex-1 overflow-y-auto hide-scrollbar">{children}</main>
          <BottomNav />
        </div>
      </body>
      </IconProvider>
    </html>
  );
}
