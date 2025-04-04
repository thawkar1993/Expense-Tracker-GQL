"use client";
import React from "react";
import { ShootingStars } from "./ShootingStars";
import { StarsBackground } from "./StarsBackground";
import App from "../../App";
export function ShootingStarsAndStarsBackgroundDemo() {
  return (
    <div
      className="h-full bg-neutral-900 flex flex-col justify-center relative w-full">
      <ShootingStars />
      <StarsBackground />
      <App/>
    </div>
  );
}
