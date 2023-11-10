import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const { id, is_done, user_name } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  if (is_done === true) {
    const { data } = await supabase
      .from("subjects")
      .update({ is_done: !is_done, user_name: null, link: null })
      .match({ id });
    return NextResponse.json(data);
  }
  const { data } = await supabase
    .from("subjects")
    .update({ is_done: !is_done, user_name })
    .match({ id });
  return NextResponse.json(data);
}
