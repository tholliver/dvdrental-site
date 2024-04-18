import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { API_URI } from '@/config'
import { fetcher } from '@/services/fetcher'
import { IFilm } from '@/types'

const Film = () => {
  const router = useRouter()
  const { id } = router.query

  const {
    data: film,
    isLoading,
    error,
  } = useSWR<IFilm>(`${API_URI}/films/${id}`, fetcher)

  if (isLoading) return <div>loading</div>

  return (
    <div>
      <div className="container mx-auto p-4 flex">
        <div className="w-1/2">
          <img
            src="path/to/movie-poster.jpg"
            alt="Movie Poster"
            className="w-full rounded-lg"
          />
        </div>
        <div className="w-1/2 px-8">
          <h2 className="text-3xl font-semibold my-4">Movie Overview</h2>
          <p className=" text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {film?.description}
          </p>

          <div className="my-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Details
            </h3>
            <ul className="list-disc list-inside text-gray-400">
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Film ID:{' '}
                </span>
                {film?.film_id}
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Release Date:{' '}
                </span>
                {film?.description}
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Language ID:{' '}
                </span>
                {film?.language_id}
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Rental Duration:{' '}
                </span>
                {film?.rental_duration} days
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Rental Rate:{' '}
                </span>
                ${film?.rental_rate}
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Duration:{' '}
                </span>
                {film?.length} minutes
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Replacement Cost:{' '}
                </span>
                ${film?.replacement_cost}
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Rating:{' '}
                </span>
                {film?.rating}
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Last Update:{' '}
                </span>
                {film?.last_update}
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Special Features:{' '}
                </span>
                {film?.special_features.join(', ')}
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Fulltext:{' '}
                </span>
                {film?.fulltext}
              </li>
            </ul>
          </div>

          {/* <div className="my-4">
            <h3 className="text-xl font-semibold">Cast</h3>
            <ul className=" text-left rtl:text-right text-gray-500 dark:text-gray-400 list-disc list-inside ">
              <li>Actor 1</li>
              <li>Actor 2</li>
              <li>Actor 3</li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Film
