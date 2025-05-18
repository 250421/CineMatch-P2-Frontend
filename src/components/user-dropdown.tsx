import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserProfile } from "./user-profile";
import { useConfirm } from "@/hooks/use-confirm";
import { LogOut } from "lucide-react";
import { useLogout } from "@/features/auth/hooks/use-logout";

export const UserDropdown = () => {
  const [logOutConfirm, LogOutDialog] = useConfirm();
  const { mutate: logOut } = useLogout();

  const handleLogOut = async () => {
    const ok = await logOutConfirm();
    if (!ok) return;
    logOut();
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <UserProfile />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card-green2 border-border-green text-text-light">
          <DropdownMenuItem onClick={handleLogOut} className="hover:bg-red-500 focus:bg-red-500 cursor-pointer">
            <LogOut className="size-4 mr-2" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogOutDialog
        title="Log Out"
        description="Are you sure you want to log out?"
        destructive
      />
    </>
  );
};
