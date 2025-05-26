"use client";

import { Player } from "./player";
import { Buttons } from "./buttons";
import LoadingAnimation from "./loading-animation";
import Image from "next/image";
import { MobileButtons } from "./mobile-buttons";
import { Analytics } from "./analytics";
import { Outfit } from "next/font/google";
import "./styles.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "700"] });

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
  generatedSubtitles: string;
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
  generatedSubtitles,
}: ClientWrapperProps) {
  return (
    <div className={outfit.className} suppressHydrationWarning>
      <div className="h-dvh w-dvw lg:min-h-screen lg:min-w-screen flex flex-col lg:flex-row">
        <LoadingAnimation language={language} name={name} />
        <div
          className="w-full lg:w-3/5 flex items-center p-5 pt-6 pb-10 lg:pt-12 lg:p-20 lg:pr-[20%] lg:pb-10 flex-1 lg:flex-row flex-col"
          style={{ backgroundColor: brandColor }}
        >
          <div
            className="bg-blue flex flex-col gap-2 lg:gap-8 lg:items-start lg:justify-start lg:text-start items-center justify-center text-center"
            style={{ color: fontColor }}
          >
            <Image
              src={logo}
              alt="Logo"
              width={160}
              height={160}
              className="mb-4 lg:mb-16"
            />
            <h1 className="text-[26px] lg:text-[45px] font-bold">{title}</h1>
            <p className="text-2xl description mb-4 lg:mb-8">{description}</p>
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
          <div className="relative lg:absolute lg:top-1/2 -top-[24px] lg:-left-1/3 lg:-translate-y-1/2 rounded-3xl overflow-hidden w-[90%] lg:w-full">
            <Player
              videoUrl={generatedVideo || fallbackVideoUrl}
              eventInstanceId={eventInstanceId}
              thumbnailUrl={thumbnail}
              subtitles={generatedSubtitles}
            />
          </div>
        </div>
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
    </div>
  );
}
