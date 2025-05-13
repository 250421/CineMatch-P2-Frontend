import { MessageBoard } from "@/features/boards/components/message-board"
import { useSidebarJotai } from "@/hooks/use-sidebarJotai";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(auth)/_auth/message-board/$boardId")({
  component: MessageBoardComponent,
})

function MessageBoardComponent() {
  const { isOpen } = useSidebarJotai();

  return (
    <div className={cn(
      "flex flex-row gap-4 mx-auto mt-[56px] transition-all duration-300 ease-in-out",
      isOpen ? "xl:px-20" : "lg:px-20 xl:px-40"
    )}>
      <MessageBoard />
      <div className={ cn(
        "w-[25em] hidden",
        isOpen ? "lg:block" : "md:block"
      )}></div>
    </div>
  );
}
