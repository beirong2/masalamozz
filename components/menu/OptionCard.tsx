"use client";

import { Check, Flame, Leaf } from "lucide-react";
import clsx from "clsx";

interface OptionCardProps {
  title: string;
  vegan?: boolean;
  spicy?: boolean;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({
  title,
  vegan = false,
  spicy = false,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative w-full rounded-2xl border bg-white p-5 text-left transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-lg",
        selected
          ? "border-[#2E3416] ring-2 ring-[#2E3416]/20 shadow-md"
          : "border-stone-200 hover:border-[#C68420]"
      )}
    >
      {selected && (
        <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#2E3416]">
          <Check size={16} className="text-white" />
        </div>
      )}

      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-[#2E3416]">
          {title}
        </h3>

        {vegan && (
          <Leaf
            size={16}
            className="text-green-600"
            strokeWidth={2.5}
          />
        )}

        {spicy && (
          <Flame
            size={16}
            className="text-red-500"
            strokeWidth={2.5}
          />
        )}
      </div>
    </button>
  );
}