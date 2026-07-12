"use client";

import SignatureCard from "./SignatureCard";
import { signatureItems } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import BottomOrderBar from "./BottomOrderBar";

export default function SignatureItems() {
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {signatureItems.map((item) => (
<SignatureCard
  key={item.id}
  name={item.name}
  description={item.description}
  price={item.price}
  image={item.image}

  onSelect={() => setSelectedItem(item)}

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
        ))}
      </div>
      {selectedItem && (
  <BottomOrderBar
    title={selectedItem.name}
    subtitle={selectedItem.description}
    price={selectedItem.price}
    onAdd={() => {
      addItem({
        id: crypto.randomUUID(),
        signature: selectedItem.name,
        bases: [],
        proteins: [],
        sauce: null,
        toppings: [],
        quantity: 1,
        price: selectedItem.price,
      });

      setSelectedItem(null);
    }}
  />
)}
    </section>
  );
}