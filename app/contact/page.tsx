import { RESTAURANT } from "@/lib/config";

export default function ContactPage() {
  return (
    <main className="bg-[#F5F1E8]">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-5xl font-bold text-[#2E3416]">
          Contact Us
        </h1>

        <p className="mt-4 text-lg text-stone-600">
          Questions about an order or catering? We'd love to hear from you.
        </p>

        <div className="mt-12 grid gap-10 rounded-3xl bg-white p-10 shadow md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-[#2E3416]">
              Restaurant
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-stone-600">
                  {RESTAURANT.address}
                </p>
              </div>

              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-stone-600">
                  {RESTAURANT.phone}
                </p>
              </div>

              <div>
                <p className="font-semibold">Email</p>
                <p className="text-stone-600">
                  {RESTAURANT.email}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#2E3416]">
              Hours
            </h2>

            <div className="mt-6 space-y-3 text-stone-600">
              <p>Monday – Thursday: 11:00 AM – 9:00 PM</p>
              <p>Friday: 11:00 AM – 10:00 PM</p>
              <p>Saturday: 12:00 PM – 10:00 PM</p>
              <p>Sunday: 12:00 PM – 8:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}