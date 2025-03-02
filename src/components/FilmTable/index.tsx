import { fetcher } from '@/services/fetcher'
import React, { useState } from 'react'
import useSWR from 'swr'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FilmInfo, TimeLapseSelect, timeOptions } from '@/types'
import Link from 'next/link'
import DropdownComponents from '../Dropdowns'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { ErrorUI } from '../ErrorUI'

export default function TopFilmsTable() {
  const [topRentalTimeLapse, setTopRentalTimeLapse] = useState<TimeLapseSelect>(
    timeOptions[0]
  )

  const { data, isLoading, error } = useSWR<FilmInfo[]>(
    `/api/rentals/top-rents?time=${topRentalTimeLapse?.time}&lapse=${topRentalTimeLapse?.value}`,
    fetcher
  )

  const handleTimeLapseSelection = (selectedTimeLapse: TimeLapseSelect) => {
    setTopRentalTimeLapse(selectedTimeLapse)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="rounded-xl rounded-b-none h-[72px] w-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    )
  }
  if (error) {
    return <ErrorUI />
  }

  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Top rented films</h2>

        <DropdownComponents.DropdownStyled
          topRentalTimeLapse={topRentalTimeLapse}
          setTopRentalTimeLapse={handleTimeLapseSelection}
          handleTimeLapseSelection={handleTimeLapseSelection}
        />
      </div>
      <Card className="bg-slate-950">
        {(data ?? []).length > 0 ? (
          <Table>
            <TableCaption>A list of top rented films.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-slate-400">Film Title</TableHead>
                <TableHead className="text-slate-400">Total Made</TableHead>
                <TableHead className="text-slate-400">Rating</TableHead>
                <TableHead className="text-slate-400">Total Rents</TableHead>
                <TableHead className="text-right text-slate-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((film) => (
                <TableRow key={film.film_id}>
                  <TableCell className="font-medium text-white">
                    {film.filmName}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    ${film.amountMade}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {film.rating}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {film.rentedTimes}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-blue-500"
                    >
                      <Link href={`/films/film.film_id`}>Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="h-50 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold">No films</h2>
          </div>
        )}
      </Card>
    </div>
  )
}
