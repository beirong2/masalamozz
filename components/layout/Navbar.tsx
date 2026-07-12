"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const { cart } = useCart();

  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        const { data: admin } = await supabase
          .from("admins")
          .select("id")
          .eq("id", user.id)
          .single();

        setIsAdmin(!!admin);
      }
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;

      setUser(currentUser);

      if (!currentUser) {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  }

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const hasItems = itemCount > 0;

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DFD2] bg-[#F8F2E9]/95 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">

          <Image
            src="/images/logo.png"
            alt="Masala & Mozz"
            width={52}
            height={52}
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


        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 font-medium md:flex">

          <Link
            href="/menu"
            className="transition hover:text-[#C97A17]"
          >
            Menu
          </Link>

          <Link
            href="/about"
            className="..."
          >
            About
          </Link>

          <Link
            href="/contact"
            className="..."
          >
            Contact
          </Link>

        </nav>


        {/* Actions */}
        <div className="flex items-center gap-4">

          {user ? (
            <div className="hidden items-center gap-3 md:flex">

              {isAdmin && (
                <Link
                  href="/admin/orders"
                  className="text-sm font-semibold text-[#2E3416] transition hover:text-[#C97A17]"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="text-sm text-stone-600 transition hover:text-black"
              >
                Logout
              </button>

              <img
                src={
                  user.user_metadata.avatar_url ||
                  "/images/logo.png"
                }
                alt="Profile"
                className="h-9 w-9 rounded-full border border-stone-200"
              />

            </div>
          ) : (
            <Link
              href="/login"
              className="hidden text-sm font-medium transition hover:text-[#C97A17] md:block"
            >
              Login
            </Link>
          )}


          {/* Cart */}
          <Link
            href="/checkout"
            className="relative rounded-full p-2 transition hover:bg-stone-100"
          >
            <ShoppingCart className="text-[#2E3416]" />

            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C97A17] px-1 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}

          </Link>


          {/* Main CTA */}
          <Link
            href={hasItems ? "/checkout" : "/menu"}
            className="rounded-full bg-[#2E3416] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#475226]"
          >
            {hasItems ? "Checkout" : "Order Now"}
          </Link>


          {/* Mobile */}
          <button className="rounded-full p-2 md:hidden">
            <Menu />
          </button>

        </div>

      </div>
    </header>
  );
}