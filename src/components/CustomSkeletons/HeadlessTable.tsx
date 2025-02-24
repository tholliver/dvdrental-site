import React from 'react'
import { Skeleton } from '../ui/skeleton'

interface HeadlessTableProps {
  rows: number
  heightRow: string
}

export default function HeadlessTable({
  rows,
  heightRow = '8',
}: HeadlessTableProps) {
  return (
    <div className="flex flex-1 justify-center">
      <div className="container py-8 flex flex-1 justify-center">
        <div className="container flex flex-col space-y-3">
          <div className="space-y-2">
            {Array.from({ length: rows }).map((_, i) => (
              <Skeleton key={i} className={`h-${heightRow} w-full`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
