"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect } from "react";

declare global {
  interface Window {
    Playerjs: any;
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

  const handleStartEvent = () => {
    console.log("start");
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

        // Define event handler
        (window as any).PlayerjsEvents = function (
          event: string,
          _id: string,
          data: any
        ) {
          if (!myPlayer) return;

          if (event === "start") {
            handleStartEvent();
          }

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
  }, [videoUrl, eventInstanceId, thumbnailUrl]);

  return <div id="player" className="player"></div>;
}
