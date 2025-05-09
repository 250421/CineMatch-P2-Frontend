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
        <DropdownMenuTrigger>
          <UserProfile />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleLogOut}>
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
