import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const { id, is_done, user_name, type, link } = await request.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: session } = await supabase.auth.getSession();

  if (type === "done") {
    if (is_done) {
      const { data } = await supabase
        .from("subjects")
        .update({
          is_done: false,
          link: null,
          user_id: null,
        })
        .match({ id });

      return NextResponse.json(data);
    }
    const { data } = await supabase
      .from("subjects")
      .update({ is_done: true, user_id: session.session?.user.id })
      .match({ id });
    return NextResponse.json(data);
  }

  if (type === "link") {
    const { data } = await supabase
      .from("subjects")
      .update({ link })
      .match({ id });
    return NextResponse.json(data);
  }
}
