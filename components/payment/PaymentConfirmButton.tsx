"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { subscribeToOrder } from "@/lib/realtime";

export default function PaymentConfirmButton({
  orderId,
}: {
  orderId: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const channel = subscribeToOrder(orderId, (payload) => {
      router.refresh();
    });

    return () => {
      channel.unsubscribe();
    };
  }, [orderId, router]);

  async function confirmPayment() {
    setLoading(true);

    const response = await fetch("/api/orders/payment-confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    });

    setLoading(false);

    if (!response.ok) {
      alert("Payment update failed.");
      return;
    }

    // Immediately refresh after our own update
    router.push("/find-order");
  }

  return (
    <button
      onClick={confirmPayment}
      disabled={loading}
      className="mt-8 w-full rounded-full bg-[#2E3416] py-4 font-semibold text-white disabled:opacity-50"
    >
      {loading ? "Submitting..." : "I've Sent Payment"}
    </button>
  );
}