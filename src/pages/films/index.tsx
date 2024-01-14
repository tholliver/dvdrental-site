import { useState } from 'react'
import { API_URI } from '@/config'
import { fetcher } from '@/services/fetcher'
import React from 'react'
import useSWR from 'swr'
import { IFilm } from '@/types'
import { NextResults, PrevResults, SearchIcon } from '@/components/SVG'
import Head from 'next/head'
import Link from 'next/link'

const Films = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const [filmtitle, setFilmtitle] = useState('')

  const {
    data: films,
    mutate,
    isLoading,
    error,
  } = useSWR<IFilm[]>(
    [`${API_URI}/films?offset=${pageNumber}&title=${filmtitle}`],
    fetcher
  )

  if (isLoading) return <div>Is Loading</div>
  if (error) return <div>Something happened</div>

  const paginationNextHandler = () => {
    setPageNumber((number) => number + 10)
    // console.log(pageNumber)
  }

  const paginationPrevHandler = () => {
    if (10 < pageNumber) setPageNumber((number) => number - 10)
    else setPageNumber(0)
    // console.log(pageNumber)
  }

  const handleFilmSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setFilmtitle(event.target.value)
  }
  return (
    <div>
      <Head>
        <title>Films</title>
        <meta property="og:title" content="Films" key="title" />
      </Head>
      <section className="p-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="rounded-t-lg pb-4  bg-white dark:bg-gray-900 ">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                id="table-search"
                value={filmtitle}
                onChange={handleFilmSearch}
                className="block pt-2 outline-none ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Film title
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
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
                    {film.titulo}
                  </th>
                  <td className="px-6 py-4">{film.lanzamiento}</td>
                  <td className="px-6 py-4">{film.rental_rate}</td>
                  <td className="px-6 py-4">{film.duracion}</td>
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
              {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">$1999</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$99</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple Watch
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$179</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  iPad
                </th>
                <td className="px-6 py-4">Gold</td>
                <td className="px-6 py-4">Tablet</td>
                <td className="px-6 py-4">$699</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple iMac 27
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">PC Desktop</td>
                <td className="px-6 py-4">$3999</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex flex-col items-center pb-4">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pageNumber}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pageNumber + 10}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            100
          </span>{' '}
          Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={paginationPrevHandler}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <PrevResults />
            Prev
          </button>
          <button
            onClick={paginationNextHandler}
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

export default Films
