import { useState } from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import { fetcher } from '@/services/fetcher'
import { API_URI } from '@/config'
import { BarChart } from '@/components/CustomCharts/BarChart'
import FilmList from '@/components/FilmTable'
import { LineChart } from '@/components/CustomCharts/LineChart'
import DashCard from '@/components/Cards/DashCard'
//  Redux states

import { IStats } from '@/types'
import ChartQuerier from '@/components/ChartQuerier'

export default function Home() {
  const oneYearAgoTimestamp = new Date().setFullYear(
    new Date().getFullYear() - 1
  )
  const oneYearAgo = new Date(oneYearAgoTimestamp)
  const oneYearAgoFormatted = oneYearAgo.toISOString().split('T')[0]

  const [dateBy, setDateBy] = useState(oneYearAgoFormatted)
  const { data, isLoading, error } = useSWR<IStats>(
    `${API_URI}/stats?startdate=${dateBy}`,
    fetcher
  )

  return (
    <div>
      <Head>
        <title>Rental Dashboard</title>
        {/* <meta property="og:main" content="My main page " key="main" /> */}
      </Head>

      <div className="">
        <section className="p-2 grid grid-cols-2 md:grid-flow-col gap-4">
          <DashCard stat={data?.rents} description="Total rents" />
          <DashCard stat={data?.totalMade} description="Total payments" />{' '}
          <DashCard stat={data?.films} description="Total films" />
          <DashCard stat={data?.units} description="Total inventory" />
          <DashCard stat={data?.customers} description="Total customers" />
        </section>

        <div className="">
          <ChartQuerier />
        </div>
        <div className=" ">
          <div id="table-content" className="">
            <FilmList />
          </div>
        </div>
      </div>
    </div>
  )
}
