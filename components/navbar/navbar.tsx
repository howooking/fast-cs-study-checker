import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Button } from "@/components/ui/button";
import ToggleTheme from "@/components/toggle-theme";
import { NavbarAvatar } from "@/components/navbar/navbar-avatar";

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b-[1px]">
      <nav className="flex items-center justify-between container py-1">
        <Link
          href="/"
          className="text-xl text-primary hover:opacity-80 transition sm:text-3xl pr-2"
        >
          CS CHECKER
        </Link>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/subjects">
              <Button variant="outline">스터디주제</Button>
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/sudheerj/javascript-interview-questions#what-are-the-possible-ways-to-create-objects-in-javascript"
              target="_blank"
            >
              <Button variant="outline">스터디깃허브</Button>
            </Link>
          </li>
          <li>
            <Link href="/statistic">
              <Button variant="outline">통계</Button>
            </Link>
          </li>
          <li className="flex items-center">
            {user ? (
              <NavbarAvatar />
            ) : (
              <Link href="/login">
                <Button>로그인</Button>
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
