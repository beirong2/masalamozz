"use client";
import Navbar from "@/components/layout/Navbar";
import BuildYourOwn from "@/components/menu/BuildYourOwn";
import Cart from "@/components/menu/Cart";
import MenuHero from "@/components/menu/MenuHero";
import SignatureItems from "@/components/menu/SignatureItems";
import { useState } from "react";

export default function MenuPage() {
  const [activeBar, setActiveBar] = useState<
  "signature" | "custom" | null
>(null);

const [selectedSignature, setSelectedSignature] = useState<any>(null);
  return (
    <>

      <main className="bg-[#F8F2E9] min-h-screen">

        <div className="mx-auto max-w-7xl px-6 py-8">
          
<SignatureItems
  activeBar={activeBar}
  setActiveBar={setActiveBar}
/>
<div className="mx-auto max-w-7xl px-6 py-3"></div>
<BuildYourOwn
  activeBar={activeBar}
  setActiveBar={setActiveBar}
/>
        <div className="mx-auto max-w-7xl px-6 py-3"></div>
          <Cart />
        </div>

      </main>
    </>
  );
}