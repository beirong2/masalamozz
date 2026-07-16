import UpdateOrderButton from "@/components/admin/UpdateOrderButton";
import AdminRealtime from "@/components/admin/AdminRealtime";
import AdminPoller from "@/components/admin/AdminPoller";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import OrderTimeline from "@/components/orders/OrderTimeline";
import AcceptOrderButton from "@/components/admin/AcceptOrderButton";
import AdminOrders from "@/components/admin/AdminOrders";

function statusStyle(status: string) {
  switch (status) {
    case "received":
      return "bg-yellow-100 text-yellow-800";

    case "preparing":
      return "bg-blue-100 text-blue-800";

    case "ready":
      return "bg-purple-100 text-purple-800";

    case "completed":
      return "bg-green-100 text-green-800";
    case "paid":
      return "bg-green-100 text-green-800";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!admin) {
    redirect("/");
  }

const { data: orders, error } = await supabase
  .from("orders")
  .select(`
    *,
    order_items (*)
  `)
  .order("created_at", {
    ascending: false,
  });

console.log("ADMIN ORDERS:", orders);
console.log("ADMIN ERROR:", error);

  return (
    <main className="min-h-screen bg-[#F5F1E8] p-8">

      <AdminRealtime />

      <div className="mx-auto max-w-6xl"></div>

      <div className="mx-auto max-w-6xl">


        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-[#2E3416]">
              Orders
            </h1>

            <p className="mt-1 text-stone-600">
              Manage incoming customer orders
            </p>
          </div>


          <div className="rounded-2xl bg-white px-5 py-3 shadow">
            <p className="text-sm text-stone-500">
              Active Orders
            </p>
            

            <p className="text-2xl font-bold text-[#2E3416]">
              {orders?.length ?? 0}
              
            </p>
            
          </div>
          

        </div>
        <AdminOrders orders={orders ?? []} />






      </div>


    </main>
  );
}