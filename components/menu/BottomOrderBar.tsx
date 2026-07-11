"use client";

import { MenuOption } from "@/data/menu";

interface Props {
  base: MenuOption | null;
  protein: MenuOption | null;
  sauce: MenuOption | null;
  toppings: string[];
  onAdd: () => void;
}

export default function BottomOrderBar({
  base,
  protein,
  sauce,
  toppings,
  onAdd,
}: Props) {
  const visible =
    !!base ||
    !!protein ||
    !!sauce ||
    toppings.length > 0;

  if (!visible) return null;

  const total =
    10 +
    (base?.price ?? 0) +
    (protein?.price ?? 0) +
    (sauce?.price ?? 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200 bg-white/95 backdrop-blur-md shadow-2xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <div>

          <p className="text-xs uppercase tracking-wide text-stone-500">
            Current Bowl
          </p>

          <p className="font-semibold text-[#2E3416]">
            {protein?.name ?? "Choose Protein"}
            {base && ` • ${base.name}`}
          </p>

          <p className="text-sm text-stone-500">
            {toppings.length} toppings
          </p>

        </div>

        <div className="flex items-center gap-5">

          <span className="text-xl font-bold">
            ${total.toFixed(2)}
          </span>

          <button
            onClick={onAdd}
            disabled={!base || !protein || !sauce}
            className="rounded-full bg-[#2E3416] px-8 py-3 font-semibold text-white transition hover:bg-[#475226] disabled:opacity-40"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}