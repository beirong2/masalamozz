import OrderTimeline from "@/components/orders/OrderTimeline";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: order, error } = await supabaseAdmin
  .from("orders")
  .select(`
    *,
    order_items (
      name,
      quantity,
      price,
      details
    )
  `)
  .eq("id", id)
  .single();

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#F8F2E9] px-6 py-10">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-[#2E3416]">
            Order Not Found
          </h1>

          <p className="mt-2 text-stone-500">
            We could not find this order.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F2E9] px-6 py-10">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-lg">

        <h1 className="mb-8 text-3xl font-bold text-[#2E3416]">
          Track Your Order
        </h1>

<OrderTimeline
 status={
   order.payment_status === "paid" &&
   order.status === "received"
     ? "paid"
     : order.status
 }
 paymentStatus={order.payment_status}
/>

        <div className="mt-8 border-t border-stone-200 pt-6">

  <h2 className="text-xl font-bold text-[#2E3416]">
    Your Order
  </h2>

  <div className="mt-4 space-y-3">
    {order.order_items.map((item:any) => (
      <div
        key={item.name}
        className="flex justify-between rounded-xl bg-stone-50 p-4"
      >
        <div>
          <p className="font-semibold">
            {item.name}
          </p>

          <p className="text-sm text-stone-500">
            Qty: {item.quantity}
          </p>
        </div>

        <p className="font-semibold">
          ${item.price.toFixed(2)}
        </p>
      </div>
    ))}
  </div>

  <div className="mt-6 flex justify-between text-lg font-bold">
    <span>Total</span>
    <span>${order.total.toFixed(2)}</span>
  </div>

</div>

      </div>
    </main>
  );
}