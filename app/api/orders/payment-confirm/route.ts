import { supabaseAdmin } from "@/lib/supabase-admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        {
          error: "Missing order id",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("orders")
      .update({
        payment_status: "awaiting_confirmation",
      })
      .eq("id", orderId)
      .select()
      .single();

    if (error) {
      console.error("PAYMENT CONFIRM ERROR:", error);

      return NextResponse.json(
        {
          error: "Could not update payment",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      order: data,
    });

  } catch (error) {
    console.error("PAYMENT ROUTE ERROR:", error);

    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}