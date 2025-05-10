"use client";

import Image from "next/image";

function Upsell({
  text,
  icon,
  link,
}: {
  text: string;
  icon: string;
  link: string;
}) {
  const handleClick = () => {
    // Ensure the link is treated as an absolute URL
    const absoluteUrl = link.startsWith("http") ? link : `https://${link}`;
    window.open(absoluteUrl, "_blank");
  };

  return (
    <div
      className="flex items-center gap-4 p-4cursor-pointer flex-col justify-center"
      onClick={handleClick}
    >
      <Image
        src={icon}
        alt={text}
        width={24}
        height={24}
        className="rounded-full bg-black/30 hover:bg-black/50 w-16 h-16 p-4 cursor-pointer hover:scale-110 transition-all duration-300"
      />
      <span className="text-center capitalize">{text}</span>
    </div>
  );
}

export { Upsell };
