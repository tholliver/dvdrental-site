import { useState } from 'react'
import { useCustomers } from '@/hooks/use-customers'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debunce'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import ShadowTable from '@/components/CustomSkeletons/ShadowTable'
import Head from 'next/head'
import Paginator from '@/components/Paginator'

export default function CustomerList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [debouncedSearch, setDebouncedTerm] = useDebounce('', 500)
  const pageSize = 10

  const { customers, metadata, isLoading } = useCustomers(
    debouncedSearch,
    page,
    pageSize
  )

  const totalPages = metadata?.totalPages ?? 1

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: (number | 'ellipsis')[] = []
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always show first page
    pageNumbers.push(1)

    // Calculate start and end of page numbers around current page
    let start = Math.max(2, page - 2)
    let end = Math.min(totalPages - 1, page + 2)

    // Adjust if we're near the start
    if (page <= 4) {
      end = 5
    }

    // Adjust if we're near the end
    if (page >= totalPages - 3) {
      start = totalPages - 4
    }

    // Add ellipsis if needed
    if (start > 2) {
      pageNumbers.push('ellipsis')
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }

    // Add ellipsis if needed
    if (end < totalPages - 1) {
      pageNumbers.push('ellipsis')
    }

    // Always show last page
    pageNumbers.push(totalPages)

    return pageNumbers
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

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
      <div className="container">
        <Head>
          <title>Customers</title>
        </Head>
        <div className="container sticky top-0 bg-background py-4">
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.customer_id}
                  className=" bg-gray-900 even:bg-gray-800 border-b border-gray-700 "
                >
                  <th scope="row" className="px-6 py-4 font-medium text-white">
                    {customer.first_name} {customer.last_name}
                  </th>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">
                    {customer.create_date
                      ? formatDate(customer.create_date.toString())
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(2999)}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`/customers/${customer.customer_id}`}
                      className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}

              {customers.length === 0 && (
                <div className="w-full h-15 flex flex-1 justify-center">
                  <p className="text-center text-muted-foreground">
                    No customers found
                  </p>
                </div>
              )}
            </tbody>
          </table>
        </div>
        {metadata && metadata.totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className={
                    page <= 1
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) => (
                <PaginationItem key={index}>
                  {pageNumber === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => setPage(pageNumber)}
                      isActive={page === pageNumber}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className={
                    page >= totalPages
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {metadata && (
          <div className="py-5 text-sm text-muted-foreground text-center">
            Showing page {metadata.currentPage} of {metadata.totalPages} (
            {metadata.total} total results)
          </div>
        )}
      </div>
    </div>
  )
}
