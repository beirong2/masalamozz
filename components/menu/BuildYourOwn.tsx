"use client";

import { useState } from "react";

import OptionCard from "./OptionCard";
import MenuSection from "./MenuSection";
import { useCart } from "@/context/CartContext";
import BottomOrderBar from "./BottomOrderBar";

import {
  MenuOption,
  bases,
  proteins,
  sauces,
  toppings,
} from "@/data/menu";

export default function BuildYourOwn() {
  const [base, setBase] = useState<MenuOption | null>(null);
  const [protein, setProtein] = useState<MenuOption | null>(null);
  const [sauce, setSauce] = useState<MenuOption | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const { addItem } = useCart();

  function toggleTopping(name: string) {
    setSelectedToppings((prev) =>
      prev.includes(name)
        ? prev.filter((t) => t !== name)
        : [...prev, name]
    );
  }


  function handleAddToCart() {
    if (!base || !protein || !sauce) return;

    const bowlPrice =
      10 +
      base.price +
      protein.price +
      sauce.price;

    addItem({
      id: crypto.randomUUID(),
      base,
      protein,
      sauce,
      toppings: selectedToppings,
      quantity: 1,
      price: bowlPrice,
    });

    // Reset builder
    setBase(null);
    setProtein(null);
    setSauce(null);
    setSelectedToppings([]);
  }

  return (
    <div>
      <MenuSection step={1} title="Choose Your Base">
        {bases.map((item) => (
          <OptionCard
            key={item.id}
            title={item.name}
            selected={base?.id === item.id}
            onClick={() =>
              setBase(base?.id === item.id ? null : item)
            }
          />
        ))}
      </MenuSection>

      <MenuSection step={2} title="Choose Your Protein">
        {proteins.map((item) => (
          <OptionCard
            key={item.id}
            title={item.name}
            vegan={item.vegan}
            selected={protein?.id === item.id}
            onClick={() =>
              setProtein(protein?.id === item.id ? null : item)
            }
          />
        ))}
      </MenuSection>

      <MenuSection step={3} title="Choose Your Sauce">
        {sauces.map((item) => (
          <OptionCard
            key={item.id}
            title={item.name}
            spicy={item.spicy}
            selected={sauce?.id === item.id}
            onClick={() =>
              setSauce(sauce?.id === item.id ? null : item)
            }
          />
        ))}
      </MenuSection>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-[#2E3416]">
          Choose Your Toppings
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {toppings.map((item) => (
            <OptionCard
              key={item}
              title={item}
              selected={selectedToppings.includes(item)}
              onClick={() => toggleTopping(item)}
            />
          ))}
        </div>
      </section>

      <BottomOrderBar
        base={base}
        protein={protein}
        sauce={sauce}
        toppings={selectedToppings}
        onAdd={handleAddToCart}
      />
    </div>
  );
}