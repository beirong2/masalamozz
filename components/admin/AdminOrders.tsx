"use client";

import { useMemo, useState } from "react";
import UpdateOrderButton from "./UpdateOrderButton";
import OrderTimeline from "@/components/orders/OrderTimeline";
import AcceptOrderButton from "./AcceptOrderButton";

type Props = {
  orders: any[];
};

export default function AdminOrders({ orders }: Props) {
  const [tab, setTab] = useState<
    "received" | "preparing" | "ready" | "completed"
  >("received");

  const filteredOrders = useMemo(() => {
    switch (tab) {
case "received":
  return orders.filter(
    (o) => o.status === "received"
  );

      case "preparing":
        return orders.filter(
          (o) => o.status === "preparing"
        );

      case "ready":
        return orders.filter(
          (o) => o.status === "ready"
        );

      case "completed":
        return orders.filter(
          (o) => o.status === "completed"
        );
    }
  }, [orders, tab]);

function statusStyle(status: string) {
  switch (status) {
    case "received":
      return "bg-yellow-100 text-yellow-800";

    case "preparing":
      return "bg-blue-100 text-blue-800";

    case "ready":
      return "bg-purple-100 text-purple-800";

    case "completed":
      return "bg-green-100 text-green-800";

    case "paid":
      return "bg-green-100 text-green-800";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

  return (
    <>
<div className="mb-8 flex flex-wrap gap-3 rounded-2xl bg-white p-2 shadow">
  {[
    {
      key: "received",
      label: "Received",
      count: orders.filter(
        o =>
          o.payment_status === "paid" &&
          o.status === "received"
      ).length,
    },
    {
      key: "preparing",
      label: "Preparing",
      count: orders.filter(
        o => o.status === "preparing"
      ).length,
    },
    {
      key: "ready",
      label: "Ready",
      count: orders.filter(
        o => o.status === "ready"
      ).length,
    },
    {
      key: "completed",
      label: "Completed",
      count: orders.filter(
        o => o.status === "completed"
      ).length,
    },
  ].map((t) => (
    <button
      key={t.key}
      onClick={() => setTab(t.key as any)}
      className={`rounded-xl px-5 py-3 font-semibold transition ${
        tab === t.key
          ? "bg-[#2E3416] text-white shadow"
          : "text-stone-600 hover:bg-stone-100"
      }`}
    >
      {t.label}
      <span
        className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
          tab === t.key
            ? "bg-white/20 text-white"
            : "bg-stone-200 text-stone-700"
        }`}
      >
        {t.count}
      </span>
    </button>
  ))}
</div>

{filteredOrders.map((order) => (
  <div
    key={order.id}
    className="rounded-3xl bg-white p-6 shadow-md"
  >

              <div className="flex flex-col gap-4 md:flex-row md:justify-between">


                <div>

  <div className="flex items-center gap-3">

    <h2 className="text-xl font-bold">
      {order.name}
    </h2>

    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(order.status)}`}
    >
      {order.status}
    </span>

  </div>

  <p className="mt-2 text-stone-600">
    {order.phone}
  </p>

  <p className="text-stone-600">
    {order.order_type === "delivery"
      ? `Delivery: ${order.address}`
      : "Pickup"}
  </p>

</div>


                <div className="text-right">

                  <p className="text-3xl font-bold text-[#2E3416]">
                    ${Number(order.total).toFixed(2)}
                  </p>


                  <p className="text-sm text-stone-500">
                    {new Date(order.created_at).toLocaleString("en-US", {
                      timeZone: "America/Los_Angeles",
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>

                </div>


              </div>



              <div className="my-5 border-t"/>



              <div className="space-y-3">

                {order.order_items?.map((item:any)=>(

                  <div
                    key={item.id}
                    className="flex justify-between rounded-xl bg-stone-50 p-3"
                  >

                    <span>
                      {item.quantity} × {item.name}
                    </span>


                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                  </div>

                ))}

              </div>



              {order.notes && (

                <div className="mt-5 rounded-xl bg-[#F5F1E8] p-4">

                  <p className="font-semibold">
                    Notes
                  </p>

                  <p className="text-stone-700">
                    {order.notes}
                  </p>

                </div>

              )}
<div className="mt-6">
<OrderTimeline
 status={
   order.payment_status === "paid" &&
   order.status === "received"
     ? "paid"
     : order.status
 }
 paymentStatus={order.payment_status}
/>
</div>


              <div className="mt-6 grid gap-3 sm:grid-cols-3">


<div className="mt-6 grid gap-3 sm:grid-cols-2">

{order.payment_status === "pending" && (
  <div className="rounded-full bg-yellow-100 py-3 text-center font-semibold text-yellow-700">
    Waiting for Customer Payment
  </div>
)}


{order.payment_status === "awaiting_confirmation" && (
  <UpdateOrderButton
    orderId={order.id}
    text="Confirm Payment"
    payment_status="paid"
    color="bg-green-700 hover:bg-green-800"
  />
)}

{order.payment_status === "paid" &&
 order.status === "received" && (
    <AcceptOrderButton
      orderId={order.id}
    />
)}

  {order.status === "preparing" && (
    <UpdateOrderButton
      orderId={order.id}
      text="Mark Ready"
      status="ready"
      color="bg-purple-700 hover:bg-purple-800"
    />
  )}

  {order.status === "ready" && (
    <UpdateOrderButton
      orderId={order.id}
      text="Complete Order"
      status="completed"
      color="bg-stone-700 hover:bg-stone-800"
    />
  )}

  {order.status === "completed" && (
    <div className="rounded-full bg-green-100 py-3 text-center font-semibold text-green-700">
      ✓ Completed
    </div>
  )}

</div>


              </div>


            </div>


          


      ))}
    </>
  );
}