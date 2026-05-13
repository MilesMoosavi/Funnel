"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number | string;
  color?: string;
}

export function Logo({ className = "", size = "100%", color = "currentColor" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="m 45 31 l 173 304 18 34 19 -34 v -94 l -65 -113 h 109 l 16 -27 h -141 l -25 -43 h 191 l 15 -26 z m 187 281 v -64 l -108 -189 h -38 z"
      />
    </svg>
  );
}
