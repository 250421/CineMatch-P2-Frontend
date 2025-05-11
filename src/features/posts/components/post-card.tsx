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
import type { MouseEvent } from "react"

export const PostCard = () => {
  const navigate = useNavigate();

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

  return (
    <Card className="w-[100%] py-2 gap-2 hover:bg-slate-100" onClick={ () => navigate({ to: "/login" }) }>
      <CardHeader className="px-4">
        <div className="flex flex-row items-center">
          <Link to="/" onClick={ e => handleClickUsername(e) } className="flex flex-row items-center gap-1 hover:text-slate-500">
            <ProfileIcon name="username" /><span className="hover:underline">username</span>
          </Link>
          <CardDescription className="flex flex-row items-center"><Dot /> 5 hrs ago</CardDescription>
        </div>
        <CardTitle className="text-xl mt-2">Post Title</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis orci eu viverra hendrerit. Aliquam consectetur nec tellus at fermentum. Duis euismod convallis nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus elit nulla, ornare id dapibus ut, lobortis in odio. Nam accumsan interdum</p>
      </CardContent>
      <CardFooter className="flex flex-row gap-4 px-4 pt-2">
        <InteractionButton Icon={ Heart } value={ 999999 } label="like" onClick={ handleClickLike } />
        <InteractionButton Icon={ MessageSquare } value={ 9999 } label="comment" onClick={ handleClickComment } />
      </CardFooter>
    </Card>
  )
}
