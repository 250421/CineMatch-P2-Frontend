import { NoPostFound } from "@/components/shared/no-post-found";
import { MessageBoard } from "@/features/boards/components/message-board"
import { useGetFavoriteGenres } from "@/features/genres/hooks/use-get-favorite-genres";
import { useGetGenres } from "@/features/genres/hooks/use-get-genres";
import { Genre } from "@/features/genres/models/genres";
import { useGetPosts } from "@/features/posts/hooks/use-get-posts";
import { useSidebarJotai } from "@/hooks/use-sidebarJotai";
import { cn } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/(auth)/_auth/message-board/$boardId")({
  component: MessageBoardComponent,
})

export function MessageBoardComponent() {
  const { isOpen } = useSidebarJotai();
  const { boardId } = Route.useParams();
  const { data: posts, isLoading } = useGetPosts(boardId);
  const { data: favoriteGenres, isLoading: isFavoriteGenresLoading } = useGetFavoriteGenres();
  const { data: genres } = useGetGenres();
  const navigate = useNavigate();

  // Check if the user has access to the message board
  useEffect(() => {
    if(!isFavoriteGenresLoading && favoriteGenres?.filter(value => value !== null).length === 0) {
      navigate({ to: "/select-genres" });
    } else if(genres && favoriteGenres) {
      const genre: Genre | undefined = genres.find((genre) => genre.id === Number(boardId));
      if(genre && !favoriteGenres.includes(genre.name)) {
        navigate({ to: `/` });
      }
    }
  }, [genres, favoriteGenres]);

  return (
    <>
      { isLoading ? 
        <div data-testid="loader" className="flex items-center justify-center w-full h-screen">
          <Loader2 className="size-8 animate-spin" />
        </div>
      :
        <div className={cn(
          "flex flex-row gap-4 mx-auto mt-[56px] transition-all duration-300 ease-in-out",
          isOpen ? "xl:px-20" : "lg:px-20 xl:px-40"
        )} data-test-id="message-board-container">
          { posts && (typeof posts === "object") && posts.length > 0 && posts && posts.length !== posts.filter(post => post.deleted === 1).length ?
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
