import { API_URI } from '@/config'
import { fetcher } from '@/services/fetcher'
import React, { InputHTMLAttributes, useState } from 'react'
import useSWR from 'swr'
import { FilmInfo, TimeLapseSelect, timeOptions } from '@/types'
import Link from 'next/link'
import { ArrowDownIcon, ClockIcon } from '../SVG'
import DropdownStyled from '../Dropdowns'

const FilmList = () => {
  const [topRentalTimeLapse, setTopRentalTimeLapse] = useState<TimeLapseSelect>(
    { ...timeOptions[0] }
  )
  const [isTopRentalTLOpen, setIsTopRentalTLOpen] = useState(false)
  // const [filmInputSearch, setFilmInputSearch] = useState('')
  const { data, isLoading, error } = useSWR<FilmInfo[]>(
    `${API_URI}/rentals?time=${topRentalTimeLapse?.time}&lapse=${topRentalTimeLapse?.value}`,
    fetcher
  )

  const handleTimeLapseFilter = () => {
    setIsTopRentalTLOpen(!isTopRentalTLOpen)
  }

  const handleTimeLapseSelection = (timeLapse: TimeLapseSelect) => {
    setTopRentalTimeLapse({
      time: timeLapse.time,
      value: timeLapse.value,
      label: timeLapse.label,
    })
    setIsTopRentalTLOpen(!isTopRentalTLOpen)
  }
  // const filmSearchName = (e: any) => {
  //   setFilmInputSearch(e.target.value)
  //   data?.filter((f) =>
  //     f.filmName.toLowerCase().includes(filmInputSearch.toLowerCase())
  //   )
  //   console.log(filmInputSearch)
  // }

  return (
    <div>
      <div className="py-4 mx-4 shadow-md sm:rounded-lg">
        <div className="relative">
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <h5 className="text-xl font-bold dark:text-white">
              Top films rated
            </h5>
            <DropdownStyled
              isTopRentalTLOpen={isTopRentalTLOpen}
              topRentalTimeLapse={topRentalTimeLapse}
              handleTimeLapseFilter={handleTimeLapseFilter}
              handleTimeLapseSelection={handleTimeLapseSelection}
            />
            {/* <label className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              value={filmInputSearch}
              onChange={(e) => filmSearchName(e)}
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div> */}
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Film Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  rating
                </th>
                <th scope="col" className="px-6 py-3">
                  t. rents
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="max-h-[30em] overflow-y-auto">
              {data?.slice(0, 10).map((film, i) => (
                <tr
                  key={film.film_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {film.filmName}
                  </th>
                  <td className="px-6 py-4">$ {film.amountMade}</td>
                  <td className="px-6 py-4">{film.rating}</td>
                  <td className="px-6 py-4">{film.rentedTimes}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/films/${film.film_id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FilmList
