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
    <nav className="flex items-center justify-between container border-b-[1px] py-2 top-0">
      <Link
        href="/"
        className="text-xl text-primary hover:opacity-80 transition sm:text-3xl pr-2"
      >
        CS CHECKER
      </Link>
      <ul className="flex items-center gap-4">
        <li>
          <Link
            href="https://github.com/sudheerj/javascript-interview-questions#what-are-the-possible-ways-to-create-objects-in-javascript"
            target="_blank"
          >
            <Button variant="outline">GITHUB</Button>
          </Link>
        </li>
        <li className="flex items-center">
          {user ? (
            <NavbarAvatar />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </li>
        <li>
          <ToggleTheme />
        </li>
      </ul>
    </nav>
  );
}
