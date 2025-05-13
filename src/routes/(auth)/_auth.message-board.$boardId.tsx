import { MessageBoard } from "@/features/boards/components/message-board"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(auth)/_auth/message-board/$boardId")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-row gap-4 m-auto lg:p-20 xl:p-40">
      <MessageBoard />
      <div className="w-[25em] hidden md:block"></div>
    </div>
  );
}
