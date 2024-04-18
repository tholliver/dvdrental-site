import { Inter } from 'next/font/google'
import { useState } from 'react'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })
import { Card } from '@tremor/react'

import useSWR from 'swr'
import { fetcher } from '@/services/fetcher'
import { API_URI } from '@/config'
import { BarChart } from '@/components/CustomCharts/BarChart'
import FilmList from '@/components/FilmTable'
import { LineChart } from '@/components/CustomCharts/LineChart'
import DashCard from '@/components/Cards/DashCard'
//  Redux states
import { decrement, increment } from '@/lib/slices/counterSlice'
import type { RootState } from '@/lib/store'
import { IStats } from '@/types'

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
        <section className="p-2 flex flex-col md:flex-row justify-start gap-5">
          <DashCard stat={data?.rents} description="Total rents" />
          <DashCard stat={data?.totalMade} description="Total payments" />
          <DashCard stat={data?.units} description="Total inventory" />
          <DashCard stat={data?.customers} description="Total customers" />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="m-2 bg-slate-800 rounded-lg">
            <BarChart />
          </div>
          <div className="m-2 bg-slate-800 rounded-lg">
            {/* <Line options={options} data={graphData} /> */}
            <LineChart />
          </div>
        </div>
        <div className=" ">
          <div id="table-content" className="">
            <FilmList />
          </div>
        </div>
        {/* <div className="bg-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4">
            <Line options={options} data={graphData} />
          </div>
          <div className="p-4">
            <BarChart />
          </div>
          <div className="p-4">
            <Line options={options} data={graphData} />
          </div>
          <div className="p-4">
            <Line options={options} data={graphData} />
          </div>
        </div> */}
      </div>
      {/* <div
        id="mega-menu-full-dropdown"
        className=" border-gray-200 shadow-sm bg-gray-50  border-y dark:bg-gray-800 dark:border-gray-600"
      >
        <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
          <ul>
            <li>
              <a
                href="#"
                className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="font-semibold">Films</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Check our last upcoming films
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="font-semibold">Segmentation</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that e already using.
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="font-semibold">Marketing CRM</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that yre already using.
                </span>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a
                href="#"
                className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="font-semibold">Online Stores</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools thatre already using.
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="font-semibold">Segmentation</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that re already using.
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="font-semibold">Marketing CRM</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with third-party tools that re already using.
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  )
}
