import OrderTimeline from "@/components/orders/OrderTimeline";
import { supabaseAdmin } from "@/lib/supabase-admin";
import ClearCompletedOrder from "@/components/orders/ClearCompletedOrder";
import ClearOrderStorage from "@/components/orders/ClearOrderStorage";

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
        id,
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
  orderType={order.order_type}
/>

        <div className="mt-6 rounded-2xl bg-[#F8F2E9] p-5">
  <p className="text-sm text-stone-500">
    Estimated Ready
  </p>

  <p className="mt-1 text-2xl font-bold text-[#2E3416]">
{new Date(order.estimated_ready_at).toLocaleTimeString("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  minute: "2-digit",
})}
  </p>
</div>

        {/* Pickup / Delivery */}
        <div className="mt-8 rounded-xl bg-stone-50 p-4">
          <p className="text-sm text-stone-500">
            {order.order_type === "pickup"
              ? "Pickup"
              : "Delivery"}
          </p>

          <p className="font-semibold">
            {order.order_type === "pickup"
              ? "Pickup Order"
              : order.address}
          </p>
        </div>

        {/* ETA */}
        {order.estimated_time && (
          <div className="mt-4 rounded-xl bg-green-50 p-4">
            <p className="text-sm text-green-700">
              Estimated Ready Time
            </p>

            <p className="text-xl font-bold text-green-800">
              {order.estimated_time}
            </p>
          </div>
        )}

        <div className="mt-8 border-t border-stone-200 pt-6">

          <h2 className="text-xl font-bold text-[#2E3416]">
            Your Order
          </h2>

          <div className="mt-4 space-y-3">
            {order.order_items?.map((item: any, index: number) => (
              <div
                key={item.id ?? `${item.name}-${index}`}
                className="flex justify-between rounded-xl bg-stone-50 p-4"
              >
                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p className="text-sm text-stone-500">
                    Qty: {item.quantity}
                  </p>

{item.details?.bases && (
  <p className="mt-1 text-xs text-stone-500">
    Base:{" "}
    {item.details.bases.map((b: any) => b.name).join(" / ")}
  </p>
)}

{item.details?.proteins && (
  <p className="text-xs text-stone-500">
    Protein:{" "}
    {item.details.proteins.map((p: any) => p.name).join(" / ")}
  </p>
)}

{item.details?.sauce && (
  <p className="text-xs text-stone-500">
    Sauce: {item.details.sauce.name}
  </p>
)}

{item.details?.toppings?.length > 0 && (
  <p className="text-xs text-stone-500">
    Toppings: {item.details.toppings.join(", ")}
  </p>
)}
                </div>

                <p className="font-semibold">
                  ${Number(item.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

                    <div className="mt-6 flex justify-between border-t pt-4 text-lg font-bold">
            <span>Total</span>
            <span>${Number(order.total).toFixed(2)}</span>
          </div>

        </div>

        {/* Remove current order from localStorage after completion */}
        {order.status === "completed" && <ClearOrderStorage />}

        {/* Show a button to clear the current order */}
        <div className="mt-8">
          <ClearCompletedOrder status={order.status} />
        </div>

      </div>
    </main>
  );
}