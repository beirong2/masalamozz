import Navbar from "@/components/layout/Navbar";
import BuildYourOwn from "@/components/menu/BuildYourOwn";
import Cart from "@/components/menu/Cart";
import MenuHero from "@/components/menu/MenuHero";
import SignatureItems from "@/components/menu/SignatureItems";

export default function MenuPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#F8F2E9] min-h-screen">

        <div className="mx-auto max-w-7xl px-6 py-16">

          <MenuHero />

          <SignatureItems />

          <div className="mt-20 grid gap-12 lg:grid-cols-[2fr_1fr]">

            <BuildYourOwn />

            <Cart />

          </div>

        </div>

      </main>
    </>
  );
}