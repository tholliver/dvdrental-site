import { useState } from 'react'
import { API_URI } from '@/config'
import { fetcher } from '@/services/fetcher'
import React from 'react'
import useSWR from 'swr'
import { IFilm } from '@/types'
import { NextResults, PrevResults, SearchIcon } from '@/components/SVG'
import Head from 'next/head'
import Link from 'next/link'
import FilmCustomTable from '@/components/FilmCustomTable'

const Films = () => {
  const [filmtitle, setFilmtitle] = useState('')

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

      <h3 className="p-4 text-3xl font-bold dark:text-white">Films list</h3>

      <section className="px-4">
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
        <FilmCustomTable
          filmtitle={filmtitle}
          // handleFilmSearch={(e) => handleFilmSearch(e)}
        />
      </section>
    </div>
  )
}

export default Films
