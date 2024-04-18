import React from 'react'
import { ClockIcon, ArrowDownIcon } from '../SVG'
import { TimeLapseSelect, timeOptions } from '@/types'

type DropdownProps<T> = {
  items: T[] | undefined
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

interface DropdownStyledProps {
  isTopRentalTLOpen: boolean

  // setIsTopRentalTLOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleTimeLapseFilter: () => void
  topRentalTimeLapse: TimeLapseSelect | undefined
  handleTimeLapseSelection: (timeLapse: TimeLapseSelect) => void
  // setTopRentalTimeLapse: React.Dispatch<React.SetStateAction<string>>
}

const DropdownStyled = (props: DropdownStyledProps) => {
  return (
    <div>
      <div>
        <button
          id="dropdownRadioButton"
          data-dropdown-toggle="dropdownRadio"
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
          onClick={props.handleTimeLapseFilter}
        >
          <ClockIcon />
          {props.topRentalTimeLapse?.label}
          <ArrowDownIcon />
        </button>
        <div
          id="dropdownRadio"
          className={`absolute z-30 ${
            props.isTopRentalTLOpen ? '' : 'hidden'
          }  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
          data-popper-reference-hidden=""
          data-popper-escaped=""
          data-popper-placement="top"
          //   style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(522.5px, 3847.5px, 0px);"
        >
          <ul
            className=" p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownRadioButton"
          >
            {timeOptions.map((option) => (
              <li
                key={`${option.time}_${option.value}`}
                onClick={() => props.handleTimeLapseSelection(option)}
              >
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  {/* <input
                    id={`filter-radio-${option.value}`}
                    type="radio"
                    value={option.value}
                    name="filter-radio"
                    onChange={() => props.setTopRentalTimeLapse(option.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  /> */}
                  <p
                    // htmlFor={`filter-radio-${option.value}`}
                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    {option.label}
                  </p>
                </div>
              </li>
            ))}

            {/* <li>
              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  id="filter-radio-example-2"
                  type="radio"
                  value=""
                  name="filter-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="filter-radio-example-2"
                  className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                >
                  Last 7 days
                </label>
              </div>
            </li>
            <li>
              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  id="filter-radio-example-3"
                  type="radio"
                  value=""
                  name="filter-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="filter-radio-example-3"
                  className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                >
                  Last 30 days
                </label>
              </div>
            </li>
            <li>
              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  id="filter-radio-example-4"
                  type="radio"
                  value=""
                  name="filter-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="filter-radio-example-4"
                  className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                >
                  Last month
                </label>
              </div>
            </li>
            <li>
              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  id="filter-radio-example-5"
                  type="radio"
                  value=""
                  name="filter-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="filter-radio-example-5"
                  className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                >
                  Last year
                </label>
              </div>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DropdownStyled

export { Dropdown }
