"use client";

import Image from "next/image";
import "./styles.css";

function Upsell({
  text,
  icon,
  link,
  brandColor,
}: {
  text: string;
  icon: string;
  link: string;
  brandColor: string;
}) {
  const handleClick = () => {
    // Ensure the link is treated as an absolute URL
    const absoluteUrl = link.startsWith("http") ? link : `https://${link}`;
    window.open(absoluteUrl, "_blank");
  };

  return (
    <div
      className="flex items-center gap-4 p-4 cursor-pointer flex-col justify-center"
      onClick={handleClick}
    >
      <Image
        src={icon}
        alt={text}
        width={24}
        height={24}
        className="rounded-full bg-black/30 hover:bg-black/50 w-16 h-16 p-4 cursor-pointer hover:scale-110 transition-all duration-300 upsell"
        style={{ "--brand-color": brandColor } as React.CSSProperties}
      />
      <span className="text-center capitalize">{text}</span>
    </div>
  );
}

export { Upsell };
