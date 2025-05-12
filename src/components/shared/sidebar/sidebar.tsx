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
      "fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out",
      isOpen ? "w-64 bg-sky-200 border-r" : "w-0"
    )}>
      {children}
    </div>
  );
};
