import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { nickname } = await request.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase.from("profiles").insert([
    {
      id: session?.user.id as string,
      user_name: nickname,
      avatar_url: session?.user.user_metadata.avatar_url,
    },
  ]);

  return NextResponse.json(data);
}
