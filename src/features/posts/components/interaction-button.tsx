import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { type LucideIcon } from "lucide-react"
import type { MouseEvent } from "react";

interface InteractionButtonProps {
  Icon: LucideIcon;
  value: number;
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export const InteractionButton = ({ Icon, value, label, onClick }: InteractionButtonProps) => {
  const digit = [
    'k',
    'M',
    'B',
  ]
  function convertValue(val: number) {
    if(val < 1000) return val;

    let i = 0;
    while(val >= 1000) {
      val /= 1000;
      i++;
    }

    if(i - 1 < digit.length) return Math.floor(val) + digit[i - 1];
    return 0;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger 
          className="flex items-center gap-1 p-2 rounded-md hover:bg-slate-300 min-w-[85px] hover:cursor-pointer" 
          onClick={ onClick }
        >
          <Icon /> { convertValue(value) }
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{ label }</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
