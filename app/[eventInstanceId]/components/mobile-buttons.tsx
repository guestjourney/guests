/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Upsells } from "./upsells";
import { UpsellsButton } from "./upsells-button";
import { ActionButton } from "./action-button";

export const MobileButtons = ({
  upsells,
  brandColor,
  accentColor,
  buttonText,
  buttonLink,
  moreOptions,
}: {
  upsells: any;
  brandColor: string;
  accentColor: string;
  buttonText: string;
  buttonLink: string;
  moreOptions: string;
}) => {
  const [isUpsells, setIsUpsells] = useState(false);

  return (
    <div className="flex  flex-col lg:hidden justify-end items-center pt-10 ">
      <div className="h-[100px] mb-10">
        {isUpsells && <Upsells upsells={upsells} brandColor={brandColor} />}
      </div>

      <UpsellsButton
        buttonText={moreOptions}
        onClick={() => setIsUpsells((prev) => !prev)}
        isOpen={isUpsells}
      />
      <ActionButton
        buttonText={buttonText}
        buttonLink={buttonLink}
        accentColor={accentColor}
      />
    </div>
  );
};
