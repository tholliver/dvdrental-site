import { Calendar, Contact, Film, Package } from 'lucide-react'
import {
  Bar,
  BarChart as RechartsBar,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { QueryStats } from '@/server/db/queries/query-stats'
import useSWR from 'swr'
import { fetcher } from '@/services/fetcher'
import { useState } from 'react'
import { Payment, Rental } from '@/server/types'

// Mock data for charts

const topFilms = [
  { title: 'Shock Cabin', totalMade: 96.71, rating: 'PG-13', totalRents: 29 },
  {
    title: 'Juggler Hardly',
    totalMade: 86.71,
    rating: 'PG-13',
    totalRents: 29,
  },
  {
    title: 'Scalawag Duck',
    totalMade: 157.71,
    rating: 'NC-17',
    totalRents: 29,
  },
  {
    title: 'Ridgemont Submarine',
    totalMade: 110.72,
    rating: 'PG-13',
    totalRents: 28,
  },
  {
    title: 'Rocketeer Mother',
    totalMade: 97.72,
    rating: 'PG-13',
    totalRents: 28,
  },
  {
    title: 'Rugrats Shakespeare',
    totalMade: 67.72,
    rating: 'PG-13',
    totalRents: 28,
  },
  { title: 'Frost Head', totalMade: 74.72, rating: 'PG', totalRents: 28 },
  {
    title: 'Apache Divine',
    totalMade: 160.72,
    rating: 'NC-17',
    totalRents: 28,
  },
  { title: 'Grit Clockwork', totalMade: 97.72, rating: 'PG', totalRents: 28 },
  { title: 'Rush Goodfellas', totalMade: 81.72, rating: 'PG', totalRents: 28 },
]

type RentalData = {
  rentals: Array<Rental>
}

type PaymentData = {
  payments: Array<Payment>
}

export default function DashboardPage() {
  const [groupBy, setGroupBy] = useState('day')
  const {
    data: paymentData,
    isLoading: isLoadingPayments,
    error: paymentFetchError,
  } = useSWR<PaymentData>(`/api/payments?by=${groupBy}`, fetcher)
  const {
    data: rentalData,
    isLoading,
    error,
  } = useSWR<RentalData>(`/api/rentals?by=${groupBy}`, fetcher)

  console.log('USE HERE:', paymentData, rentalData)

  if (paymentFetchError) return 'Error'

  const formattedRentalData =
    rentalData?.rentals.map((item) => ({
      ...item,
      rents: item.rents,
    })) || []

  const formattedPaymentData =
    paymentData?.payments.map((item) => ({
      ...item,
      amount: item.amount,
    })) || []

  return (
    <div className="flex flex-1 justify-center">
      <div className="container min-h-screen">
        <main className=" px-4 py-8">
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-slate-400">
                Showing charts by {groupBy}
              </span>
              {(['day', 'month', 'year'] as const).map((period) => (
                <Button
                  key={period}
                  size="sm"
                  variant={groupBy === period ? 'outline' : 'ghost'}
                  className={
                    groupBy === period ? 'text-white' : 'text-slate-400'
                  }
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
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBar data={formattedPaymentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="amount" fill="#be185d" />
                    </RechartsBar>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="bg-slate-900 p-4">
                <div className="mb-4 text-sm text-slate-400">
                  Total rents per day
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formattedRentalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="rents"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
