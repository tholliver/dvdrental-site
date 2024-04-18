import { useState } from 'react'
import { API_URI } from '@/config'
import { fetcher } from '@/services/fetcher'
import React from 'react'
import useSWR from 'swr'
import { ICategory, ratings, FilmRating } from '@/types'
import { ArrowDownIcon, SearchIcon } from '@/components/SVG'
import Head from 'next/head'
import FilmCustomTable from '@/components/FilmCustomTable'
import { Dropdown } from '@/components/Dropdowns'

const Films = () => {
  const [filmTitle, setFilmTitle] = useState('')
  const [category, setCategory] = useState('')
  const [rating, setRating] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const [categoryIsOpen, setCategoryOpen] = useState(false)
  const [ratingIsOpen, setRatingOpen] = useState(false)

  const {
    data: categories,
    mutate,
    isLoading,
    error,
  } = useSWR<ICategory[]>([`${API_URI}/categories`], fetcher)

  const handleFilmSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setFilmTitle(event.target.value)
  }

  const handleCategoryFilter = (paramCategory: string) => {
    setCategory(paramCategory)
    setPageNumber(0)
    setCategoryOpen(!categoryIsOpen)
  }

  const handleRatingFilter = (paramRating: string) => {
    setRating(paramRating)
    setPageNumber(0)
    setRatingOpen(!ratingIsOpen)
  }
  //Pagination
  const paginationNextHandler = () => {
    setPageNumber((number) => number + 10)
  }

  const paginationPrevHandler = () => {
    if (10 < pageNumber) setPageNumber((number) => number - 10)
    else setPageNumber(0)
  }
  return (
    <div>
      <Head>
        <title>Films</title>
        <meta property="og:title" content="Films" key="title" />
      </Head>

      <h3 className="p-4 text-3xl font-bold dark:text-white">Films list</h3>
      <div className=" px-4 shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <div className="flex space-x-4">
            <div className="relative">
              <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                onClick={() => setCategoryOpen(!categoryIsOpen)}
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                <span className="sr-only">Category button</span>
                Categories
                <ArrowDownIcon />
              </button>
              {/* Category select */}
              <div
                id="dropdownAction"
                className={`absolute ${
                  categoryIsOpen ? '' : 'hidden'
                }  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 z-30`}
              >
                <Dropdown
                  items={categories}
                  handleFilter={handleCategoryFilter}
                />
              </div>
            </div>
            <div className="relative">
              <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                onClick={() => setRatingOpen(!ratingIsOpen)}
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                <span className="sr-only">Category button</span>
                Rating
                <ArrowDownIcon />
              </button>
              {/* Category select */}
              <div
                id="dropdownAction"
                className={`absolute ${
                  ratingIsOpen ? '' : 'hidden'
                }  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 z-30`}
              >
                <Dropdown items={ratings} handleFilter={handleRatingFilter} />
              </div>
            </div>
          </div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              onChange={handleFilmSearch}
              id="table-search-titles"
              className="focus:outline-none block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for titles"
            />
          </div>
        </div>
        <FilmCustomTable
          filmTitle={filmTitle}
          category={category}
          pageNumber={pageNumber}
          paginationNextHandler={paginationNextHandler}
          paginationPrevHandler={paginationPrevHandler}
        />
      </div>
    </div>
  )
}

export default Films
