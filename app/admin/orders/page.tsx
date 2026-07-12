import UpdateOrderButton from "@/components/admin/UpdateOrderButton";
import AdminRealtime from "@/components/admin/AdminRealtime";
import AdminPoller from "@/components/admin/AdminPoller";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function statusStyle(status: string) {
  switch (status) {
    case "pending":
    case "pending_payment":
      return "bg-yellow-100 text-yellow-800";

    case "paid":
      return "bg-green-100 text-green-800";

    case "preparing":
      return "bg-blue-100 text-blue-800";

    case "ready":
      return "bg-purple-100 text-purple-800";

    case "completed":
      return "bg-stone-200 text-stone-700";

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



        <div className="grid gap-6">


          {orders?.map((order)=>(
            

            <div
              key={order.id}
              className="rounded-3xl bg-white p-6 shadow-md"
            >


              <div className="flex flex-col gap-4 md:flex-row md:justify-between">


                <div>

  <div className="flex items-center gap-3">

    <h2 className="text-xl font-bold">
      {order.name}
    </h2>

    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(order.status)}`}
    >
      {order.status}
    </span>

  </div>

  <p className="mt-2 text-stone-600">
    {order.phone}
  </p>

  <p className="text-stone-600">
    {order.order_type === "delivery"
      ? `Delivery: ${order.address}`
      : "Pickup"}
  </p>

</div>


                <div className="text-right">

                  <p className="text-3xl font-bold text-[#2E3416]">
                    ${Number(order.total).toFixed(2)}
                  </p>


                  <p className="text-sm text-stone-500">
                    {new Date(order.created_at).toLocaleString("en-US", {
                      timeZone: "America/Los_Angeles",
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>

                </div>


              </div>



              <div className="my-5 border-t"/>



              <div className="space-y-3">

                {order.order_items?.map((item:any)=>(

                  <div
                    key={item.id}
                    className="flex justify-between rounded-xl bg-stone-50 p-3"
                  >

                    <span>
                      {item.quantity} × {item.name}
                    </span>


                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                  </div>

                ))}

              </div>



              {order.notes && (

                <div className="mt-5 rounded-xl bg-[#F5F1E8] p-4">

                  <p className="font-semibold">
                    Notes
                  </p>

                  <p className="text-stone-700">
                    {order.notes}
                  </p>

                </div>

              )}



              <div className="mt-6 grid gap-3 sm:grid-cols-3">


<div className="mt-6 grid gap-3 sm:grid-cols-2">

  {order.payment_status === "unpaid" && (
    <div className="rounded-full bg-yellow-100 py-3 text-center font-semibold text-yellow-700">
      Waiting for Customer
    </div>
  )}

  {order.payment_status === "awaiting_confirmation" && (
    <UpdateOrderButton
      orderId={order.id}
      text="Confirm Payment"
      payment_status="paid"
      color="bg-green-700 hover:bg-green-800"
    />
  )}

  {order.payment_status === "paid" &&
    order.status === "pending" && (
      <UpdateOrderButton
        orderId={order.id}
        text="Start Preparing"
        status="preparing"
        color="bg-[#2E3416] hover:bg-[#475226]"
      />
    )}

  {order.status === "preparing" && (
    <UpdateOrderButton
      orderId={order.id}
      text="Mark Ready"
      status="ready"
      color="bg-purple-700 hover:bg-purple-800"
    />
  )}

  {order.status === "ready" && (
    <UpdateOrderButton
      orderId={order.id}
      text="Complete Order"
      status="completed"
      color="bg-stone-700 hover:bg-stone-800"
    />
  )}

  {order.status === "completed" && (
    <div className="rounded-full bg-green-100 py-3 text-center font-semibold text-green-700">
      ✓ Completed
    </div>
  )}

</div>


              </div>


            </div>


          ))}


        </div>


      </div>


    </main>
  );
}