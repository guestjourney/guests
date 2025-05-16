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
  language = "en",
  name,
}: {
  language: string;
  name: string;
}) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const greeting = useMemo(() => {
    const timeOfDay = getTimeOfDay();
    const text = greetings[language]?.[timeOfDay] || greetings["en"][timeOfDay];
    return text;
  }, [language]);

  return (
    <div
      className={`flex flex-col gap-4 items-center justify-center fixed top-0 left-0 w-full h-full z-10 bg-white transition-transform duration-1000 ease-in-out ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <span className="text-3xl capitalize">{`${name}, ${greeting}`}</span>
      <Lottie
        animationData={loaderAnimation}
        loop={true}
        className="w-36 h-36"
        autoPlay={true}
      />
    </div>
  );
}
