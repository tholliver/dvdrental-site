import type { GetServerSideProps } from 'next'
import { fetcher } from '@/services/fetcher'
import React from 'react'
import useSWR from 'swr'
import { ICategoryOption, ratings } from '@/types'
import { SearchIcon } from '@/components/SVG'
import Head from 'next/head'
import FilmCustomTable from '@/components/FilmCustomTable'
import DropdownComponents from '@/components/Dropdowns'
import TableSkeleton from '@/components/CustomSkeletons/ShadowTable'
import { useFilmFilters } from '@/hooks/use-film-filters'
import { ErrorUI } from '@/components/ErrorUI'

type QueryState = {
  title: string | string[]
  category: string | string[]
  rating: string | string[]
  pageSize: string | string[]
}

type PageProps = {
  initialQueries: QueryState
}

// const updateQueryParam = <T extends string | undefined>(
//   key: string,
//   value: T,
//   router: ReturnType<typeof useRouter>
// ) => {
//   router.push(
//     {
//       pathname: router.pathname,
//       query: { ...router.query, [key]: value },
//     },
//     undefined,
//     { shallow: true }
//   )
// }

export default function Films() {
  const { filters, debouncedTitle, updateFilter } = useFilmFilters()
  const {
    data: categories,
    isLoading,
    error,
  } = useSWR<ICategoryOption[]>([`/api/categories`], fetcher)

  if (isLoading) {
    return <TableSkeleton heightRow="8" rows={12} />
  }
  if (error) {
    return <ErrorUI />
  }
  return (
    <div className="px-8 flex flex-1 justify-center">
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
                value={filters.category}
                onChange={(value) => updateFilter('category', value)}
                placeholder="Select a category..."
              />
            </div>
            <div className="relative">
              {/* Category rating */}
              <DropdownComponents.Dropdown
                options={ratings}
                value={filters.rating}
                onChange={(value) => updateFilter('rating', value)}
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
              value={filters.title}
              onChange={(e) => updateFilter('title', e.target.value)}
              id="table-search-titles"
              className="focus:outline-none block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for titles"
            />
          </div>
        </div>
        <FilmCustomTable
          filmTitle={debouncedTitle}
          category={filters.category}
          rating={filters.rating}
          page={filters.page}
          pageSize={filters.pageSize}
        />
      </div>
    </div>
  )
}

export const getServerSideProps = (async ({ query }) => {
  return {
    props: {
      initialQueries: {
        title: query.title || '',
        category: query.category || '',
        rating: query.rating || '',
        pageSize: query.pageSize || '',
      },
    },
  }
}) satisfies GetServerSideProps<PageProps>
