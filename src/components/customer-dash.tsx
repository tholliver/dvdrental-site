import { format, parse } from '@formkit/tempo'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer } from 'recharts'
import {
  BadgeCheck,
  Calendar,
  Film,
  PlayCircle,
  Star,
  Trophy,
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { CustomerInfoResponse } from '@/server/types/api-responses'
import { timeAgo } from '@/utils/timeFormats'

interface CustomerDashboardProps {
  customerData: CustomerInfoResponse
}

const customerTopFilmChartConfig = {
  rentalCount: {
    label: 'Rents:',
    color: '#2563eb',
  },
} satisfies ChartConfig

export default function CustomerDash({ customerData }: CustomerDashboardProps) {
  // Calculate loyalty status based on rental count
  const getLoyaltyStatus = (count: number) => {
    if (count >= 30) return 'Platinum'
    if (count >= 20) return 'Gold'
    if (count >= 10) return 'Silver'
    return 'Bronze'
  }

  const loyaltyStatus = getLoyaltyStatus(customerData.stats.rentalCount)

  // Recommended movies based on favorite category
  const recommendedMovies = [
    'The Classic Story',
    'Timeless Tales',
    'Vintage Collection',
    'Golden Age',
  ]

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Stats Overview */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Customer Overview
            <Badge variant="secondary" className="ml-2">
              {loyaltyStatus} Member <BadgeCheck className="ml-1 h-3 w-3" />
            </Badge>
          </CardTitle>
          <CardDescription>
            Member since {format(customerData?.stats.firstRentalDate, 'full')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <Film className="h-4 w-4 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Total Rentals</p>
              <p className="text-2xl font-bold">
                {customerData.stats.rentalCount}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Total Spent</p>
              <p className="text-2xl font-bold">
                ${customerData.stats.totalPayments}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Last Rental</p>
              <p className="text-2xl font-bold">
                {format(new Date(customerData.stats.mostRecentRental), 'MMM d')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Films */}
      <Card className="col-span-full md:col-span-1">
        <CardHeader>
          <CardTitle>Top Films</CardTitle>
          <CardDescription>Most frequently rented titles</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={customerTopFilmChartConfig}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={customerData.topFilms}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#334155"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="rentalCount"
                  fill="var(--color-chart-2)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 space-y-2">
            {customerData.topFilms.map((film) => (
              <div
                key={film.filmId}
                className="flex items-center justify-between"
              >
                <span className="text-sm">{film.title}</span>
                <Badge variant="secondary">{film.rentalCount}x</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Favorite Category */}
      <Card className="col-span-full md:col-span-1">
        <CardHeader>
          <CardTitle>Category Preference</CardTitle>
          <CardDescription>Favorite genre and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">
                {customerData.favoriteCategory.categoryName}
              </p>
              <p className="text-sm text-muted-foreground">
                {customerData.favoriteCategory.rentalCount} rentals in this
                category
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Recommended for you:</p>
            {recommendedMovies.map((movie, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md border p-2 text-sm"
              >
                <Star className="h-4 w-4 text-primary" />
                {movie}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card className="col-span-full md:col-span-1">
        <CardHeader>
          <CardTitle>Activity Summary</CardTitle>
          <CardDescription>Rental patterns and history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm font-medium">Most Active Month</p>
              <p className="mt-1 text-2xl font-bold">
                {format(
                  new Date(customerData.mostActiveMonth.month),
                  'MMMM yyyy'
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {customerData.mostActiveMonth.rentalCount} rentals
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Key Dates</p>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span>First Rental:</span>
                  <span>
                    {format(customerData?.stats.firstRentalDate, 'MMM D, YYYY')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Latest Rental:</span>
                  <span>{timeAgo(customerData?.stats.mostRecentRental)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Payment:</span>
                  <span>
                    {format(customerData?.stats.lastPaymentDate, 'MMM D, YYYY')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
