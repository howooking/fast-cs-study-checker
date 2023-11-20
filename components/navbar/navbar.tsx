import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import ToggleTheme from "@/components/toggle-theme";
import { NavbarAvatar } from "@/components/navbar/navbar-avatar";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  AiOutlineCheck,
  AiFillGithub,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";

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
      <nav className="flex items-center mx-auto py-1 gap-2 px-4">
        <Link
          href="/"
          className="text-xl text-primary hover:opacity-80 transition flex-1"
        >
          <Button variant="ghost" className="hidden sm:block">
            CS CHECKER
          </Button>
          <Button variant="outline" className="sm:hidden block">
            <AiOutlineHome />
          </Button>
        </Link>
        <ul className="flex items-center gap-1 justify-between">
          <li>
            <Link href="/subjects">
              <Button variant="outline" className="hidden sm:block">
                스터디체크
              </Button>
              <Button variant="outline" className="sm:hidden block">
                <AiOutlineCheck />
              </Button>
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/sudheerj/javascript-interview-questions#what-are-the-possible-ways-to-create-objects-in-javascript"
              target="_blank"
            >
              <Button variant="outline" className="hidden sm:block">
                스터디깃허브
              </Button>
              <Button variant="outline" className="sm:hidden block">
                <AiFillGithub />
              </Button>
            </Link>
          </li>

          <li className="flex items-center">
            {user ? (
              <div className="flex items-center gap-2">
                <NavbarAvatar
                  avatar={user?.user_metadata.avatar_url}
                  fallback={user.user_metadata.name}
                />
                <form action={signOut}>
                  <Button className="hidden sm:block" variant="destructive">
                    로그아웃
                  </Button>
                  <Button className="sm:hidden block" variant="destructive">
                    <AiOutlineLogout />
                  </Button>
                </form>
              </div>
            ) : (
              <Link href="/login">
                <Button className="hidden sm:block">로그인</Button>
                <Button className="sm:hidden block">
                  <AiOutlineLogin />
                </Button>
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
