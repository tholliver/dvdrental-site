import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { API_URI } from '@/config'
import { fetcher } from '@/services/fetcher'
import useSWR from 'swr'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  maintainAspectRatio: true,
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

export function BarChart() {
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
      {
        label: 'Amount',
        data: dataPayDay,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: 'Dataset 2',
      //   data: [20, 598, 120, 148, 500, 150, 200],
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  }
  return (
    <>
      {isLoading ? <div>Loading</div> : <Bar options={options} data={data} />}
    </>
  )
}
