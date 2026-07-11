"use client";

import { MenuOption } from "@/data/menu";

interface OrderSummaryProps {
  base: MenuOption | null;
  protein: MenuOption | null;
  sauce: MenuOption | null;
  toppings: string[];
}

export default function OrderSummary({
  base,
  protein,
  sauce,
  toppings,
}: OrderSummaryProps) {
  const total =
    10 +
    (base?.price ?? 0) +
    (protein?.price ?? 0) +
    (sauce?.price ?? 0);

  return (
    <div className="mb-10 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold text-[#2E3416]">
        Your Bowl
      </h2>

      <div className="space-y-5">

        <div>
          <p className="text-xs uppercase tracking-wide text-stone-400">
            Base
          </p>

          <p className="font-medium">
            {base?.name ?? "Choose a base"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-stone-400">
            Protein
          </p>

          <p className="font-medium">
            {protein?.name ?? "Choose a protein"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-stone-400">
            Sauce
          </p>

          <p className="font-medium">
            {sauce?.name ?? "Choose a sauce"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-stone-400">
            Toppings
          </p>

          {toppings.length === 0 ? (
            <p className="text-stone-500">
              None selected
            </p>
          ) : (
            <div className="mt-2 flex flex-wrap gap-2">
              {toppings.map((topping) => (
                <span
                  key={topping}
                  className="rounded-full bg-[#F8F2E9] px-3 py-1 text-sm"
                >
                  {topping}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="border-t pt-5">
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}