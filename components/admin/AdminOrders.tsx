"use client";

import { useMemo, useState } from "react";
import AdminOrderCard from "./AdminOrderCard";

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
  (o) => o.status === "received"
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

{filteredOrders.map((order)=>(
  <AdminOrderCard
    key={order.id}
    order={order}
  />
))}
    </>
  );
}