// provider/GoogleMapsProvider.tsx
"use client";

import { ReactNode } from "react";
import { LoadScript } from "@react-google-maps/api";

const GOOGLE_API_KEY = "AIzaSyD9MCkP-hhoQBczDbJDd5YkcfIbGtPWPlU";

export default function GoogleMapsProvider({ children }: { children: ReactNode }) {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={["places"]}>
      {children}
    </LoadScript>
  );
}
