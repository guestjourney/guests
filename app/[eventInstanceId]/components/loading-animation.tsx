"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import loaderAnimation from "@/lotties/loader.json";
import { greetings } from "@/i18n/greeting";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function getTimeOfDay(): "morning" | "afternoon" | "evening" {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
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
      className={`flex flex-col gap-4 items-center justify-center fixed top-0 left-0 w-full h-full z-10 bg-white transition-transform duration-1000 ease-in-out ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="text-3xl capitalize">
        <span className="text-3xl capitalize">{`${name}, `}</span>
        <span className="text-3xl capitalize">
          {greetings[language]?.[getTimeOfDay()]}
        </span>
      </div>
      <Lottie
        animationData={loaderAnimation}
        loop={true}
        className="w-36 h-36"
        autoPlay={true}
      />
    </div>
  );
}
