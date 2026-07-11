import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/lib/supabase";
import PaymentConfirmButton from "@/components/payment/PaymentConfirmButton";
import OrderPoller from "@/components/order/OrderPoller";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (!order) {
    return (
      <>
        <Navbar />

         <OrderPoller />

        <main className="min-h-screen bg-[#F8F2E9] p-10">
          <h1 className="text-3xl font-bold">
            Order not found
          </h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

       <OrderPoller />

      <main className="min-h-screen bg-[#F8F2E9] py-16">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 shadow">

          <h1 className="text-4xl font-bold text-[#2E3416]">
            Complete Payment
          </h1>

          <p className="mt-3 text-stone-600">
            Order #{order.id.slice(0, 8)}
          </p>

          <div className="my-8 rounded-2xl bg-stone-100 p-6 text-center">
            <p className="text-stone-500">
              Amount Due
            </p>

            <p className="text-5xl font-bold text-[#2E3416]">
              ${Number(order.total).toFixed(2)}
            </p>
          </div>

          <div className="space-y-5">

            <div className="rounded-2xl border p-5">
              <h2 className="text-xl font-bold">
                Venmo
              </h2>

              <p className="mt-2 text-lg">
                @YOUR_VENMO_USERNAME
              </p>

              <p className="mt-2 text-sm text-stone-500">
                Send exactly ${Number(order.total).toFixed(2)}
              </p>
            </div>

            <div className="rounded-2xl border p-5">
              <h2 className="text-xl font-bold">
                Zelle
              </h2>

              <p className="mt-2 text-lg">
                YOUR_EMAIL_OR_PHONE
              </p>

              <p className="mt-2 text-sm text-stone-500">
                Send exactly ${Number(order.total).toFixed(2)}
              </p>
            </div>

          </div>

          {order.payment_status === "unpaid" && (
            <PaymentConfirmButton
              orderId={order.id}
            />
          )}

          {order.payment_status === "awaiting_confirmation" && (
            <div className="mt-8 rounded-2xl bg-yellow-50 p-6 text-center">
              <h2 className="text-xl font-bold text-yellow-800">
                Payment Submitted ✓
              </h2>

              <p className="mt-2 text-yellow-700">
                We've received your payment notification.
              </p>

              <p className="mt-2 text-sm text-stone-600">
                Waiting for the restaurant to verify payment.
              </p>
            </div>
          )}

          {order.payment_status === "paid" &&
            order.status === "pending" && (
              <div className="mt-8 rounded-2xl bg-green-50 p-6 text-center">
                <h2 className="text-xl font-bold text-green-800">
                  Payment Confirmed ✓
                </h2>

                <p className="mt-2 text-green-700">
                  We've received your payment.
                </p>

                <p className="mt-2 text-sm text-stone-600">
                  Your order will begin preparation shortly.
                </p>
              </div>
            )}

          {order.status === "preparing" && (
            <div className="mt-8 rounded-2xl bg-blue-50 p-6 text-center">
              <h2 className="text-xl font-bold text-blue-800">
                👨‍🍳 Preparing Your Order
              </h2>

              <p className="mt-2 text-blue-700">
                Our kitchen is making your food.
              </p>
            </div>
          )}

          {order.status === "ready" && (
            <div className="mt-8 rounded-2xl bg-purple-50 p-6 text-center">
              <h2 className="text-xl font-bold text-purple-800">
                🍽 Order Ready
              </h2>

              <p className="mt-2 text-purple-700">
                {order.order_type === "pickup"
                  ? "Your order is ready for pickup!"
                  : "Your driver is on the way."}
              </p>
            </div>
          )}

          {order.status === "completed" && (
            <div className="mt-8 rounded-2xl bg-stone-100 p-6 text-center">
              <h2 className="text-xl font-bold text-stone-800">
                ✅ Order Completed
              </h2>

              <p className="mt-2 text-stone-600">
                Thank you for ordering from MasalaMozz!
              </p>
            </div>
          )}

        </div>
      </main>
    </>
  );
}