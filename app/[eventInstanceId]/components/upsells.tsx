"use client";

import { Upsell } from "./upsell";

const Upsells = ({
  upsells,
}: {
  upsells: { text: string; icon: string; link: string }[];
}) => {
  return (
    <div className="gap-4 flex">
      {upsells.map((upsell) => (
        <Upsell
          key={upsell.text}
          text={upsell.text}
          icon={upsell.icon}
          link={upsell.link}
        />
      ))}
    </div>
  );
};

export { Upsells };
