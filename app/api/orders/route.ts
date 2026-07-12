import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { orderSchema } from "@/lib/validators";

export async function POST(req: Request) {

  const body = await req.json();

console.log("API RECEIVED:", body);

  try {
const parsed = orderSchema.safeParse(body);

if (!parsed.success) {
  return NextResponse.json(
    {
      error: "Invalid order data",
      details: parsed.error.flatten(),
    },
    {
      status: 400,
    }
  );
}

    const {
      name,
      phone,
      orderType,
      address,
      pickupTime,
      notes,
      subtotal,
      deliveryFee,
      total,
      cart,
      paymentMethod,
    } = parsed.data;


    const { data: order, error } = await supabase
    .from("orders")
    .insert({
        name,
        phone,
        order_type: orderType,
        address,
        pickup_time: pickupTime,
        notes,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        payment_method: paymentMethod,
  status: "received",
payment_status: "unpaid",
    })
    .select("id")
    .single();


    if (error) throw error;


const items = cart.map((item: any) => ({
  order_id: order.id,

  name:
    item.signature ??
    `${item.proteins?.map((p: any) => p.name).join(" / ")} Bowl`,

  quantity: item.quantity,
  price: item.price,

  details: item,
}));


    const { error: itemError } = await supabase
      .from("order_items")
      .insert(items);


    if (itemError) throw itemError;


    return NextResponse.json({
      success:true,
      order
    });


  } catch(error) {
  console.error("ORDER ERROR:", error);

  return NextResponse.json(
    {
      error: "Order creation failed",
      details: error instanceof Error ? error.message : String(error),
    },
    { status: 500 }
  );
}
}