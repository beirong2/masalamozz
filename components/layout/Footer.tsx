import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#E8DFD2] bg-[#F5F1E8]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Masala & Mozz"
              width={48}
              height={48}
            />

            <div>
              <h2 className="text-xl font-bold text-[#2E3416]">
                Masala & Mozz
              </h2>

              <p className="text-sm text-[#C97A17]">
                Indian • Italian Fusion
              </p>
            </div>
          </div>

          <p className="mt-4 max-w-sm text-sm leading-6 text-stone-600">
            Fresh Indian-Italian fusion made to order for pickup and local
            delivery.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-4 font-semibold text-[#2E3416]">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2 text-stone-600">
            <Link href="/menu" className="hover:text-[#C97A17]">
              Menu
            </Link>

            <Link href="/about" className="hover:text-[#C97A17]">
              About
            </Link>

            <Link href="/contact" className="hover:text-[#C97A17]">
              Contact
            </Link>

            <Link href="/find-order" className="hover:text-[#C97A17]">
              Find My Orders
            </Link>
          </div>
        </div>

        {/* Restaurant Info */}
        <div>
          <h3 className="mb-4 font-semibold text-[#2E3416]">
            Restaurant
          </h3>

          <div className="space-y-2 text-sm text-stone-600">
            <p>📍 Sharon, MA</p>

            <p>Pickup & Local Delivery</p>

            <p>Questions? Contact us anytime.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E8DFD2]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-stone-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Masala & Mozz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}