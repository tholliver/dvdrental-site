import React, { useState } from 'react'
import Link from 'next/link'
import HeadlessTable from '../CustomSkeletons/HeadlessTable'
import Paginator from '../Paginator'
import { useFilms } from '@/hooks/use-films'

interface FilmTableProps {
  filmTitle: string
  category: string
  rating: string
}

const FilmCustomTable = (props: FilmTableProps) => {
  const [page, setPage] = useState(1)
  const pageSize = 10
  const { films, metadata, isLoading, isValidating, error } = useFilms(
    props.category,
    props.rating,
    props.filmTitle,
    page,
    pageSize
  )

  if (isValidating) {
    return <HeadlessTable heightRow="8" rows={12} />
  }

  if (error) return <div>Something happened</div>

  return (
    <div id="film-table">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-900">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-slate-200 uppercase dark:bg-gray-700 dark:text-gray-400">
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
          <tbody className="bg-gray-900">
            {films?.map((film, i: number) => (
              <tr
                key={film.film_id}
                className="border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
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
      <div className="mt-4 flex flex-col items-center">
        {/* <Paginator /> */}
        {metadata && metadata.totalPages > 1 && (
          <Paginator
            page={page}
            total={metadata?.total}
            currentPage={metadata?.currentPage}
            pageSize={metadata?.pageSize}
            setPage={setPage}
            totalPages={metadata?.totalPages}
          />
        )}
      </div>
    </div>
  )
}

export default FilmCustomTable
