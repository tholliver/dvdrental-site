import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { Calendar, Contact, Film, Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QueryStats } from '@/server/db/queries/query-stats'
import DialCharts from '@/components/CustomCharts/DialCharts'
import TopFilmsTable from '@/components/FilmTable'

type AllStats = {
  totalRents: number
  totalPays: number
  totalFilms: number
  totalCustomers: number
}

export const getServerSideProps: GetServerSideProps<{
  allstats: AllStats
}> = async () => {
  const oneYearAgoTimestamp = new Date().setFullYear(
    new Date().getFullYear() - 20
  )
  const oneYearAgo = new Date(oneYearAgoTimestamp)
  const oneYearAgoFormatted = oneYearAgo.toISOString().split('T')[0]

  const [
    [{ totalRents }],
    [{ totalPays }],
    [{ totalFilms }],
    [{ totalCustomers }],
  ] = await Promise.all([
    QueryStats.GetTotalRentalsByDate(oneYearAgoFormatted),
    QueryStats.GetTotalPaysByDate(oneYearAgoFormatted),
    QueryStats.GetTotalFilms(),
    QueryStats.GetTotalCustomer(),
  ])

  return {
    props: {
      allstats: { totalRents, totalPays, totalFilms, totalCustomers }, // Ensuring it matches AllStats type
    },
  }
}

export default function DashboardPage({
  allstats,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-1 justify-center">
      <div className="container min-h-screen">
        {/* <header className="border-b border-slate-800">
          <div className=" flex h-16 items-center px-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-purple-600" />
              <span className="text-xl font-bold text-white">DVD Rental</span>
            </div>
            <nav className="ml-auto flex gap-6">
              <Link className="text-sm text-white" href="#">
                Home
              </Link>
              <Link className="text-sm text-slate-400" href="#">
                Films
              </Link>
              <Link className="text-sm text-slate-400" href="#">
                Customers
              </Link>
              <Link className="text-sm text-slate-400" href="#">
                Contact
              </Link>
            </nav>
          </div>
        </header> */}

        <main className=" px-4 py-8">
          <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-3">
            <Card className="bg-slate-900 text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total rents
                </CardTitle>
                <Package className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allstats.totalRents}</div>
                <p className="text-xs text-slate-400">Total rents</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total payments
                </CardTitle>
                <Calendar className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allstats.totalPays}</div>
                <p className="text-xs text-slate-400">Total payments</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total films
                </CardTitle>
                <Film className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allstats.totalFilms}</div>
                <p className="text-xs text-slate-400">Total films</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total customers
                </CardTitle>
                <Contact className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {allstats.totalCustomers}
                </div>
                <p className="text-xs text-slate-400">Total customers</p>
              </CardContent>
            </Card>
          </div>

          <DialCharts />
          <TopFilmsTable />
        </main>
      </div>
    </div>
  )
}
