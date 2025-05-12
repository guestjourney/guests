"use client";

import { ActionButton } from "./action-button";
import { Upsells } from "./upsells";
import { Player } from "./player";
import { Buttons } from "./buttons";
import LoadingAnimation from "./loading-animation";
import Image from "next/image";
import "./styles.css";
import { useState } from "react";
import { UpsellsButton } from "./upsells-button";

type ClientWrapperProps = {
  logo: string;
  brandColor: string;
  accentColor: string;
  fontColor: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  moreOptions: string;
  upsells: Array<{ text: string; icon: string; link: string }>;
  generatedVideo: string;
  thumbnail: string;
  fallbackVideoUrl: string;
};

export function ClientWrapper({
  logo,
  brandColor,
  accentColor,
  fontColor,
  title,
  description,
  buttonText,
  buttonLink,
  moreOptions,
  upsells,
  generatedVideo,
  thumbnail,
  fallbackVideoUrl,
}: ClientWrapperProps) {
  const [isUpsells, setIsUpsells] = useState(false);

  return (
    <div className="min-h-screen min-w-screen flex flex-col lg:flex-row">
      <LoadingAnimation />
      {/* left */}
      <div
        className="w-full lg:w-3/5 flex items-center p-10 lg:pr-[20%] pb-20 lg:pb-10 left-container"
        style={{ backgroundColor: brandColor }}
      >
        <div
          className="bg-blue flex flex-col gap-8 left-container-div"
          style={{ color: fontColor }}
        >
          <Image src={logo} alt="Logo" width={160} height={100} />
          <h1 className="title font-bold">{title}</h1>
          <p className="text-2xl description">{description}</p>
          <Buttons
            buttonText={buttonText}
            buttonLink={buttonLink}
            moreOptions={moreOptions}
            upsells={upsells}
            accentColor={accentColor}
          />
        </div>
      </div>
      <div className="w-full lg:w-2/5 relative flex justify-center">
        <div className="relative lg:absolute lg:top-1/2 -top-[20px] lg:-left-1/3 lg:-translate-y-1/2 rounded-2xl overflow-hidden w-[90%] lg:w-full">
          <Player
            videoUrl={generatedVideo || fallbackVideoUrl}
            id="player"
            thumbnailUrl={thumbnail}
          />
        </div>
      </div>
      {/* 
      {/* mobile */}
      <div className="flex flex-1 flex-col lg:hidden justify-end items-center mobile-actions-container">
        {isUpsells && (
          <div className="flex gap-4 flex-1">
            <Upsells upsells={upsells} brandColor={brandColor} />
          </div>
        )}
        <UpsellsButton
          buttonText={moreOptions}
          onClick={() => setIsUpsells((prev) => !prev)}
          isOpen={isUpsells}
        />
        {/* <ActionButton
          buttonText={buttonText}
          buttonLink={buttonLink}
          accentColor={accentColor}
        /> */}
        <ActionButton
          buttonText={buttonText}
          buttonLink={buttonLink}
          accentColor={accentColor}
        />
      </div>
    </div>
  );
}
