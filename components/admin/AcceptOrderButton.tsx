"use client";

import { useState } from "react";

export default function AcceptOrderButton({
  orderId,
}: {
  orderId: string;
}) {
  const [minutes, setMinutes] = useState(25);
  const [loading, setLoading] = useState(false);

  async function acceptOrder() {
    setLoading(true);

    const readyAt = new Date(
      Date.now() + minutes * 60 * 1000
    ).toISOString();

    const response = await fetch("/api/orders/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        status: "preparing",
        estimated_ready_at: readyAt,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      alert("Failed to update order.");
    }
  }

  return (
    <div className="rounded-2xl border border-stone-200 p-4">
      <p className="mb-3 font-semibold">
        Estimated Ready Time
      </p>

      <div className="flex gap-3">
        <select
          value={minutes}
          onChange={(e) =>
            setMinutes(Number(e.target.value))
          }
          className="flex-1 rounded-xl border p-3"
        >
          <option value={15}>15 minutes</option>
          <option value={20}>20 minutes</option>
          <option value={25}>25 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={40}>40 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>60 minutes</option>
        </select>

        <button
          onClick={acceptOrder}
          disabled={loading}
          className="rounded-xl bg-[#2E3416] px-5 font-semibold text-white hover:bg-[#475226] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Start"}
        </button>
      </div>
    </div>
  );
}