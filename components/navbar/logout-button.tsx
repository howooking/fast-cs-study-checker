import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase-server";
import { Button } from "../ui/button";

export default async function LogoutButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const signOut = async () => {
    "use server";
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <form action={signOut}>
      <Button variant="destructive">Logout</Button>
    </form>
  );
}
