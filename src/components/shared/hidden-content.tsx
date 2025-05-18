import type { MouseEvent } from "react";
import { Button } from "../ui/button"

interface HiddenContentProps {
  setViewSpoiler: (event: MouseEvent<HTMLDivElement>) => void;
}

export const HiddenContent = ({ setViewSpoiler }: HiddenContentProps) => {
  return (
    <div className="overflow-hidden w-full aspect-3/2 rounded-lg border-2 border-border-blue relative" onClick={ e => setViewSpoiler(e) }>
      <div className="z-1 blur-xl bg-bg-blue2 w-full h-full">
      </div>
      <div className="absolute w-full h-full top-0 left-0 z-1 display flex justify-center items-center">
        <Button className="hover:cursor-pointer bg-border-blue hover:bg-muted-text-blue2 drop-shadow-md text-text-light">View spoiler</Button>
      </div>
    </div>
  )
}
