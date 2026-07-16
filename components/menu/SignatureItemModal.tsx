"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { signatureItems } from "@/data/menu";
import { useCart } from "@/context/CartContext";

type SignatureItem = (typeof signatureItems)[0];

type Props = {
  item: SignatureItem | null;
  open: boolean;
  onClose: () => void;
};

export default function SignatureItemModal({
  item,
  open,
  onClose,
}: Props) {
  const { addItem } = useCart();

  const [removed, setRemoved] = useState<string[]>([]);
  const [extras, setExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!item) return;

    setRemoved([]);
    setExtras([]);
    setQuantity(1);
  }, [item]);

  const selectedExtras = useMemo(() => {
    if (!item) return [];

    return item.addOns.filter((addon) =>
      extras.includes(addon.id)
    );
  }, [item, extras]);

  const extraPrice = useMemo(() => {
    return selectedExtras.reduce(
      (sum, addon) => sum + addon.price,
      0
    );
  }, [selectedExtras]);

  const totalPrice =
    ((item?.price ?? 0) + extraPrice) * quantity;

  function toggleRemoved(name: string) {
    setRemoved((current) =>
      current.includes(name)
        ? current.filter((i) => i !== name)
        : [...current, name]
    );
  }

  function toggleExtra(id: string) {
    setExtras((current) =>
      current.includes(id)
        ? current.filter((i) => i !== id)
        : [...current, id]
    );
  }

  function addToCart() {
    if (!item) return;

    addItem({
      id: crypto.randomUUID(),

      signature: item.name,

      removed,

      extras: selectedExtras,

      quantity,

      price: item.price + extraPrice,

      bases: [],
      proteins: [],
      sauce: null,
      toppings: [],
    });

    onClose();
  }

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 md:items-center">

      <div className="relative flex h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white md:h-auto md:max-h-[90vh] md:rounded-3xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-3xl font-bold text-[#2E3416]">
              {item.name}
            </h2>

            <p className="mt-2 text-stone-500">
              {item.description}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-stone-100"
          >
            <X size={24} />
          </button>

        </div>

        <div className="flex-1 overflow-y-auto p-6">

          {/* Included Ingredients */}

          <div>

            <h3 className="mb-4 text-xl font-bold text-[#2E3416]">
              Included Ingredients
            </h3>

            <div className="space-y-3">

              {item.ingredients.map((ingredient) => {

                const removable =
                  item.removable.includes(ingredient);

                const checked =
                  !removed.includes(ingredient);

                if (!removable) {
                  return (
                    <div
                      key={ingredient}
                      className="flex items-center justify-between rounded-xl bg-stone-50 p-4"
                    >
                      <span>{ingredient}</span>

                      <span className="text-sm text-green-700">
                        Included
                      </span>
                    </div>
                  );
                }

                return (
                  <label
                    key={ingredient}
                    className="flex cursor-pointer items-center justify-between rounded-xl border p-4 transition hover:bg-stone-50"
                  >
                    <span>{ingredient}</span>

                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        toggleRemoved(ingredient)
                      }
                      className="h-5 w-5"
                    />
                  </label>
                );
              })}
            </div>
          </div>
                    {/* Add Extras */}

          {item.addOns.length > 0 && (
            <div className="mt-10">

              <h3 className="mb-4 text-xl font-bold text-[#2E3416]">
                Add Extras
              </h3>

              <div className="space-y-3">

                {item.addOns.map((addon) => {

                  const checked = extras.includes(addon.id);

                  return (
                    <label
                      key={addon.id}
                      className="flex cursor-pointer items-center justify-between rounded-xl border p-4 transition hover:bg-stone-50"
                    >

                      <div>
                        <p className="font-medium">
                          {addon.name}
                        </p>

                        <p className="text-sm text-stone-500">
                          +${addon.price.toFixed(2)}
                        </p>
                      </div>

                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          toggleExtra(addon.id)
                        }
                        className="h-5 w-5"
                      />

                    </label>
                  );
                })}

              </div>

            </div>
          )}

        </div>

        {/* Footer */}

        <div className="border-t bg-white p-6">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border"
              >
                −
              </button>

              <span className="w-8 text-center font-semibold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border"
              >
                +
              </button>

            </div>

            <button
              onClick={addToCart}
              className="rounded-full bg-[#2E3416] px-8 py-3 font-semibold text-white transition hover:bg-[#475226]"
            >
              Add • ${totalPrice.toFixed(2)}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}