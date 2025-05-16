import { DeletePromptDialog } from "@/components/shared/delete-prompt-dialog";
import { UpdatePostDialog } from "@/features/posts/components/update-post-dialog";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { PostCard } from "@/features/posts/components/post-card"
import { useDeletePost } from "@/features/posts/hooks/use-delete-post";
import type { Post } from "@/features/posts/models/post"
import { useState } from "react";
import { Loader } from "lucide-react";

interface MessageBoardProps {
  posts: Post[];
}

interface deleteDialogModel {
  open: boolean,
  id: number;
}

interface updateDialogModel {
  open: boolean,
  post: Post;
}

export const MessageBoard = ({ posts }: MessageBoardProps) => {
  const { data: user, isLoading } = useAuth();
  const [ deleteDetails, setDeleteDetails ] = useState<deleteDialogModel>({
    open: false,
    id: 0,
  });
  const [ updateDetails, setUpdateDetails ] = useState<updateDialogModel>({
    open: false,
    post: {
      id: 0,
      title: "",
      text: "",
      boardId: 0,
      image: undefined,
      has_spoiler: 0,
      created: "",
      username: "",
    } as Post,
  });
  const deletePost = useDeletePost();

  function handleSetDeleteDetails(open: boolean, id: number) {
    setDeleteDetails(() => {
      const newDetails = { open: open, id: id };
      return newDetails;
    })
  }

  function handleSetDeleteOpen(open: boolean) {
    setDeleteDetails(prev => {
      const newDetails = { open: open, id:prev.id };
      return newDetails;
    })
  }

  function handleSetUpdateDetails(open: boolean, post: Post) {
    setUpdateDetails(() => {
      const newDetails = { open: open, post: post };
      if(newDetails.post.image === null) newDetails.post.image = undefined;
      return newDetails;
    })
  }

  function handleSetUpdateOpen(open: boolean) {
    setUpdateDetails(prev => {
      const newDetails = { open: open, post: prev.post };
      return newDetails;
    })
  }

  if(isLoading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <Loader className="animate-spin size-8" />
      </div>
    )
  }

  return (
    <div data-testid="message-board" className="flex flex-col gap-4 w-full">
      <DeletePromptDialog open={ deleteDetails.open } setOpen={ handleSetDeleteOpen } id={ deleteDetails.id } useDeleteMutate={ deletePost } />
      <UpdatePostDialog open={ updateDetails.open } setOpen={ handleSetUpdateOpen } initialForm={ updateDetails.post } />
      {
        posts.map((post) => (
          post.deleted === 0 ? 
            <article data-testid="post-card" key={ `post-${post.id}` } className="border-b-2 pb-4 px-2">
              <PostCard post={ post } user={ user } setDeleteOpen={ handleSetDeleteDetails } setUpdateOpen={ handleSetUpdateDetails } />
            </article>
          : <div className="hidden" key={ `post-${post.id}` }></ div>
        ))
      }
    </div>
  )
}