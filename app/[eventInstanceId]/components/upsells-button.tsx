"use client";

import { Plus, Minus } from "lucide-react";
import "./styles.css";

const UpsellsButton = ({
  buttonText,
  onClick,
  isOpen = false,
}: {
  buttonText: string;
  onClick: () => void;
  isOpen?: boolean;
}) => {
  return (
    <button
      className="uppercase font-bold lg:py-3 lg:px-6 flex items-center justify-center gap-4 cursor-pointer  lg:rounded-[50px] w-full lg:w-fit lg:border-1 lg:border-white more-button"
      onClick={onClick}
    >
      {buttonText}
      {isOpen ? (
        <Minus className="w-8 h-8 flex justify-center items-center p-2 bg-white/20 rounded-full shrink-0 " />
      ) : (
        <Plus className="w-8 h-8 flex justify-center items-center p-2 bg-white/20 rounded-full shrink-0 " />
      )}
    </button>
  );
};

export { UpsellsButton };
