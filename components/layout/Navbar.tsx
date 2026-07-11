"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const hasItems = itemCount > 0;
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DFD2] bg-[#F8F2E9]/95 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link href="/" className="flex items-center gap-3">

          <Image
            src="/images/logo.png"
            alt="Masala & Mozz"
            width={56}
            height={56}
            priority
          />

          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#2E3416]">
              Masala & Mozz
            </h1>

            <p className="text-xs uppercase tracking-[0.3em] text-[#C97A17]">
              Indian • Italian Fusion
            </p>
          </div>

        </Link>

        <nav className="hidden gap-10 font-medium md:flex">

          <Link href="/">Home</Link>

          <Link href="/menu">Menu</Link>

          <Link href="/#about">About</Link>

          <Link href="/#contact">Contact</Link>

        </nav>

        <div className="flex items-center gap-3">

          <Link
            href="/checkout"
            className="relative rounded-full p-2 transition hover:bg-stone-100"
          >
            <ShoppingCart className="text-[#2E3416]" />

            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#C97A17] px-1 text-[11px] font-bold text-white shadow">                {itemCount}
              </span>
            )}
          </Link>

          <Link
            href={hasItems ? "/checkout" : "/menu"}
            className="hidden rounded-full bg-[#2E3416] px-6 py-3 text-white transition hover:bg-[#475226] md:block"
          >
            {hasItems ? `Checkout (${itemCount})` : "Order Now"}
          </Link>

          <button className="rounded-full p-2 md:hidden">
            <Menu />
          </button>

        </div>

      </div>
    </header>
  );
}