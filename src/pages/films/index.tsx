import { useState } from 'react'
import { fetcher } from '@/services/fetcher'
import React from 'react'
import useSWR from 'swr'
import { ICategoryOption, ratings } from '@/types'
import { SearchIcon } from '@/components/SVG'
import Head from 'next/head'
import FilmCustomTable from '@/components/FilmCustomTable'
import DropdownComponents from '@/components/Dropdowns'
import TableSkeleton from '@/components/CustomSkeletons/ShadowTable'
import { useDebounce } from '@/hooks/use-debunce'

const Films = () => {
  const [filmTitle, setFilmTitle] = useState('')
  const [selectedRating, setSelectedRating] = React.useState<string>()
  const [selectedCategory, setSelectedCategory] = React.useState<string>()
  const [debouncedSearch, setDebouncedTerm] = useDebounce('', 300)

  const {
    data: categories,
    isLoading,
    error,
  } = useSWR<ICategoryOption[]>([`/api/categories`], fetcher)

  const handleFilmSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setFilmTitle(event.target.value)
    setDebouncedTerm(event.target.value)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
  }

  const handleRatingChange = (value: string) => {
    setSelectedRating(value)
  }

  if (isLoading) {
    return <TableSkeleton heightRow="8" rows={12} />
  }
  if (error) {
    return <div>Error huge one</div>
  }
  return (
    <div className="flex flex-1 justify-center">
      <Head>
        <title>Films</title>
        <meta property="og:title" content="Films" key="title" />
      </Head>

      <div className="container shadow-md sm:rounded-lg">
        <h3 className="py-4 text-3xl font-bold dark:text-white">Films list</h3>
        <div className="flex items-center rounded-t-lg justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 dark:bg-gray-900">
          <div className="flex space-x-4">
            <div className="relative">
              {/* Category select */}
              <DropdownComponents.Dropdown
                options={categories!}
                value={selectedCategory}
                onChange={handleCategoryChange}
                placeholder="Select a category..."
              />
            </div>
            <div className="relative">
              <DropdownComponents.Dropdown
                options={ratings}
                value={selectedRating}
                onChange={handleRatingChange}
                placeholder="Select a rating..."
              />
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
          filmTitle={debouncedSearch}
          category={selectedCategory!}
          rating={selectedRating!}
        />
      </div>
    </div>
  )
}

export default Films
