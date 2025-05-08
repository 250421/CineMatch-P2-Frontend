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

interface MultiSelectProps {
  values: string[]
  onSelect: (value: string[]) => void
  options: string[]
  maxLimit: number
  label: string
}

export function MultiSelect({ values, onSelect, options, maxLimit, label }: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  function handleSelect(value: string) {
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
          className="w-[100%] justify-between h-fit"
        >
          <div className="flex gap-2 justify-start flex-wrap">
            {values.length > 0
              ? values.map((value) => (
                <Badge key={value} variant="outline">{ options.find(option => option === value) }</Badge>
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
                  key={option}
                  value={option}
                  onSelect={(currentValue) => handleSelect(currentValue) }
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      values.includes(option) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}