import { DeletePromptDialog } from "@/components/shared/delete-prompt-dialog";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { PostCard } from "@/features/posts/components/post-card"
import { useDeletePost } from "@/features/posts/hooks/use-delete-post";
import type { Post } from "@/features/posts/models/post"
import { useState } from "react";

interface MessageBoardProps {
  posts: Post[];
}

interface deleteDialogModel {
  open: boolean,
  id: number;
}

export const MessageBoard = ({ posts }: MessageBoardProps) => {
  const { data: user } = useAuth();
  const [ deleteDetails, setDeleteDetails ] = useState<deleteDialogModel>({
    open: false,
    id: 0,
  });
  const deletePost = useDeletePost();

  function handleSetDeleteDetails(open: boolean, id: number) {
    setDeleteDetails(() => {
      const newDetails = { open: open, id: id };
      return newDetails;
    })
  }

  function handleSetOpen(open: boolean) {
    setDeleteDetails(prev => {
      const newDetails = { open: open, id:prev.id };
      return newDetails;
    })
  }

  return (
    <div data-testid="message-board" className="flex flex-col gap-4 w-full">
      <DeletePromptDialog open={ deleteDetails.open } setOpen={ handleSetOpen } id={ deleteDetails.id } useDeleteMutate={ deletePost } />
      {
        posts.map((post, index) => (
          <article data-testid="post-card" key={ index } className="border-b-2 pb-4 px-2">
            <PostCard post={ post } user={ user } setOpen={ handleSetDeleteDetails } />
          </article>
        ))
      }
    </div>
  )
}