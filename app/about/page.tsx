export default function AboutPage() {
  return (
    <main className="bg-[#F5F1E8]">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-5xl font-bold text-[#2E3416]">
          About Masala Mozz
        </h1>

        <p className="mt-8 text-lg leading-8 text-stone-700">
          Masala Mozz was created with one goal: bring together the bold,
          comforting flavors of Indian cuisine with the rich classics of Italian
          food.
        </p>

        <p className="mt-6 text-lg leading-8 text-stone-700">
          From creamy Chicken Tikka Alfredo to handcrafted naan pizzas and
          fusion mac bites, every item is made fresh with high-quality
          ingredients and authentic spices.
        </p>

        <p className="mt-6 text-lg leading-8 text-stone-700">
          Whether you're craving something familiar or looking to try something
          completely different, we hope every meal delivers comfort, flavor, and
          a little surprise.
        </p>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold text-[#2E3416]">
              Fresh Ingredients
            </h2>

            <p className="mt-4 text-stone-600">
              Every order is prepared fresh using quality meats, vegetables,
              cheeses, and authentic Indian spices.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#2E3416]">
              Fusion Done Right
            </h2>

            <p className="mt-4 text-stone-600">
              Italian comfort food meets bold Indian flavors without sacrificing
              authenticity from either cuisine.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#2E3416]">
              Made to Order
            </h2>

            <p className="mt-4 text-stone-600">
              Every dish is cooked when you order to ensure maximum freshness
              and quality.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}