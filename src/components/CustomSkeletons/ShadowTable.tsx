import React from 'react'
import { Skeleton } from '../ui/skeleton'

interface TableSkeletonProps {
  rows: number
  heightRow: string
}

export default function ShadowTable({
  rows,
  heightRow = '8',
}: TableSkeletonProps) {
  return (
    <div className="flex flex-1 justify-center">
      <div className="container py-8 flex flex-1 justify-center">
        <div className="container flex flex-col space-y-3">
          <Skeleton className="rounded-xl rounded-b-none h-[72px] w-full" />
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
