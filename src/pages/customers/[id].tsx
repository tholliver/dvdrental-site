import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '@/services/fetcher'
import HeadlessTable from '@/components/CustomSkeletons/HeadlessTable'
import { CustomerInfoResponse } from '@/server/types/api-responses'
import { custom } from 'zod'
import CustomerDash from '@/components/customer-dash'
import { Loader2 } from 'lucide-react'

export default function Page() {
  const router = useRouter()
  console.log('#############################', router.query.id, router)
  const shouldFetch = router.isReady && router.query.id
  const {
    data: customerData,
    isLoading,
    error,
  } = useSWR<CustomerInfoResponse>(
    shouldFetch ? `/api/customers/one?id=${router.query.id}` : null,
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
  if (!customerData) {
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

  return <CustomerDash customerData={customerData} />
}
