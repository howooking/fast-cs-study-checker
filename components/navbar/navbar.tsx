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
import { Badge } from "../ui/badge";

export default async function Navbar() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: user } = await supabase
    .from("profiles")
    .select("id, user_name, avatar_url")
    .eq("id", session?.user.id as string)
    .single();

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
                체크하러가기
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
                스터디주제
              </Button>
              <Button variant="outline" className="sm:hidden block">
                <AiFillGithub />
              </Button>
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/CS-TeamStudy/CS_Study_for_Interview"
              target="_blank"
            >
              <Button variant="outline" className="hidden sm:block">
                우리들리포
              </Button>
              <Button variant="outline" className="sm:hidden block">
                <AiFillGithub />
              </Button>
            </Link>
          </li>

          <li className="flex items-center">
            {user ? (
              <div className="flex items-center gap-2">
                <Badge className="px-2 py-1">{user.user_name}</Badge>
                <NavbarAvatar
                  avatar={user.avatar_url}
                  fallback={user.user_name}
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
