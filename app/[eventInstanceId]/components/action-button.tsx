"use client";

import dynamic from "next/dynamic";
import arrow from "@/lotties/arrow.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ActionButton = ({
  buttonText,
  buttonLink,
  accentColor,
  dir,
  onAnalyticsClick,
}: {
  buttonText: string;
  buttonLink: string;
  accentColor: string;
  dir?: "rtl" | "ltr";
  onAnalyticsClick?: () => void;
}) => {
  return (
    <button
      onClick={() => {
        onAnalyticsClick?.();
        window.open(buttonLink, "_blank");
      }}
      className={`lg:flex-row uppercase font-bold py-3 px-6 flex items-center justify-center gap-4 cursor-pointer lg:rounded-[50px] text-white w-full lg:w-fit`}
      style={
        {
          backgroundColor: accentColor,
        } as React.CSSProperties
      }
    >
      {buttonText}
      <Lottie
        animationData={arrow}
        loop={true}
        className={`w-8 h-8  ${dir === "ltr" ? "rotate-270" : "rotate-90"}`}
      />
    </button>
  );
};

export { ActionButton };
