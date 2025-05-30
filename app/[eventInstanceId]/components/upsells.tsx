"use client";

import { Upsell } from "./upsell";

const Upsells = ({
  upsells,
  brandColor,
}: {
  upsells: { text: string; icon: string; link: string }[];
  brandColor: string;
}) => {
  return (
    <div className=" flex h-[100%]">
      {upsells.map((upsell) => (
        <Upsell
          key={upsell.text}
          text={upsell.text}
          icon={upsell.icon}
          link={upsell.link}
          brandColor={brandColor}
        />
      ))}
    </div>
  );
};

export { Upsells };
