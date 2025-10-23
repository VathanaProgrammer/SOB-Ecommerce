"use client";

import { Icon as IconifyIcon } from "@iconify/react";
import React from "react";

type IconProps = {
  icon: string;
  width?: number;
  height?: number;
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
};

export default function Icon({
  icon,
  width = 24,
  height = 24,
  className,
  strokeWidth,
  style,
}: IconProps) {
  return (
    <IconifyIcon
      icon={icon}
      width={width}
      height={height}
      className={className}
      strokeWidth={strokeWidth}
      inline={true} // needed to override path attributes
      style={style} // must be an object
    />
  );
}
