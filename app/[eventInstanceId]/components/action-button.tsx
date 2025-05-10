"use client";

import dynamic from "next/dynamic";
import arrow from "@/lotties/arrow.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ActionButton = ({
  buttonText,
  buttonLink,
  accentColor,
}: {
  buttonText: string;
  buttonLink: string;
  accentColor: string;
}) => {
  return (
    <button
      onClick={() => window.open(buttonLink, "_blank")}
      className="uppercase font-bold py-3 px-6 flex items-center justify-center gap-4 cursor-pointer lg:rounded-[50px] text-white w-full lg:w-fit"
      style={{ backgroundColor: accentColor }}
    >
      {buttonText}
      <Lottie
        animationData={arrow}
        loop={true}
        className="w-8 h-8 rotate-270"
      />
    </button>
  );
};

export { ActionButton };
