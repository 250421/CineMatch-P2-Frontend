import type { MouseEvent } from "react";
import { Button } from "../ui/button"

interface ImageProps {
  setViewSpoiler: (event: MouseEvent<HTMLDivElement>) => void;
}

export const Image = ({ setViewSpoiler }: ImageProps) => {
  return (
    <div className="overflow-hidden w-full aspect-3/2 rounded-lg border-2 relative" onClick={ e => setViewSpoiler(e) }>
      <div className="z-1 blur-xl bg-slate-300 w-full h-full hover:bg-slate-400">
      </div>
      <div className="absolute w-full h-full top-0 left-0 z-1 display flex justify-center items-center">
        <Button className="hover:cursor-pointer">View spoiler</Button>
      </div>
    </div>
  )
}
