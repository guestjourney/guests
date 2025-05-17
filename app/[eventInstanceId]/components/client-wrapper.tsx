"use client";

import { Player } from "./player";
import { Buttons } from "./buttons";
import LoadingAnimation from "./loading-animation";
import Image from "next/image";
import "./styles.css";
import { MobileButtons } from "./mobile-buttons";
import { Analytics } from "./analytics";

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
  name: string;
  language: string;
  eventInstanceId: string;
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
  name,
  language,
  eventInstanceId,
}: ClientWrapperProps) {
  return (
    <>
      <div className="min-h-screen min-w-screen flex flex-col lg:flex-row">
        <LoadingAnimation language={language} name={name} />
        {/* left */}
        <div
          className="w-full lg:w-3/5 flex items-center p-10 lg:p-20 lg:pr-[20%] lg:pb-10 flex-1"
          style={{ backgroundColor: brandColor }}
        >
          <div
            className="bg-blue flex flex-col gap-8 lg:items-start lg:justify-start lg:text-start items-center justify-center text-center"
            style={{ color: fontColor }}
          >
            <Image src={logo} alt="Logo" width={160} height={100} />
            <h1 className="text-[30px] lg:text-[45px] font-bold">{title}</h1>
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
          <div className="relative lg:absolute lg:top-1/2 -top-[20px] lg:-left-1/3 lg:-translate-y-1/2 rounded-3xl overflow-hidden w-[90%] lg:w-full">
            <Player
              videoUrl={generatedVideo || fallbackVideoUrl}
              eventInstanceId={eventInstanceId}
              thumbnailUrl={thumbnail}
            />
          </div>
        </div>
        {/*  mobile */}
        <MobileButtons
          upsells={upsells}
          brandColor={brandColor}
          accentColor={accentColor}
          buttonText={buttonText}
          buttonLink={buttonLink}
          moreOptions={moreOptions}
        />
      </div>
      <Analytics />
    </>
  );
}
