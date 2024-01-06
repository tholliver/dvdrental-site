import React from 'react'
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

import { API_URI } from '@/config'
import { fetcher } from '@/services/fetcher'
import useSWR from 'swr'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Total Payments per Day',
    },
  },
}

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export function LineChart() {
  const {
    data: paymentsData,
    isLoading,
    error,
  } = useSWR(`${API_URI}/payments/date-pays`, fetcher)

  const getLastSeven = paymentsData?.slice(-7)
  const labels = getLastSeven?.map((date: any) => date.date)
  const dataPayDay = getLastSeven?.map((date: any) => date.dayTotal)
  const data = {
    labels,
    datasets: [
      // {
      //   label: 'Amount',
      //   data: dataPayDay,
      //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
      // },
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
      {isLoading ? <div>Loading</div> : <Line options={options} data={data} />}
    </>
  )
}
