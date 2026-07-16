"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CurrentOrderLink() {
  const [hasOrder, setHasOrder] = useState(false);

  useEffect(() => {
    setHasOrder(!!localStorage.getItem("currentOrderId"));
  }, []);

  if (!hasOrder) return null;

  return (
    <Link
      href="/orders"
      className="font-medium text-[#2E3416] hover:text-[#C97A17]"
    >
      Current Order
    </Link>
  );
}