import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { BarChart } from '@tremor/react'

import { API_URI } from '@/config'
import { fetcher } from '@/services/fetcher'
import useSWR from 'swr'
import { IGraphStats } from '@/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export function LineChart() {
  const [groupBy, setGroupBy] = useState('day')

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Total rents per ${groupBy}`,
      },
    },
  }
  const {
    data: paymentsData,
    isLoading,
    error,
  } = useSWR<[]>(`${API_URI}/rentals/totals?by=${groupBy}`, fetcher)

  const getLastSeven = paymentsData?.slice(-7)
  const labels = getLastSeven?.map((date: any) => date.date)
  const dataPayDay = getLastSeven?.map((date: any) => date.count)
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset',
        data: dataPayDay,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
  return (
    <>
      <div className=" flex gap-2 p-2 items-center">
        Rents per
        <button
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setGroupBy('day')}
        >
          day
        </button>
        <button
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setGroupBy('month')}
        >
          month
        </button>
        <button
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setGroupBy('year')}
        >
          year
        </button>
      </div>
      {isLoading ? (
        <div className="p-5 m-5">Loading</div>
      ) : (
        <div>
          <Line options={options} data={data} />
        </div>
      )}
    </>
  )
}
