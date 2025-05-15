import { NoPostFound } from "@/components/shared/no-post-found";
import { MessageBoard } from "@/features/boards/components/message-board"
import { useGetPosts } from "@/features/posts/hooks/use-get-posts";
import { useSidebarJotai } from "@/hooks/use-sidebarJotai";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router"
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/(auth)/_auth/message-board/$boardId")({
  component: MessageBoardComponent,
})

function MessageBoardComponent() {
  const { isOpen } = useSidebarJotai();
  const { boardId } = Route.useParams();
  const { data: posts, isLoading } = useGetPosts(boardId);

  return (
    <>
      { isLoading ? 
        <div className="flex items-center justify-center w-full h-screen">
          <Loader2 className="size-8 animate-spin" />
        </div>
      :
        <div className={cn(
          "flex flex-row gap-4 mx-auto mt-[56px] transition-all duration-300 ease-in-out",
          isOpen ? "xl:px-20" : "lg:px-20 xl:px-40"
        )}>
          { posts && (typeof posts === "object") && posts.length > 0 ?
              <MessageBoard posts={ posts } />
            :
              <NoPostFound />
          }
          <div className={ cn(
            "w-[25em] hidden",
            isOpen ? "lg:block" : "md:block"
          )}></div>
        </div>
      }
    </>
  );
}
