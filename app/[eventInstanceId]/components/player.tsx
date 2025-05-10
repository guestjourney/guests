"use client";

import { useEffect } from "react";

// Add type declaration for Playerjs

declare global {
  interface Window {
    Playerjs: any;
    sent25?: boolean;
    sent50?: boolean;
    sent75?: boolean;
    sent100?: boolean;
  }
}

export function Player({
  videoUrl,
  id,
  thumbnailUrl,
}: {
  videoUrl: string;
  id: string;
  thumbnailUrl: string;
}) {
  const sendEvent = (event: string, data: any) => {};

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
          // subtitle: data.subtitle_url,
          default_subtitle: "Default",
          controls: true,
          fullscreen: false,
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
          id: string,
          dataTime: number
        ) {
          if (!myPlayer) return;

          if (event === "play") {
            sendEvent(id, "play");
          }

          if (event === "time") {
            const duration = myPlayer.api("duration");
            const percent = (dataTime / duration) * 100;

            if (percent >= 25 && !window.sent25) {
              sendEvent(id, "25%");
              window.sent25 = true;
            }
            if (percent >= 50 && !window.sent50) {
              sendEvent(id, "50%");
              window.sent50 = true;
            }
            if (percent >= 75 && !window.sent75) {
              sendEvent(id, "75%");
              window.sent75 = true;
            }
            if (percent >= 99 && !window.sent100) {
              sendEvent(id, "100%");
              window.sent100 = true;
            }
          }
        };
      }
    };

    // return () => {
    //   document.body.removeChild(script);
    // };
  }, [videoUrl, id, thumbnailUrl]);

  return <div id="player" className="player"></div>;
}
