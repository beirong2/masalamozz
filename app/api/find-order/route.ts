import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const { phone, email } = await req.json();

    if (!phone || !email) {
      return NextResponse.json(
        { error: "Missing information" },
        { status: 400 }
      );
    }

    const { data: orders, error } = await supabaseAdmin
      .from("orders")
      .select(`
        *,
        order_items (
          id,
          name,
          quantity,
          price,
          details
        )
      `)
      .eq("phone", phone)
      .eq("email", email)
      .order("created_at", {
        ascending: false,
      });


    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          error: "Could not find orders",
        },
        {
          status: 500,
        }
      );
    }


    return NextResponse.json({
      orders: orders ?? [],
    });


  } catch(error){

    console.error(error);

    return NextResponse.json(
      {
        error:"Server error",
      },
      {
        status:500,
      }
    );
  }
}