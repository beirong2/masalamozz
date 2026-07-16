"use client";

import { Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Cart() {
  const {
    cart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div className="sticky top-28 rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-[#2E3416]">
        Your Order
      </h2>

      {cart.length === 0 && (
        <p className="text-stone-500">
          Your cart is empty.
        </p>
      )}

      <div className="space-y-5">

        {cart.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-stone-200 p-4"
          >
            <div className="flex items-start justify-between">

              <div>

<h3 className="font-semibold text-lg text-[#2E3416]">
  {item.signature ?? "Custom Bowl"}
</h3>

{item.signature && (
  <div className="mt-2 space-y-1 text-sm">

    {item.removed && item.removed.length > 0 && (
      <p className="text-red-600">
        <span className="font-medium">No:</span>{" "}
        {item.removed.join(", ")}
      </p>
    )}

    {item.extras && item.extras.length > 0 && (
      <p className="text-green-700">
        <span className="font-medium">Extra:</span>{" "}
        {item.extras.map((e) => e.name).join(", ")}
      </p>
    )}

    {!item.removed?.length && !item.extras?.length && (
      <p className="text-stone-500 italic">
        Standard recipe
      </p>
    )}

  </div>
)}

{!item.signature && (
  <>
    <p className="text-sm text-stone-600">
      <span className="font-medium">Base:</span>{" "}
      {item.bases
        .map((b) => b.name)
        .join(item.bases.length === 2 ? " / " : "")}
    </p>

    <p className="text-sm text-stone-600">
      <span className="font-medium">Protein:</span>{" "}
      {item.proteins
        .map((p) => p.name)
        .join(item.proteins.length === 2 ? " / " : "")}
    </p>

    <p className="text-sm text-stone-600">
      <span className="font-medium">Sauce:</span>{" "}
      {item.sauce?.name}
    </p>

    {item.toppings.length > 0 && (
      <p className="mt-2 text-xs text-stone-400">
        {item.toppings.join(" • ")}
      </p>
    )}
  </>
)}

            </div>

              <button
                onClick={() => removeItem(item.id)}
                className="rounded-lg p-2 transition hover:bg-red-50"
              >
                <Trash2
                  size={18}
                  className="text-red-500"
                />
              </button>

            </div>

            <div className="mt-5 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 hover:bg-stone-100"
                >
                  −
                </button>

                <span className="font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 hover:bg-stone-100"
                >
                  +
                </button>

              </div>

              <span className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>

            </div>

          </div>
        ))}

      </div>

      {cart.length > 0 && (
        <>
          <div className="my-6 border-t" />

          <div className="mb-6 flex justify-between text-lg font-bold">

            <span>Total</span>

            <span>${total.toFixed(2)}</span>

          </div>

          <Link
            href="/checkout"
            className="block w-full rounded-full bg-[#2E3416] py-4 text-center font-semibold text-white transition hover:bg-[#475226]"
          >
            Checkout
          </Link>
        </>
      )}

    </div>
  );
}