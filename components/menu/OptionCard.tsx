"use client";

import { Check, Flame, Leaf } from "lucide-react";
import clsx from "clsx";

interface OptionCardProps {
  title: string;
  vegan?: boolean;
  spicy?: boolean;
  price?: number;
  selected: boolean;
  onClick: () => void;

  mode?: "single" | "double" | "half";
  onModeChange?: (mode: "single" | "double" | "half") => void;
}

export default function OptionCard({
  title,
  vegan = false,
  spicy = false,
  price = 0,
  selected,
  onClick,
  mode,
  onModeChange,
}: OptionCardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "relative w-full cursor-pointer rounded-2xl border bg-white p-5 transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-lg",
        selected
          ? "border-[#2E3416] ring-2 ring-[#2E3416]/20 shadow-md"
          : "border-stone-200 hover:border-[#C68420]"
      )}
    >
      {selected && onModeChange && (
        <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#2E3416]">
          <Check size={16} className="text-white" />
        </div>
      )}

      <div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="flex items-center gap-2">
  <h3 className="text-lg font-semibold text-[#2E3416]">
    {title}
  </h3>

  {price > 0 && (
    <span className="text-sm font-medium text-stone-500">
      +${price.toFixed(2)}
    </span>
  )}
</div>

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

{selected && (
  <div className="flex gap-1">
    {onModeChange ? (
      <>
        {(["single", "double", "half"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onModeChange(m);
            }}
            className={clsx(
              "rounded-full px-2.5 py-1 text-[11px] font-semibold transition",
              mode === m
                ? "bg-[#C97A17] text-white"
                : "bg-stone-200 hover:bg-stone-300"
            )}
          >
            {m === "single"
              ? "1×"
              : m === "double"
              ? "2×"
              : "½×"}
          </button>
        ))}
      </>
    ) : mode === "half" ? (
      <span className="rounded-full bg-[#C97A17] px-2.5 py-1 text-[11px] font-semibold text-white">
        ½×
      </span>
    ) : null}
  </div>
)}
      </div>


    </div>
  );
}