"use client";
import { useState } from "react";
import { ActionButton } from "./action-button";
import { UpsellsButton } from "./upsells-button";
import { Upsells } from "./upsells";

type ButtonsProps = {
  buttonText: string;
  buttonLink: string;
  moreOptions: string;
  upsells: { text: string; icon: string; link: string }[];
  accentColor: string;
  dir?: "rtl" | "ltr";
  eventInstanceId: string;
};
const Buttons = ({
  buttonText,
  buttonLink,
  moreOptions,
  upsells,
  accentColor,
  dir,
  eventInstanceId,
}: ButtonsProps) => {
  const [isRenderUpsells, setIsRenderUpsells] = useState(false);

  const updateEventAnalytics = async () => {
    try {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      await fetch(`${baseUrl}/api/event-analytics/${eventInstanceId}`, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({ primaryButtonClick: true }),
      });
    } catch (error) {
      console.error("Error updating analytics:", error);
    }
  };

  return (
    <div className=" flex-col gap-8 hidden lg:flex">
      <div className="flex flex-wrap gap-4">
        {buttonText && (
          <ActionButton
            buttonText={buttonText}
            buttonLink={buttonLink}
            accentColor={accentColor}
            dir={dir}
            onAnalyticsClick={updateEventAnalytics}
          />
        )}
        {moreOptions && upsells.length > 0 && (
          <UpsellsButton
            buttonText={moreOptions}
            onClick={() => setIsRenderUpsells((prev) => !prev)}
            isOpen={isRenderUpsells}
          />
        )}
      </div>
      <div className="h-[100px]">
        {isRenderUpsells && (
          <Upsells upsells={upsells} brandColor={accentColor} />
        )}
      </div>
    </div>
  );
};

export { Buttons };
