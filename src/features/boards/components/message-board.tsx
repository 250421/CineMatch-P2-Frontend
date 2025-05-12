import { PostCard } from "@/features/posts/components/post-card"

const posts = [
  {},
  {},
  {},
  {},
  {}
]

export const MessageBoard = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {
        posts.map((_, index) => (
          <article key={ index } className="border-b-2 pb-4 px-2">
            <PostCard />
          </article>
        ))
      }
    </div>
  )
}
