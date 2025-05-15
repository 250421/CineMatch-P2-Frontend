import { PostCard } from "@/features/posts/components/post-card"
import type { Post } from "@/features/posts/models/post"

interface MessageBoardProps {
  posts: Post[];
}

export const MessageBoard = ({ posts }: MessageBoardProps) => {
  return (
    <div data-testid="message-board" className="flex flex-col gap-4 w-full">
      {
        posts.map((post, index) => (
          <article data-testid="post-card" key={ index } className="border-b-2 pb-4 px-2">
            <PostCard post={ post } />
          </article>
        ))
      }
    </div>
  )
}