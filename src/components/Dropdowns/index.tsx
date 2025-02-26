import React from 'react'
import { TimeLapseSelect, timeOptions } from '@/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { ChevronDown, Check } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface DropdownStyledProps {
  topRentalTimeLapse: TimeLapseSelect
  setTopRentalTimeLapse: (timeLapse: TimeLapseSelect) => void
  handleTimeLapseSelection: (timeLapse: TimeLapseSelect) => void
}
const DropdownStyled = (props: DropdownStyledProps) => {
  const [position, setPosition] = React.useState(
    `${props.topRentalTimeLapse.value}-${props.topRentalTimeLapse.time}`
  )

  const handleValueChange = (newValue: string) => {
    const [value, time] = newValue.split('-')
    props.setTopRentalTimeLapse({
      value: Number(value),
      time,
      label:
        timeOptions.find(
          (option) => option.value === Number(value) && option.time === time
        )?.label || '',
    }) // ✅ Correctly updating parent state
    setPosition(newValue)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{props.topRentalTimeLapse.label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Time Range</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={handleValueChange}
        >
          {timeOptions.map((item, i) => (
            <DropdownMenuRadioItem
              key={`${item.value}-${i}`}
              value={`${item.value}-${item.time}`} // ✅ Corrected value
            >
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// export default Dropdown
export interface DropdownOption {
  name: string
  value: string
}

interface DropdownProps {
  options: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
}

function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search options...',
  emptyMessage = 'No options found.',
  className,
}: DropdownProps) {
  const [open, setOpen] = React.useState(false)

  // Find the currently selected option
  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {selectedOption ? selectedOption.name : placeholder}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange?.(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
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

const DropdownComponents = { Dropdown, DropdownStyled }
export default DropdownComponents
