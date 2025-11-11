// app/layout.tsx
import type { Metadata } from "next";
import LayoutWrapper from "./LayoutWrapper";
import { CheckoutProvider } from "./context/CheckOutContext";
import { AuthProvider } from "./context/AuthContext";
import GoogleMapsProvider from "@/provider/GoogleMapsProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "@/context/LoadingContext";

export const metadata: Metadata = {
  title: "SOB-Ecommerce",
  description: "Best online shop for all products",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GoogleMapsProvider>
          <AuthProvider>
            <CheckoutProvider>
              <LoadingProvider>
                <LayoutWrapper>{children}</LayoutWrapper>
                <Toaster position="top-right" reverseOrder={false} />
              </LoadingProvider>
            </CheckoutProvider>
          </AuthProvider>
        </GoogleMapsProvider>
      </body>
    </html>
  );
}
