import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {

  try {

    const { orderId } = await req.json();


    const { error } = await supabase
      .from("orders")
      .update({
        payment_status: "paid",
      })
      .eq("id", orderId);


    if (error) throw error;


    return NextResponse.json({
      success: true,
    });


  } catch(error) {

    console.error(error);

    return NextResponse.json(
      {
        success:false,
        error:"Could not confirm payment"
      },
      {
        status:500
      }
    );
  }
}