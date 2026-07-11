"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminRealtime() {
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [router]);

  return null;
}