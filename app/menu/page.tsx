"use client";

import BuildYourOwn from "@/components/menu/BuildYourOwn";
import Cart from "@/components/menu/Cart";
import SignatureItems from "@/components/menu/SignatureItems";
import { useState } from "react";

export default function MenuPage() {
  const [activeBar, setActiveBar] = useState<
    "signature" | "custom" | null
  >(null);

  return (
    <main className="min-h-screen bg-[#F8F2E9]">
      <div className="mx-auto max-w-7xl px-6 py-8">

        <section>
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-bold text-[#2E3416]">
              Build Your Own
            </h2>

            <p className="mt-2 text-stone-500">
              Create your own bowl or salad exactly how you want it.
            </p>
          </div>

          <BuildYourOwn
            activeBar={activeBar}
            setActiveBar={setActiveBar}
          />
        </section>

        <div className="py-6" />

        <SignatureItems
          activeBar={activeBar}
          setActiveBar={setActiveBar}
        />

        <div className="py-6" />

        <Cart />

      </div>
    </main>
  );
}