import { PostCard } from "@/features/posts/components/post-card"

const posts = [
  {
    id: 1,
    dateCreated: "2025-05-03T01:47:37.254+00:00",
    title: "This is a tile about a move",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis orci eu viverra hendrerit. Aliquam consectetur nec tellus at fermentum. Duis euismod convallis nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus elit nulla, ornare id dapibus ut, lobortis in odio. Nam accumsan interdum",
    hasSpoiler: false
  },
  {
    id: 2,
    dateCreated: "2025-05-03T01:47:37.254+00:00",
    title: "This is a tile about a move",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis orci eu viverra hendrerit. Aliquam consectetur nec tellus at fermentum. Duis euismod convallis nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus elit nulla, ornare id dapibus ut, lobortis in odio. Nam accumsan interdum",
    hasSpoiler: true
  },
]

export const MessageBoard = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {
        posts.map((post, index) => (
          <article key={ index } className="border-b-2 pb-4 px-2">
            <PostCard post={ post } />
          </article>
        ))
      }
    </div>
  )
}
