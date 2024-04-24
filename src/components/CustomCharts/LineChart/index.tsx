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
import GraphSkeleton from '@/components/Skeletons/GraphSkeleton'

type LineChartProps = {
  groupBy: string
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export function LineChart(props: LineChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Total rents per ${props.groupBy}`,
      },
    },
  }
  const {
    data: paymentsData,
    isLoading,
    error,
  } = useSWR<[]>(`${API_URI}/rentals/totals?by=${props.groupBy}`, fetcher)

  const getLastSeven = paymentsData?.slice(-7)
  const labels = getLastSeven?.map((date: any) => date.date)
  const dataPayDay = getLastSeven?.map((date: any) => date.count)
  const data = {
    labels,
    datasets: [
      {
        label: 'Rents',
        data: dataPayDay,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
  return (
    <>
      {isLoading ? (
        <div className="">
          <GraphSkeleton />
        </div>
      ) : (
        <div>
          <Line options={options} data={data} />
        </div>
      )}
    </>
  )
}
