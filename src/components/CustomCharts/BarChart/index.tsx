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
import GraphSkeleton from '@/components/Skeletons/GraphSkeleton'

type BarChartProps = {
  groupBy: string
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function BarChart(props: BarChartProps) {
  const options = {
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
  const {
    data: paymentsData,
    isLoading,
    error,
  } = useSWR<[]>(`${API_URI}/payments/date-pays?by=${props.groupBy}`, fetcher)

  const getLastSeven = paymentsData?.slice(-7)
  const labels = getLastSeven?.map((date: any) => date.date)
  const dataPayDay = getLastSeven?.map((date: any) => date.daytotal)

  console.log('FOR BAR', getLastSeven)

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
      {isLoading ? (
        <div className="">
          <GraphSkeleton />
        </div>
      ) : (
        <Bar options={options} data={data} />
      )}
    </>
  )
}
