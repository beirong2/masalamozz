"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statuses = [
  {
    id: "received",
    label: "Received",
  },
  {
    id: "preparing",
    label: "Preparing",
  },
  {
    id: "ready",
    label: "Ready",
  },
  {
    id: "completed",
    label: "Completed",
  },
];

export default function OrderStatusSelector({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState(false);
const router = useRouter();

async function updateStatus(status: string) {
  if (status === currentStatus) return;

  setLoading(true);

  try {
    const res = await fetch("/api/admin/update-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        status,
      }),
    });

    if (!res.ok) {
      console.error(await res.json());
      return;
    }

    router.refresh();
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-stone-600">
        Order Status
      </p>

      <select
        disabled={loading}
        value={currentStatus}
        onChange={(e) => updateStatus(e.target.value)}
        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-medium text-[#2E3416] shadow-sm transition focus:border-[#2E3416] focus:outline-none"
      >
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
}