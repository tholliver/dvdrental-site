import React, { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { SearchIcon } from '../SVG'
import { API_URI } from '@/config'
import { IFilm } from '@/types'
import { fetcher } from '@/services/fetcher'
import { PrevResults, NextResults } from '../SVG'

interface FilmTableProps {
  filmTitle: string
  category: string
  rating: string
  pageNumber: number
  paginationPrevHandler: () => void
  paginationNextHandler: () => void
  //   handleFilmSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FilmCustomTable = (props: FilmTableProps) => {
  const {
    data: films,
    isLoading,
    error,
  } = useSWR<IFilm[]>(
    [
      `/api/films/search?category=${props.category}&title=${props.filmTitle}&rating=${props.rating}&offset=${props.pageNumber}`,
    ],
    fetcher
  )

  if (isLoading) return <div>Is Loading</div>
  if (error) return <div>Something happened</div>

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Film title
              </th>
              <th scope="col" className="px-6 py-3">
                YEAR
              </th>
              <th scope="col" className="px-6 py-3">
                RENT PRICE
              </th>
              <th scope="col" className="px-6 py-3">
                RENTAL RATE
              </th>
              <th scope="col" className="px-6 py-3">
                RATING
              </th>
              <th scope="col" className="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {films?.map((film: IFilm, i: number) => (
              <tr
                key={film.film_id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {film.title}
                </th>
                <td className="px-6 py-4">{film.release_year}</td>
                <td className="px-6 py-4">{film.rental_rate}</td>
                <td className="px-6 py-4">{film.length}</td>
                <td className="px-6 py-4">{film.rating}</td>
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
      <div className="flex flex-col items-center pb-4">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {props.pageNumber + 1}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {props.pageNumber + 10}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            100
          </span>{' '}
          Films
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={props.paginationPrevHandler}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <PrevResults />
            Prev
          </button>
          <button
            onClick={props.paginationNextHandler}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            <NextResults />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilmCustomTable
