import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '@/services/fetcher'
import { FilmInfoResponse } from '@/server/types/api-responses'
import { Loader2 } from 'lucide-react'
import FilmDashboard from '@/components/film-dash'

export default function Page() {
  const router = useRouter()
  const shouldFetch = router.isReady && router.query.id
  const {
    data: filmData,
    isLoading,
    error,
  } = useSWR<FilmInfoResponse>(
    shouldFetch ? `/api/films/one?id=${router.query.id}` : null,
    fetcher
  )

  // Show loading state while router is not ready or data is loading
  if (!router.isReady || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Error</h1>
          <p className="text-muted-foreground">Failed to load customer data</p>
        </div>
      </div>
    )
  }

  // Show not found state
  if (!filmData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Customer Not Found</h1>
          <p className="text-muted-foreground">
            The customer you&apos;re looking for doesn&apos;t exist
          </p>
        </div>
      </div>
    )
  }

  return <FilmDashboard filmData={filmData} />
}
