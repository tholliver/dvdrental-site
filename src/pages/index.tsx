import { Inter } from 'next/font/google'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import useSWR from 'swr'
import { fetcher } from '@/services/fetcher'
import { API_URI } from '@/config'
import { BarChart } from '@/components/CustomCharts/BarChart'
import FilmList from '@/components/FilmTable'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

export default function Home() {
  const { data, isLoading, error } = useSWR(
    `${API_URI}/payments/date-pays`,
    fetcher
  )
  console.log('Here running: ', data)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Total payments per day',
      },
    },
    maintainAspectRatio: false,
  }

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ]

  const graphData = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Amount',
        data: [100, 500, 500, 250, 500, 800, 150],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
  return (
    <div>
      <Head>
        <title>DVD rental</title>
        {/* <meta property="og:title" content="My page title" key="title" /> */}
      </Head>

      <div className="">
        <div className="flex flex-col md:flex-row ">
          <div
            id="table-content"
            className="flex-1 m-2 h-full overflow-y-auto  p-4"
          >
            <FilmList />
          </div>

          <div className="flex-1 flex flex-col ">
            <div className="m-2 bg-slate-800 rounded-lg">
              <BarChart />
            </div>
            <div className="m-2">
              <Line options={options} data={graphData} />
            </div>
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
