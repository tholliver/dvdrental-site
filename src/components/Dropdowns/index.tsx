import React from 'react'
import { ClockIcon, ArrowDownIcon } from '../SVG'
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

// export default DropdownStyled

type DropdownProps<T> = {
  items: T[] | undefined | null
  handleFilter: (name: string) => void
}

const Dropdown = <T extends { name: string }>(props: DropdownProps<T>) => {
  return (
    <div>
      <ul
        className="py-1 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownActionButton"
      >
        {props.items?.map((item, i: number) => (
          <li key={i}>
            <a
              onClick={() => props.handleFilter(item.name)}
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const DropdownComponents = { Dropdown, DropdownStyled }
export default DropdownComponents
