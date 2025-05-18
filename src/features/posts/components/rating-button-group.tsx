import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import { useState, type MouseEvent } from "react";
import { useUpdateRating } from "../hooks/use-update-rating";
import { convertValue } from "@/lib/utils";

interface RatingButtonGroupProps {
  id: number
  initialRating: number;
}

export const RatingButtonGroup = ({ id, initialRating }: RatingButtonGroupProps) => {
  const { mutate: ratePost } =  useUpdateRating();
  const [rating, setRating] = useState(initialRating);
  const [likeBase, setLikeBase] = useState(false);
  const [dislikeBase, setDislikeBase] = useState(false);

  function handleClickLike(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setLikeBase((prev) => !prev);
    ratePost({ id: id, body: likeBase ? 0 : 1 }, {
      onSuccess: (response) => {
        setRating(() => {
          setDislikeBase(false);
          return response?.data.rating;
        });
      }
    });
  }

  function handleClickDisLike(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setDislikeBase((prev) => !prev);
    ratePost({ id: id, body: dislikeBase ? 0 : -1 }, {
      onSuccess: (response) => {
        setRating(() => {
          setLikeBase(false);
          return response?.data.rating;
        });
      }
    });
  }

  return (
    <div className="flex items-center gap-0 rounded-full bg-card-blue2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger 
            dir="ltr"
            className="flex items-center gap-1 p-2 rounded-md hover:bg-muted-text-blue hover:cursor-pointer rounded-l-full hover:text-blue-500"
            onClick={ handleClickLike }
          >
            <ArrowBigUp />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>I like this</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p className="min-w-[2rem] text-center font-medium">
        { convertValue(rating) }
      </p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
          dir="rtl"
            className="flex items-center gap-1 p-2 rounded-md hover:bg-muted-text-blue hover:cursor-pointer rounded-r-full hover:text-red-500"
            onClick={ handleClickDisLike }
          >
            <ArrowBigDown />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>I don't like this</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
