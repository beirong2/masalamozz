"use client";

import SignatureCard from "./SignatureCard";
import { signatureItems } from "@/data/menu";
import { useCart } from "@/context/CartContext";

export default function SignatureItems() {
  const { addItem } = useCart();

  return (
    <section className="mb-20">
      <div className="mb-8">
        <p className="font-semibold uppercase tracking-[0.2em] text-[#C68420]">
          Chef Favorites
        </p>

        <h2 className="mt-2 text-4xl font-bold text-[#2E3416]">
          Most Popular
        </h2>

        <p className="mt-3 text-stone-600">
          Handcrafted fusion dishes inspired by Indian and Italian classics.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {signatureItems.map((item) => (
          <SignatureCard
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            onAdd={() =>
              addItem({
                id: crypto.randomUUID(),
                signature: item.name,
                base: null,
                protein: null,
                sauce: null,
                toppings: [],
                quantity: 1,
                price: item.price,
              })
            }
          />
        ))}
      </div>
    </section>
  );
}