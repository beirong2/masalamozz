import Navbar from "@/components/layout/Navbar";
import CheckoutForm from "@/components/menu/CheckoutForm";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F2E9] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <CheckoutForm />
        </div>
      </main>
    </>
  );
}