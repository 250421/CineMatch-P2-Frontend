import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link, useNavigate } from "@tanstack/react-router"
import { ProfileIcon } from "../../../components/shared/profile-icon"
import { Dot, Heart, MessageSquare } from "lucide-react"
import { InteractionButton } from "./interaction-button"
import { useState, type MouseEvent } from "react"
import { HiddenContent } from "@/components/shared/hidden-content"
import { FormattedDate } from "@/components/shared/formatted-date"
import { Image } from "@/components/shared/image"

interface PostCardProps {
  post: any
}

export const PostCard = ({ post }: PostCardProps) => {
  const navigate = useNavigate();
  const [viewSpoiler, setViewSpoiler] = useState(false);

  function handleClickUsername(event: MouseEvent<HTMLAnchorElement>) {
    event.stopPropagation();
    console.log("should redirect to user profile");
  }

  function handleClickLike(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    console.log("user liked");
  }

  function handleClickComment(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    console.log("user commented");
  }

  function handleViewSpoiler(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    setViewSpoiler(true);
  }

  return (
    <Card className="w-[100%] py-2 gap-2 hover:bg-slate-100 w-full hover:cursor-pointer" onClick={ () => navigate({ to: "/login" }) }>
      <CardHeader className="px-4">
        <div className="flex flex-row items-center">
          <Link to="/" onClick={ e => handleClickUsername(e) } className="flex flex-row items-center gap-1 hover:text-slate-500">
            <ProfileIcon name="username" /><span className="hover:underline">username</span>
          </Link>
          <CardDescription className="flex flex-row items-center"><Dot /> <FormattedDate date={ post?.created ?? "" } /></CardDescription>
        </div>
        <CardTitle className="text-xl mt-2">{ post?.title }</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        { post?.hasSpoiler && !viewSpoiler ? 
          <HiddenContent setViewSpoiler={ handleViewSpoiler } />
        :
          post?.image ? <Image src={ post.image } /> : <p>{ post.text }</p>
        }
      </CardContent>
      <CardFooter className="flex flex-row gap-4 px-4 pt-2">
        <InteractionButton Icon={ Heart } value={ 999999 } label="like" onClick={ handleClickLike } />
        <InteractionButton Icon={ MessageSquare } value={ 9999 } label="comment" onClick={ handleClickComment } />
      </CardFooter>
    </Card>
  )
}
