import { Button } from "@/components/ui/button";
import { useSidebarJotai } from "@/hooks/use-sidebarJotai";
import { cn } from "@/lib/utils";
import { Sidebar } from "lucide-react";
interface sidebarMainWrapper {
  children: React.ReactNode;
}

export const SidebarMainWrapper = ({ children }: sidebarMainWrapper) => {
  const { isOpen, toggle } = useSidebarJotai();

  return (
    <div>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={toggle}
        className="z-1 fixed m-3 my-4.5 z-50 cursor-pointer text-text-light hover:bg-focus border-1 border-focus"
      >
        <Sidebar />
      </Button>
      <div className={cn(isOpen ? "ml-64" : "ml-0")}>
        {children}
      </div>
    </div>
  );
};
