"use client";

import { useRouter } from "next/navigation";

export default function UpdateOrderButton({
  orderId,
  text,
  payment_status,
  status,
  color,
}: {
  orderId: string;
  text: string;
  payment_status?: string;
  status?: string;
  color: string;
}) {

  const router = useRouter();

  async function updateOrder() {

    const response = await fetch(
      "/api/orders/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          payment_status,
          status,
        }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      alert("Failed to update order.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={updateOrder}
      className={`rounded-full py-3 font-semibold text-white ${color}`}
    >
      {text}
    </button>
  );
}