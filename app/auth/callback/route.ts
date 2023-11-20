import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", session?.user.id as string)
    .single();

  if (data) {
    return NextResponse.redirect(requestUrl.origin);
  } else {
    return NextResponse.redirect(`${requestUrl.origin}/signup`);
  }
}
