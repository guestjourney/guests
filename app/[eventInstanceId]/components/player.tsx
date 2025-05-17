"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from "react";

declare global {
  interface Window {
    Playerjs: any;
    PlayerjsEvents: (event: string, id: string, data: any) => void;
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
  const updateEventAnalytics = async (body: Record<string, any>) => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || ""
        }/api/event-analytics/${eventInstanceId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update analytics");
      }
    } catch (error) {
      console.error("Error updating analytics:", error);
    }
  };

  useEffect(() => {
    if (!videoUrl) return;

    const script = document.createElement("script");
    script.src = "/js/playerjs.js";
    script.async = true;

    const handlePlayerEvents = (event: string, _id: string, data: any) => {
      switch (event) {
        case "play":
          updateEventAnalytics({ play: true });
          break;
        case "userpause":
          updateEventAnalytics({ pause: true });
          break;
        case "quartile":
          updateEventAnalytics({ progress: percentStringToNumber(data) });
          break;
        case "volume":
          updateEventAnalytics({ volumeChange: true });
          break;
        case "fullscreen":
          updateEventAnalytics({ fullScreen: true });
          break;
        case "download":
          updateEventAnalytics({ download: true });
          break;
        case "geo":
          console.log(data);
          break;
      }
    };

    script.onload = () => {
      if (window.Playerjs) {
        new window.Playerjs({
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

        window.PlayerjsEvents = handlePlayerEvents;
      }
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, [videoUrl, eventInstanceId, thumbnailUrl]);

  return <div id="player" className="player"></div>;
}
