"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";

declare global {
  interface Window {
    Playerjs: any;
    sent25?: boolean;
    sent50?: boolean;
    sent75?: boolean;
    sent100?: boolean;
  }
}

function percentStringToNumber(percent: string): number {
  return parseFloat(percent.replace("%", ""));
}

export function Player({
  videoUrl,
  eventInstanceId,
  thumbnailUrl,
}: {
  videoUrl: string;
  eventInstanceId: string;
  thumbnailUrl: string;
}) {
  const handlePlayEvent = () => {
    console.log("play");
  };

  const handlePauseEvent = () => {
    console.log("pause");
  };

  const handleProgressEvent = (percent: number) => {
    console.log("progress", percent);
  };

  const handleVolumeChangeEvent = () => {
    console.log("volume change");
  };

  const handleTimeEvent = (data: any) => {
    console.log("time", data);
  };

  const handleFullscreenEvent = () => {
    console.log("fullscreen");
  };

  useEffect(() => {
    if (!videoUrl) return;

    let myPlayer: any = null;

    const script = document.createElement("script");
    script.src = "/js/playerjs.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Playerjs) {
        myPlayer = new window.Playerjs({
          id: "player",
          file: videoUrl,
          poster: thumbnailUrl,
          subtitle: "",
          // "https://guestjourney-subtitles.b-cdn.net/711acc20-c42f-4a3b-92e8-1a8f4c662965.ttp",
          // "https://guestjourney-subtitles.b-cdn.net/wedding-generic-english.vtt",
          // "https://guestjourney-subtitles.b-cdn.net/4dda9f7a-5f18-4451-b234-5ea5bd799922.vtt",
          default_subtitle: "Default",
          controls: true,
          fullscreen: true,
          mobileAutoFullscreen: false,
          playsinline: true,
          pip: false,
          settings: {
            background_color: "#000000",
            subtitle_background_color: "#000000",
            subtitle_opacity: 0.7,
            subtitle_text_color: "#FFFFFF",
            subtitle_text_size: "125%",
            subtitle_bottom_margin: 10,
          },
        });

        // Reset flags
        window.sent25 = false;
        window.sent50 = false;
        window.sent75 = false;
        window.sent100 = false;

        // Define event handler
        (window as any).PlayerjsEvents = function (
          event: string,
          _id: string,
          data: any
        ) {
          if (!myPlayer) return;

          if (event === "play") {
            handlePlayEvent();
          }

          if (event === "userpause") {
            handlePauseEvent();
          }

          if (event === "quartile") {
            handleProgressEvent(percentStringToNumber(data));
          }

          if (event === "volumechange") {
            handleVolumeChangeEvent();
          }

          if (event === "time") {
            handleTimeEvent(data);
          }

          if (event === "fullscreen") {
            handleFullscreenEvent();
          }
        };
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }),
    [videoUrl, eventInstanceId, thumbnailUrl];

  return <div id="player" className="player"></div>;
}
