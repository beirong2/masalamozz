import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

const { data: admin } = await supabase
  .from("admins")
  .select("id")
  .eq("id", user.id)
  .single();

if (!admin) {
  return NextResponse.json(
    { error: "Forbidden" },
    { status: 403 }
  );
}
  try {
    const { orderId } = await req.json();


    const result = await supabaseAdmin
      .from("orders")
      .update({
        payment_status: "awaiting_confirmation",
      })
      .eq("id", orderId)
      .select();


    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json(e, { status: 500 });
  }
}