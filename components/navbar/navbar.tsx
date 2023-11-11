import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import ToggleTheme from "@/components/toggle-theme";
import { NavbarAvatar } from "@/components/navbar/navbar-avatar";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Navbar() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <header className="border-b-[1px]">
      <nav className="flex items-center justify-between container py-1">
        <Link
          href="/"
          className="text-xl text-primary hover:opacity-80 transition hidden sm:block"
        >
          CS CHECKER
        </Link>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/subjects">
              <Button variant="outline" className="text-xs sm:text-base">
                스터디체크
              </Button>
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/sudheerj/javascript-interview-questions#what-are-the-possible-ways-to-create-objects-in-javascript"
              target="_blank"
            >
              <Button variant="outline" className="text-xs sm:text-base">
                스터디깃허브
              </Button>
            </Link>
          </li>

          <li className="flex items-center">
            {user ? (
              <div className="flex items-center gap-2">
                <NavbarAvatar avatar={user?.user_metadata.avatar_url} />
                <form action={signOut}>
                  <Button variant="destructive">로그아웃</Button>
                </form>
              </div>
            ) : (
              <Link href="/login">
                <Button className="text-xs sm:text-base">로그인</Button>
              </Link>
            )}
          </li>
          <li>
            <ToggleTheme />
          </li>
        </ul>
      </nav>
    </header>
  );
}
