import { format } from '@formkit/tempo'
import { Bar, BarChart, ResponsiveContainer } from 'recharts'
import {
  Calendar,
  Clock,
  DollarSign,
  Film,
  PlayCircle,
  Users,
  Clapperboard,
  Tags,
  Languages,
  Star,
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { FilmInfoResponse } from '@/server/types/api-responses'
import { Separator } from './ui/separator'

interface FilmDashboardProps {
  filmData: FilmInfoResponse
}

export default function FilmDashboard({ filmData }: FilmDashboardProps) {
  // Format currency
  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(value))
  }

  // Calculate rental trend data
  const rentalTrendData = [
    { name: 'Total Rentals', value: filmData.stats.totalRentals },
    { name: 'Active Month', value: filmData.mostActiveMonth.rentalCount },
  ]

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        {/* Main Film Information Card */}
        <Card className="h-fit">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                  {filmData.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{filmData.rating}</Badge>
                  {filmData.filmCategories.map((category, index) => (
                    <Badge key={index} variant="outline">
                      {category.categoryName}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Rental Rate</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(filmData.rental_rate)}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Film Image and Description */}
            <div className="grid gap-6 sm:grid-cols-[240px_1fr]">
              <div className="relative aspect-[2/3] overflow-hidden rounded-md border bg-muted">
                <img
                  src={`/placeholder.svg?height=360&width=240`}
                  alt={filmData.title}
                  className="object-cover"
                  width={240}
                  height={360}
                />
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">{filmData.description}</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Release Year</p>
                      <p className="font-bold">{filmData.release_year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="font-bold">{filmData.length} minutes</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">Special Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {filmData.special_features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded-md border px-2 py-1 text-sm"
                      >
                        <Star className="h-3 w-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div id="ovr-stats">
                  {/* Timeline Stats */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Rental Timeline</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          First Rental
                        </p>
                        <p className="font-medium">
                          {format(
                            new Date(filmData.stats.firstRentalDate),
                            'MMMM d, yyyy'
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Last Rental
                        </p>
                        <p className="font-medium">
                          {format(
                            new Date(filmData.stats.lastRentalDate),
                            'MMMM d, yyyy'
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Most Active Month
                        </p>
                        <p className="font-medium">
                          {format(
                            new Date(filmData.mostActiveMonth.month),
                            'MMMM yyyy'
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {filmData.mostActiveMonth.rentalCount} rentals
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Stats</CardTitle>
            <CardDescription>Key metrics and figures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Revenue Stats */}
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-md bg-muted p-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">Total Revenue</p>
                </div>
                <p className="text-lg font-bold text-primary">
                  {formatCurrency(filmData.stats.totalRevenue)}
                </p>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted p-3">
                <div className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Total Rentals</p>
                </div>
                <p className="text-lg font-bold">
                  {filmData.stats.totalRentals}
                </p>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted p-3">
                <div className="flex items-center gap-2">
                  <Film className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Avg. Rate</p>
                </div>
                <p className="text-lg font-bold">
                  {formatCurrency(filmData.stats.avgRentalRate)}
                </p>
              </div>
            </div>

            <Separator />
            <Card className="bg-gradient-to-br from-background to-muted/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <PlayCircle className="h-5 w-5 text-primary" />
                  Rental Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="-mx-3" config={{}}>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={rentalTrendData}>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="value"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 grid gap-2">
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <span className="text-sm font-medium">Total Rentals</span>
                    <Badge variant="secondary">
                      {filmData.stats.totalRentals}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <span className="text-sm font-medium">Peak Month</span>
                    <Badge variant="secondary">
                      {filmData.mostActiveMonth.rentalCount} rentals
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
