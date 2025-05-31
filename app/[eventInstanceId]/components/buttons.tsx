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
};
const Buttons = ({
  buttonText,
  buttonLink,
  moreOptions,
  upsells,
  accentColor,
}: ButtonsProps) => {
  const [isRenderUpsells, setIsRenderUpsells] = useState(false);
  return (
    <div className=" flex-col gap-8 hidden lg:flex">
      <div className="flex flex-wrap gap-4">
        {buttonText && (
          <ActionButton
            buttonText={buttonText}
            buttonLink={buttonLink}
            accentColor={accentColor}
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
