 import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from 'react'
import { Badge } from "../ui/badge"
import { toast } from "sonner"
import type { Movie } from "@/features/genres/models/movie"

interface MultiMovieSelectProps {
  values: number[]
  onSelect: (value: number[]) => void
  options: Movie[]
  maxLimit: number
  label: string
}

export function MultiMovieSelect({ values, onSelect, options, maxLimit, label }: MultiMovieSelectProps) {
  const [open, setOpen] = useState(false)

  function handleSelect(value: number) {
    if(values.length === maxLimit && !values.includes(value)) {
      toast(`You can only select up to ${maxLimit} ${label}.`)
      return
    }
    const newValues = values.includes(value)? values.filter(item => item !== value) : [...values, value]
    onSelect(newValues);
  }
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100%] justify-between h-fit bg-bg-green2 border-border-green hover:bg-focus cursor-pointer"
        >
          <div className="flex gap-2 justify-start flex-wrap">
            {values.length > 0
              ? values.map((value) => (
                <Badge key={value} variant="outline" className="border-border-green bg-button">{ options.find(option => option.id === value)?.title }</Badge>
              ))
              : `Select ${label}...`}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 border-border-green">
        <Command className="bg-card-green3 text-button">
          <CommandInput placeholder={ `Search ${label}...` } />
          <CommandList>
            <CommandEmpty>No { label } found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={String(option.id)}
                  onSelect={(currentValue) => handleSelect(Number(currentValue)) }
                  className="focus:bg-focus data-[selected=true]:bg-focus"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-text-light",
                      values.includes(option.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}