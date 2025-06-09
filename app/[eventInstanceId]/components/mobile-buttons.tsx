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
  dir,
}: {
  upsells: any;
  brandColor: string;
  accentColor: string;
  buttonText: string;
  buttonLink: string;
  moreOptions: string;
  dir: "ltr" | "rtl";
}) => {
  const [isUpsells, setIsUpsells] = useState(false);

  return (
    <div className="flex flex-col  gap-2 lg:hidden flex-1 justify-end items-center ">
      <div className="h-[70px] mb-4">
        {isUpsells && <Upsells upsells={upsells} brandColor={brandColor} />}
      </div>

      {moreOptions && (
        <UpsellsButton
          buttonText={moreOptions}
          onClick={() => setIsUpsells((prev) => !prev)}
          isOpen={isUpsells}
        />
      )}
      {buttonText && (
        <ActionButton
          buttonText={buttonText}
          buttonLink={buttonLink}
          accentColor={accentColor}
          dir={dir}
        />
      )}
    </div>
  );
};
