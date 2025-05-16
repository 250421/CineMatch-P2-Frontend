import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link, useNavigate } from "@tanstack/react-router"
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

interface PostCardProps {
  post: any;
  user: any;
  setDeleteOpen: (open: boolean, id: number) => void;
  setUpdateOpen: (open: boolean, post: Post) => void;
}

export const PostCard = ({ post, user, setDeleteOpen, setUpdateOpen }: PostCardProps) => {
  const navigate = useNavigate();
  const [viewSpoiler, setViewSpoiler] = useState(false);
  const [showComment, setShowComment] = useState(false);

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
    <Card className="w-[100%] py-2 gap-2 hover:bg-slate-100 w-full hover:cursor-pointer min-w-[18rem]" 
    // onClick={ () => navigate({ to: "/login" })}
    >
      <CardHeader className="px-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
          <Link to="/" onClick={ e => handleClickUsername(e) } className="flex flex-row items-center gap-1 hover:text-slate-500">
            <ProfileIcon name={ post?.username ?? "Anonymous" } />
            <span className="hover:underline">
              { post?.username ?? "Anonymous" }
            </span>
          </Link>
          <CardDescription className="flex flex-row items-center"><Dot /> <FormattedDate date={ post?.created ?? "" } /></CardDescription>
          </div>
          <div>
            <DropdownMenu>
              <div className="relative aspect-1/1 size-8">
                <DropdownMenuTrigger 
                  disabled={ post?.username !== user?.username && user?.role !== "ADMIN" } 
                  className="w-full h-full rounded-full flex justify-center items-center hover:bg-slate-200 hover:border-2"
                >
                  <Ellipsis />
                </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent>
                {
                  post?.username === user?.username ?
                  <>
                    <DropdownMenuItem onClick={ e => handleUpdate(e) }>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={ e => handleDelete(e) }>Delete</DropdownMenuItem>
                  </>
                :
                  user?.role === "ADMIN" ? 
                  <>
                    <DropdownMenuItem>Contains spoiler</DropdownMenuItem>
                    <DropdownMenuItem onClick={ e => handleDelete(e) }>Delete</DropdownMenuItem>
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
      <CardContent className="px-4">
        { post?.has_spoiler && !viewSpoiler ? 
          <HiddenContent setViewSpoiler={ handleViewSpoiler } />
        :
          post?.image ? <Image src={ post.image } /> : <p>{ post.text }</p>
        }
      </CardContent>
      <CardFooter className="flex flex-row gap-4 px-4 pt-2">
        <RatingButtonGroup id={ post?.id } initialRating={ post?.rating } />
        <InteractionButton Icon={ MessageSquare } value={ 9999 } label="comment" onClick={ handleClickComment } />
      </CardFooter>
        {showComment && (
        <>
      <div className="px-4 pb-4">
        <CommentBox postId={post.id} onCommentPosted={() => setShowComment(false)} />
      </div>

  </>
)}
<div className="px-4 pb-4">
    <CommentList postId={post.id} />
  </div>
    </Card>
  )
}
