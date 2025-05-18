import { useSidebarJotai } from "@/hooks/use-sidebarJotai";
import { cn } from "@/lib/utils";

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  const { isOpen } = useSidebarJotai();

  return (
    <div className=
    {cn(
      "z-0 fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out mt-[72px] pt-4",
      isOpen ? "w-64 bg-card-green3/90 border-r border-border-green px-2" : "w-0"
    )}>
      {children}
    </div>
  );
};
