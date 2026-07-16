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
const {
  orderId,
  payment_status,
  status,
  estimated_ready_at,
} = await req.json();

    const updates: Record<string, unknown> = {};

    if (payment_status) {
      updates.payment_status = payment_status;
    }

    if (status) {
      updates.status = status;
    }

    if (estimated_ready_at) {
  updates.estimated_ready_at = estimated_ready_at;
}

    const { data, error } = await supabaseAdmin
      .from("orders")
      .update(updates)
      .eq("id", orderId)
      .select();

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          error,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}