"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import loaderAnimation from "@/lotties/loader.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LoadingAnimation() {
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`flex flex-col gap-4 items-center justify-center fixed top-0 left-0 w-full h-full z-10 bg-white transition-transform duration-1000 ease-in-out ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <Lottie
        animationData={loaderAnimation}
        loop={true}
        className="w-48 h-48"
        autoPlay={true}
      />
    </div>
  );
}
