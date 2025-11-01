import type { Metadata } from "next";
import LayoutWrapper from "./LayoutWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOB-Ecommerce",
  description: "Best online shop for all products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
