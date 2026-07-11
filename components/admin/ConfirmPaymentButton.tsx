"use client";

import { useRouter } from "next/navigation";

export default function ConfirmPaymentButton({
  orderId,
}: {
  orderId: string;
}) {

  const router = useRouter();

  async function confirmPayment() {

    const response = await fetch(
      "/api/orders/confirm-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      router.refresh();
    } else {
      alert("Failed to confirm payment.");
    }
  }

  return (
    <button
      onClick={confirmPayment}
      className="rounded-full bg-green-700 py-3 font-semibold text-white hover:bg-green-800"
    >
      Confirm Payment
    </button>
  );
}