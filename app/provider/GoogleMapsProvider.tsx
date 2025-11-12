// provider/GoogleMapsProvider.tsx
"use client";

import { ReactNode } from "react";
import { LoadScript } from "@react-google-maps/api";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

export default function GoogleMapsProvider({ children }: { children: ReactNode }) {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={["places"]}>
      {children}
    </LoadScript>
  );
}
