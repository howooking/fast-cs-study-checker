import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cookies } from "next/headers";

export async function NavbarAvatar({ avatar }: { avatar?: string }) {
  return (
    <Avatar>
      <AvatarImage src={avatar} alt="profile image" />
      <AvatarFallback>{"HI"}</AvatarFallback>
    </Avatar>
  );
}
