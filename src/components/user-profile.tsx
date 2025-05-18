import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/features/auth/hooks/use-auth";

export const UserProfile = () => {
  const { data: user } = useAuth();

  const getInitials = (name: string) => {
    if (!name) return "";
    return (name[0] + name[1]).toUpperCase();
  };

  return (
    <Avatar>
      <AvatarFallback className="bg-bg-green2 border-1 border-border-green text-link-green"> {getInitials(user?.username ?? "")}</AvatarFallback>
    </Avatar>
  );
};
