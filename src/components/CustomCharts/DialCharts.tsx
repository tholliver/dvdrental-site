import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import useSWR from 'swr'
import { fetcher } from '@/services/fetcher'
import { useState } from 'react'
import { Payment, Rental } from '@/server/types'
import { Skeleton } from '../ui/skeleton'

type RentalData = {
  rentals: Array<Rental>
}

type PaymentData = {
  payments: Array<Payment>
}

const paymentChartConfig = {
  amount: {
    label: 'Amount:',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

const rentalChartConfig = {
  rents: {
    label: 'Rents',
    color: '#1e293b',
  },
} satisfies ChartConfig

export default function DialCharts() {
  const [groupBy, setGroupBy] = useState('day')
  const {
    data: paymentData,
    isLoading: isLoadingPaymentData,
    error: paymentFetchError,
  } = useSWR<PaymentData>(`/api/payments?by=${groupBy}`, fetcher)
  const {
    data: rentalData,
    isLoading: isLoadingRentalData,
    error: rentalFetchError,
  } = useSWR<RentalData>(`/api/rentals/perdate?by=${groupBy}`, fetcher)

  if (isLoadingPaymentData || isLoadingRentalData) {
    return (
      <div className="flex mt-4 flex-col space-y-3">
        <Skeleton className="rounded-xl rounded-b-none h-[300px] w-full" />
      </div>
    )
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-slate-400">
          Showing charts by {groupBy}
        </span>
        {(['day', 'month', 'year'] as const).map((period) => (
          <Button
            key={period}
            size="sm"
            variant={groupBy === period ? 'outline' : 'ghost'}
            className={groupBy === period ? 'text-white' : 'text-slate-400'}
            onClick={() => setGroupBy(period)}
          >
            {period}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-slate-900 p-4">
          <div className="mb-4 text-sm text-slate-400">
            Total Payments per Day
          </div>
          <ChartContainer
            config={paymentChartConfig}
            className="min-h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                accessibilityLayer
                data={paymentData?.payments}
                margin={{ top: 20 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#334155"
                />
                <XAxis
                  dataKey="date"
                  tickMargin={10}
                  axisLine={false}
                  tickLine={false}
                  // tickFormatter={(value) => value.slice(5, 10)}
                  stroke="#94a3b8"
                />
                <ChartTooltip
                  content={<ChartTooltipContent hideIndicator />}
                  defaultIndex={1}
                />
                <Bar dataKey="amount" fill="var(--color-chart-5)" radius={5}>
                  <LabelList
                    position="top"
                    offset={5}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
        <Card className="bg-slate-900 p-4">
          <div className="mb-4 text-sm text-slate-400">Total rents per day</div>
          <ChartContainer
            config={rentalChartConfig}
            className="min-h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart accessibilityLayer data={rentalData?.rentals}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="date"
                  tickMargin={10}
                  axisLine={false}
                  tickLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent hideIndicator indicator="line" />
                  }
                />
                {/* <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--color-chart-5)',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                      /> */}
                <Line
                  type="monotone"
                  dataKey="rents"
                  stroke="#3b82f6"
                  strokeWidth={2}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
      </div>
    </div>
  )
}
