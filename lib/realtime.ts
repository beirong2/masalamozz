import { supabase } from "@/lib/supabase";

export function subscribeToOrder(
  orderId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`order-${orderId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "orders",
        filter: `id=eq.${orderId}`,
      },
      callback
    )
    .subscribe((status) => {
    });
}