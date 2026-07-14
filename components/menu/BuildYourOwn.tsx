"use client";

import OptionCard from "./OptionCard";
import MenuSection from "./MenuSection";
import BottomOrderBar from "./BottomOrderBar";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import BuildYourOwnModal from "./BuildYourOwnModal";

import {
  MenuOption,
  bases,
  proteins,
  sauces,
  toppings,
} from "@/data/menu";

export default function BuildYourOwn({
  activeBar,
  setActiveBar,
}: {
  activeBar: "signature" | "custom" | null;
  setActiveBar: React.Dispatch<
    React.SetStateAction<"signature" | "custom" | null>
  >;
}) {
  const [selectedBases, setSelectedBases] = useState<MenuOption[]>([]);
  const [selectedProteins, setSelectedProteins] = useState<MenuOption[]>([]);

  const [sauce, setSauce] = useState<MenuOption | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [baseMode, setBaseMode] = useState<"single" | "double" | "half">("single");
  const [proteinMode, setProteinMode] = useState<"single" | "double" | "half">("single");

  const { addItem } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [buildType, setBuildType] = useState<"bowl" | "salad">("bowl");

useEffect(() => {
  if (selectedBases.length === 2) {
    setBaseMode("half");
  } else if (baseMode === "half") {
    setBaseMode("single");
  }
}, [selectedBases]);

useEffect(() => {
  if (selectedProteins.length === 2) {
    setProteinMode("half");
  } else if (proteinMode === "half") {
    setProteinMode("single");
  }
}, [selectedProteins]);

useEffect(() => {
  const hasSelection =
    selectedBases.length > 0 ||
    selectedProteins.length > 0 ||
    sauce !== null ||
    selectedToppings.length > 0;

  if (hasSelection) {
    setActiveBar("custom");
  } else if (activeBar === "custom") {
    setActiveBar(null);
  }
}, [
  selectedBases,
  selectedProteins,
  sauce,
  selectedToppings,
  activeBar,
  setActiveBar,
]);


  function toggleTopping(name: string) {
    setSelectedToppings((prev) =>
      prev.includes(name)
        ? prev.filter((t) => t !== name)
        : [...prev, name]
    );
  }
function toggleOption(
  option: MenuOption,
  selected: MenuOption[],
  setSelected: React.Dispatch<React.SetStateAction<MenuOption[]>>
) {
  setSelected((prev) => {
    const exists = prev.some((p) => p.id === option.id);

    if (exists) {
      return prev.filter((p) => p.id !== option.id);
    }

    // "No" option replaces everything
    if (
      option.id === "no-base" ||
      option.id === "no-protein"
    ) {
      return [option];
    }

    // Remove any "No" option if selecting a real item
    const filtered = prev.filter(
      (p) =>
        p.id !== "no-base" &&
        p.id !== "no-protein"
    );

    if (filtered.length < 2) {
      return [...filtered, option];
    }

    return [filtered[1], option];
  });
}

function handleAddToCart() {
  if (
    selectedBases.length === 0 ||
    selectedProteins.length === 0 ||
    !sauce
  ) {
    return;
  }

let bowlPrice = 10 + sauce.price;

// Bases
if (selectedBases.length === 1) {
  bowlPrice += selectedBases[0].price;

  if (baseMode === "double") {
    bowlPrice += selectedBases[0].price;
  }
} else if (selectedBases.length === 2) {
  bowlPrice += Math.max(
    selectedBases[0].price,
    selectedBases[1].price
  );
}

// Proteins
if (selectedProteins.length === 1) {
  bowlPrice += selectedProteins[0].price;

  if (proteinMode === "double") {
    bowlPrice += selectedProteins[0].price;
  }
} else if (selectedProteins.length === 2) {
  bowlPrice += Math.max(
    selectedProteins[0].price,
    selectedProteins[1].price
  );
}

addItem({
  id: crypto.randomUUID(),

  bases: selectedBases,
  proteins: selectedProteins,

  baseMode,
  proteinMode,

  sauce,
  toppings: selectedToppings,

  quantity: 1,
  price: bowlPrice,
});

setSelectedBases([]);
setSelectedProteins([]);

setBaseMode("single");
setProteinMode("single");

setSauce(null);
setSelectedToppings([]);
setActiveBar(null);
}

let total = 10 + (sauce?.price ?? 0);

if (selectedBases.length === 1) {
  total += selectedBases[0].price;
  if (baseMode === "double") total += selectedBases[0].price;
} else if (selectedBases.length === 2) {
  total += Math.max(...selectedBases.map((b) => b.price));
}

if (selectedProteins.length === 1) {
  total += selectedProteins[0].price;
  if (proteinMode === "double") total += selectedProteins[0].price;
} else if (selectedProteins.length === 2) {
  total += Math.max(...selectedProteins.map((p) => p.price));
}

const title =
  (selectedProteins.length
    ? selectedProteins.map((p) => p.name).join(" / ")
    : "Choose Protein") +
  (selectedBases.length
    ? ` • ${selectedBases.map((b) => b.name).join(" / ")}`
    : "");

const subtitle = `${toppings.length} toppings`;

const availableBases =
  buildType === "bowl"
    ? bases.filter((b) => b.id !== "greens")
    : bases.filter(
        (b) =>
          b.id !== "rice" &&
          b.id !== "pasta" &&
          b.id !== "no-base"
      );

return (
  <>
<div className="grid gap-6 md:grid-cols-2">

  {/* Bowl Card */}
  <div
    onClick={() => {
      setBuildType("bowl");
      setModalOpen(true);
    }}
    className="cursor-pointer overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
  >
    <div className="flex h-64">
      <div className="flex w-1/2 flex-col justify-center p-8">
        <h3 className="text-2xl font-bold text-[#2E3416]">
          Build Your Own Bowl
        </h3>

        <p className="mt-3 text-stone-500">
          Rice or pasta with your choice of protein, sauce, and toppings.
        </p>

        <p className="mt-6 font-semibold text-[#C97A17]">
          From $10.00
        </p>
      </div>

      <div className="w-1/2">
        <img
          src="/images/bowl.jpg"
          alt="Build Your Own Bowl"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  </div>

  {/* Salad Card */}
  <div
    onClick={() => {
      setBuildType("salad");
      setModalOpen(true);
    }}
    className="cursor-pointer overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
  >
    <div className="flex h-64">
      <div className="flex w-1/2 flex-col justify-center p-8">
        <h3 className="text-2xl font-bold text-[#2E3416]">
          Build Your Own Salad
        </h3>

        <p className="mt-3 text-stone-500">
          Fresh greens with your choice of protein, sauce, and toppings.
        </p>

        <p className="mt-6 font-semibold text-[#C97A17]">
          From $10.00
        </p>
      </div>

      <div className="w-1/2">
        <img
          src="/images/salad.jpg"
          alt="Build Your Own Salad"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  </div>

</div>

<BuildYourOwnModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  title={
    buildType === "bowl"
      ? "Build Your Own Bowl"
      : "Build Your Own Salad"
  }
>
<div className="space-y-12 p-8">

  <MenuSection
  step={1}
  title={
    buildType === "bowl"
      ? "Choose Your Base"
      : "Choose Your Greens"
  }
>
    {availableBases.map((item) => (
      <OptionCard
        key={item.id}
        title={item.name}
        price={item.price}
        selected={selectedBases.some((b) => b.id === item.id)}
        mode={
          selectedBases.length === 2
            ? selectedBases.some((b) => b.id === item.id)
              ? "half"
              : undefined
            : selectedBases.length === 1 &&
              selectedBases[0].id === item.id
            ? baseMode
            : undefined
        }
        onModeChange={
          selectedBases.length === 1 &&
          selectedBases[0].id === item.id
            ? setBaseMode
            : undefined
        }
        onClick={() =>
          toggleOption(item, selectedBases, setSelectedBases)
        }
      />
    ))}
  </MenuSection>

  <MenuSection step={2} title="Choose Your Protein">
    {proteins.map((item) => (
      <OptionCard
        key={item.id}
        title={item.name}
        price={item.price}
        vegan={item.vegan}
        selected={selectedProteins.some((p) => p.id === item.id)}
        mode={
          selectedProteins.length === 2
            ? selectedProteins.some((p) => p.id === item.id)
              ? "half"
              : undefined
            : selectedProteins.length === 1 &&
              selectedProteins[0].id === item.id
            ? proteinMode
            : undefined
        }
        onModeChange={
          selectedProteins.length === 1 &&
          selectedProteins[0].id === item.id
            ? setProteinMode
            : undefined
        }
        onClick={() =>
          toggleOption(
            item,
            selectedProteins,
            setSelectedProteins
          )
        }
      />
    ))}
  </MenuSection>

  <MenuSection step={3} title="Choose Your Sauce">
    {sauces.map((item) => (
      <OptionCard
        key={item.id}
        title={item.name}
        price={item.price}
        spicy={item.spicy}
        selected={sauce?.id === item.id}
        onClick={() => setSauce(item)}
      />
    ))}
  </MenuSection>

  <MenuSection step={4} title="Choose Your Toppings">
    {toppings.map((item) => (
      <OptionCard
        key={item}
        title={item}
        selected={selectedToppings.includes(item)}
        onClick={() => toggleTopping(item)}
      />
    ))}
  </MenuSection>

</div>

      {activeBar === "custom" && (
        <BottomOrderBar
          title={title}
          subtitle={subtitle}
          price={total}
          disabled={
            selectedBases.length === 0 ||
            selectedProteins.length === 0 ||
            !sauce
          }
          onAdd={handleAddToCart}
        />
      )}
    </BuildYourOwnModal>
  </>
);
}