"use client";

import errorAnimation from "@/lotties/error.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4">
      <Lottie
        animationData={errorAnimation}
        loop={true}
        className="w-48 h-48"
      />
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-center text-gray-500 mb-4">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}
