import { useSidebarJotai } from "@/hooks/use-sidebarJotai";
import { cn } from "@/lib/utils";

interface sidebarGroupProp {
  children: React.ReactNode;
}

export const SidebarGroup = ({ children }: sidebarGroupProp) => {
  const { isOpen } = useSidebarJotai();
  return (
    <div
      className={cn(
        "transition-all duration-200 ease-in-out px-3 py-2 flex flex-col gap-y-2",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {children}
    </div>
  );
};
