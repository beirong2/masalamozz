"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPoller() {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 3000);

    return () => clearInterval(interval);
  }, [router]);

  return null;
}