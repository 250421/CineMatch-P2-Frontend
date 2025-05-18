import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "@tanstack/react-router"
import { Dot, Ellipsis, MessageSquare } from "lucide-react"
import { InteractionButton } from "./interaction-button"
import { useState, type MouseEvent } from "react"
import { HiddenContent } from "@/components/shared/hidden-content"
import { FormattedDate } from "@/components/shared/formatted-date"
import { Image } from "@/components/shared/image"
import { ProfileIcon } from "@/components/shared/profile-icon"
import { CommentBox } from "@/components/comments/comment-box";
import { CommentList } from "@/components/comments/comment-list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Post } from "../models/post"
import { RatingButtonGroup } from "./rating-button-group"
import { useFetchComments } from "@/features/comments/hooks/use-fetch-comments"

interface PostCardProps {
  post: any;
  user: any;
  setDeleteOpen: (open: boolean, id: number) => void;
  setUpdateOpen: (open: boolean, post: Post) => void;
}

export const PostCard = ({ post, user, setDeleteOpen, setUpdateOpen }: PostCardProps) => {
  //const navigate = useNavigate();
  const [viewSpoiler, setViewSpoiler] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const comments = useFetchComments(post?.id);

  const filteredComments = comments.filter(c => c.deleted === 0);

  function handleClickUsername(event: MouseEvent<HTMLAnchorElement>) {
    event.stopPropagation();
    console.log("should redirect to user profile");
  }

  function handleClickComment(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    console.log("user commented");
    setShowComment((prev) => !prev);
  }

  function handleViewSpoiler(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    setViewSpoiler(true);
  }

  function handleDelete(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    setDeleteOpen(true, post?.id);
  }

  function handleUpdate(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    setUpdateOpen(true, post);
  }

  return (
    <Card className="w-[100%] py-2 gap-2 w-full min-w-[18rem] bg-card-blue/90 border-border-blue text-text-bright" 
    // onClick={ () => navigate({ to: "/login" })}
    >
      <CardHeader className="px-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
          <Link to="/" onClick={ e => handleClickUsername(e) } className="flex flex-row items-center gap-1 hover:text-link-green">
            <ProfileIcon name={ post?.username ?? "Anonymous" } />
            <span className="font-medium pl-1 text-button hover:text-text-light">
              { post?.username ?? "Anonymous" }
            </span>
          </Link>
          <CardDescription className="flex flex-row items-center text-muted-text-blue2"><Dot /> <FormattedDate date={ post?.created ?? "" } /></CardDescription>
          </div>
          <div>
            <DropdownMenu>
              <div className="relative aspect-1/1 size-8">
                <DropdownMenuTrigger 
                  disabled={ post?.username !== user?.username && user?.role !== "ADMIN" } 
                  className="w-full h-full rounded-full flex justify-center items-center hover:bg-muted-text-blue cursor-pointer"
                >
                  <Ellipsis />
                </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent className="bg-card-blue3 border-border-blue text-text-light">
                {
                  post?.username === user?.username ?
                  <>
                    <DropdownMenuItem className="focus:bg-button cursor-pointer" onClick={ e => handleUpdate(e) }>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-red-500 cursor-pointer text-red-500" onClick={ e => handleDelete(e) }>Delete</DropdownMenuItem>
                  </>
                :
                  user?.role === "ADMIN" ? 
                  <>
                    <DropdownMenuItem className="focus:bg-button cursor-pointer">Contains spoiler</DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-red-500 cursor-pointer text-red-500" onClick={ e => handleDelete(e) }>Delete</DropdownMenuItem>
                  </>
                  :
                    <></>
                }
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardTitle className="text-xl mt-2">{ post?.title }</CardTitle>
      </CardHeader>
      <CardContent className="px-4 text-muted-text-blue3">
        { post?.has_spoiler && !viewSpoiler ? 
          <HiddenContent setViewSpoiler={ handleViewSpoiler } />
        :
          <div className="flex flex-col gap-2">
            <p>{ post.text }</p>
            {post?.image && <Image src={ post.image } />}
            </div>
        }
      </CardContent>
      <CardFooter className="flex flex-row gap-4 px-4 pt-2">
        <RatingButtonGroup id={ post?.id } initialRating={ post?.rating } />
        <InteractionButton Icon={ MessageSquare } value={ filteredComments.length } label="comment" onClick={ handleClickComment } />
      </CardFooter>
        {showComment && (
        <>
      <div className="px-4 pb-4">
        <CommentBox postId={post.id} onCommentPosted={() => setShowComment(false)} />
      </div>

  </>
)}
<div className="px-4 pb-4">
    <CommentList postId={post.id} comments={filteredComments} />
  </div>
    </Card>
  )
}
