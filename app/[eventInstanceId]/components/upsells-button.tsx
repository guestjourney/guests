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
      // className="font-bold tracking-wider uppercase py-3 px-6 border-1 border-white rounded-[50px] w-fit hidden items-center gap-4 cursor-pointer lg:flex more-button"
      className="uppercase font-bold py-3 px-6 flex items-center justify-center gap-4 cursor-pointer  lg:rounded-[50px] w-full lg:w-fit lg:border-1 lg:border-white more-button"
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
