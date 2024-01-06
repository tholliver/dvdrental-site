import { Inter } from 'next/font/google'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })

import useSWR from 'swr'
import { fetcher } from '@/services/fetcher'
import { API_URI } from '@/config'
import { BarChart } from '@/components/CustomCharts/BarChart'
import FilmList from '@/components/FilmTable'
import { LineChart } from '@/components/CustomCharts/LineChart'
import DashCard from '@/components/Cards/DashCard'

export default function Home() {
  const { data, isLoading, error } = useSWR(
    `${API_URI}/payments/date-pays`,
    fetcher
  )
  // console.log('Here running: ', data)

  return (
    <div>
      <Head>
        <title>DVD rental</title>
        {/* <meta property="og:title" content="My page title" key="title" /> */}
      </Head>

      <div className="">
        <section className="p-2 flex flex-col md:flex-row justify-start gap-5">
          <DashCard />
          <DashCard />
          <DashCard />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="m-2 h-72 bg-slate-800 rounded-lg">
            <BarChart />
          </div>
          <div className="m-2 h-72 bg-slate-800 rounded-lg">
            {/* <Line options={options} data={graphData} /> */}
            <LineChart />
          </div>
          DashCard
        </div>
        <div className="m-4 ">
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
      <div
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
      </div>
    </div>
  )
}
