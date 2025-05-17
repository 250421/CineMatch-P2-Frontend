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
import { Board } from "@/features/boards/models/board"

interface MultiGenreSelectProps {
  values: number[]
  onSelect: (value: number[]) => void
  options: Board[]
  maxLimit: number
  label: string
}

export function MultiGenreSelect({ values, onSelect, options, maxLimit, label }: MultiGenreSelectProps) {
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
      <PopoverTrigger asChild data-testid="select-genre-trigger">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100%] justify-between h-fit"
          data-testid="select-genre-button"
        >
          <div className="flex gap-2 justify-start flex-wrap">
            {values.length > 0
              ? values.map((value) => (
                <Badge key={value} variant="outline">{ options.find(option => option.id === value)?.name }</Badge>
              ))
              : `Select ${label}...`}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={ `Search ${label}...` } />
          <CommandList>
            <CommandEmpty>No { label } found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={String(option.id)}
                  onSelect={(currentValue) => handleSelect(Number(currentValue)) }
                  data-testid="select-genre-option"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      values.includes(option.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}