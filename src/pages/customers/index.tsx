import { useState } from 'react'
import { useCustomers } from '@/hooks/use-customers'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debunce'
import ShadowTable from '@/components/CustomSkeletons/ShadowTable'
import Head from 'next/head'
import CustomersTable from '@/components/customers-table'
import Paginator from '@/components/Paginator'

export default function CustomerList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [debouncedSearch, setDebouncedTerm] = useDebounce('', 300)
  const pageSize = 10

  const { customers, metadata, isLoading, isValidating } = useCustomers(
    debouncedSearch,
    page,
    pageSize
  )

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setDebouncedTerm(value)
    setPage(1)
  }

  if (isLoading) {
    return <ShadowTable rows={10} heightRow="8" />
  }

  return (
    <div className="flex flex-1 justify-center">
      <Head>
        <title>Customers</title>
      </Head>
      <div className="container">
        <h3 className="pt-4 text-3xl font-bold dark:text-white">
          Customers List
        </h3>

        <div className="container sticky top-0 bg-background py-4">
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
        {isValidating ? (
          <ShadowTable rows={10} heightRow="8" />
        ) : (
          <div>
            <CustomersTable customers={customers} />
            <div className="mt-4">
              {metadata && metadata.totalPages > 1 && (
                <Paginator
                  page={page}
                  total={metadata?.total}
                  currentPage={metadata?.currentPage}
                  pageSize={metadata?.pageSize}
                  setPage={setPage}
                  totalPages={metadata?.totalPages}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
