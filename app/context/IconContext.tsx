// context/IconContext.tsx
"use client";

import React, { createContext} from "react";
type IconContextType = {
  width: number;
  height: number;
  color: string;
};

export const IconContext = createContext<IconContextType>({
  width: 24,
  height: 24,
  color: "black",
});

export function IconProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: IconContextType;
}) {
  return <IconContext.Provider value={value}>{children}</IconContext.Provider>;
}
