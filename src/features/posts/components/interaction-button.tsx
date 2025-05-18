import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { convertValue } from "@/lib/utils";
import { type LucideIcon } from "lucide-react"
import type { MouseEvent } from "react";

interface InteractionButtonProps {
  Icon: LucideIcon;
  value: number;
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export const InteractionButton = ({ Icon, value, label, onClick }: InteractionButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger 
          className="flex items-center gap-1 p-2 px-3 rounded-full bg-card-blue2 hover:bg-muted-text-blue min-w-[60px] hover:cursor-pointer font-medium" 
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
