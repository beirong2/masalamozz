import Navbar from "@/components/layout/Navbar";
import BuildYourOwn from "@/components/menu/BuildYourOwn";
import Cart from "@/components/menu/Cart";
import MenuHero from "@/components/menu/MenuHero";
import SignatureItems from "@/components/menu/SignatureItems";

export default function MenuPage() {
  return (
    <>

      <main className="bg-[#F8F2E9] min-h-screen">

        <div className="mx-auto max-w-7xl px-6 py-8">
          
          <SignatureItems />
        <div className="mx-auto max-w-7xl px-6 py-3"></div>
          <BuildYourOwn />
        <div className="mx-auto max-w-7xl px-6 py-3"></div>
          <Cart />
        </div>

      </main>
    </>
  );
}