import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-between gap-20 px-6 py-24 lg:flex-row">

      <div className="max-w-2xl">

        <p className="mb-6 font-semibold uppercase tracking-[0.35em] text-[#C97A17]">
          Indian × Italian Fusion
        </p>

        <h1 className="mb-8 text-6xl font-black leading-tight text-[#2E3416] lg:text-7xl">
          Crafted with Spice.
          <br />
          Finished with Soul.
        </h1>

        <p className="mb-10 max-w-xl text-lg leading-8 text-[#6B6B5E]">
          Fresh naan pizzas, tikka pasta, handcrafted bowls, and bold flavors
          inspired by two culinary traditions.
        </p>

        <div className="flex flex-wrap gap-5">

          <Link
            href="/menu"
            className="rounded-full bg-[#2E3416] px-8 py-4 font-semibold text-white transition hover:bg-[#475226]"
          >
            Start Your Order
          </Link>

          <button className="rounded-full border border-[#2E3416] px-8 py-4 font-medium transition hover:bg-white">
            Learn More
          </button>

        </div>

      </div>

      <div className="relative flex justify-center">

        <div className="absolute h-96 w-96 rounded-full bg-[#E8E2D8] blur-3xl" />

        <Image
          src="/images/logo.png"
          alt="Masala & Mozz"
          width={420}
          height={420}
          className="relative drop-shadow-2xl"
          priority
        />

      </div>

    </section>
  );
}