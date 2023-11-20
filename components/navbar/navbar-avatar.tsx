import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function NavbarAvatar({
  avatar,
  fallback,
}: {
  avatar?: string | null;
  fallback?: string | null;
}) {
  return (
    <Avatar>
      <AvatarImage src={avatar || ""} alt="profile image" />
      <AvatarFallback>{fallback?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
}
