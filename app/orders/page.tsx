"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("currentOrderId");

    if (id) {
      router.replace(`/order/${id}`);
    } else {
      router.replace("/menu");
    }
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F2E9]">
      <p className="text-lg text-stone-600">
        Loading your order...
      </p>
    </main>
  );
}