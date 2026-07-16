"use client";

import SignatureCard from "./SignatureCard";
import { signatureItems } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import SignatureItemModal from "./SignatureItemModal";

export default function SignatureItems({
  activeBar,
  setActiveBar,
}: {
  activeBar: "signature" | "custom" | null;
  setActiveBar: React.Dispatch<
    React.SetStateAction<"signature" | "custom" | null>
  >;
}) {
  const { addItem } = useCart();
  const [selectedItem, setSelectedItem] = useState<
  (typeof signatureItems)[0] | null
>(null);

  return (
    <section className="space-y-8">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2E3416]">
          Signature Items
        </h2>

        <p className="mt-2 text-stone-500">
          Our most popular Indian-Italian creations, crafted by our chefs.
        </p>
      </div>

      <div
  className="
    flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory
    md:grid md:overflow-visible md:snap-none
    md:grid-cols-2 xl:grid-cols-3
  "
>
{signatureItems.map((item) => (
  <div
    key={item.id}
    className="min-w-[85%] snap-center md:min-w-0"
  >
    <SignatureCard
      name={item.name}
      description={item.description}
      price={item.price}
      image={item.image}

onSelect={() => {
  setSelectedItem(item);
  setActiveBar("signature");
}}

  onAdd={() =>
    addItem({
      id: crypto.randomUUID(),
      signature: item.name,
      bases: [],
      proteins: [],
      sauce: null,
      toppings: [],
      quantity: 1,
      price: item.price,
    })
  }
/>
</div>
        ))}
      </div>
<SignatureItemModal
  item={selectedItem}
  open={selectedItem !== null}
  onClose={() => {
    setSelectedItem(null);
    setActiveBar(null);
  }}
/>
    </section>
  );
}