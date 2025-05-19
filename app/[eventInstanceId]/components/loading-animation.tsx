"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import loaderAnimation from "@/lotties/loader.json";
import { greetings } from "@/i18n/greeting";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function getTimeOfDay(): "morning" | "afternoon" | "evening" | "night" {
  const hour = new Date().getHours();
  if (hour < 12 && hour >= 6) return "morning";
  if (hour < 17 && hour >= 12) return "afternoon";
  if (hour < 24 && hour >= 17) return "evening";
  return "night";
}

export default function LoadingAnimation({
  language = "",
  name,
}: {
  language: string;
  name: string;
}) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`text-black/60 text-3xl capitalize flex gap-8 items-center justify-center fixed top-0 left-0 w-full h-full z-10 bg-white transition-transform duration-1000 ease-in-out ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="animate-fade-in flex gap-8 items-center justify-center lg:flex-row flex-col">
        <span>{greetings[language]?.[getTimeOfDay()]}</span>
        <div className="w-48 h-48">
          <Lottie animationData={loaderAnimation} loop={true} autoPlay={true} />
        </div>
        <span>{name}</span>
      </div>
    </div>
  );
}
