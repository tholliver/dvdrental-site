'use client'

import type React from 'react'
import { useCallback, useState } from 'react'
import type { CustomerInfo } from '@/types'
import useSWR from 'swr'
import { fetcher } from '@/services/fetcher'
import Head from 'next/head'
import { useDebounce } from '@/hooks/use-debunce'
import { Search } from 'lucide-react'

const Customer = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSetSearchTerm = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  const debouncedSetSearchTerm = useDebounce(handleSetSearchTerm, 300)

  const { data, isLoading, error } = useSWR<CustomerInfo[]>(
    `/api/customers/search?searchTerm=${searchTerm}`,
    fetcher
  )
  console.log(data, error)

  const handleCustomerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchTerm(event.target.value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>Customers</title>
      </Head>

      <h3 className="p-4 text-3xl font-bold text-gray-900 dark:text-white">
        Customers
      </h3>

      <div className="relative p-3 overflow-x-auto shadow-md sm:rounded-lg mx-4">
        <div className="flex items-center mb-4 gap-2">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              className="w-full p-2.5 ps-10 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg 
                         focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-600 
                         dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              type="text"
              onChange={handleCustomerSearch}
              placeholder="Search customers..."
            />
          </div>
        </div>

        {error ? (
          <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
            Error loading customers
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-tl-lg">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Joined date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total paid
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-tr-lg">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr className="animate-pulse bg-white dark:bg-gray-800">
                    <td colSpan={5} className="px-6 py-4 text-center">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                    </td>
                  </tr>
                ) : (
                  data?.map((customer) => (
                    <tr
                      key={customer.customer_id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 
                               hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {customer.first_name} {customer.last_name}
                      </th>
                      <td className="px-6 py-4">{customer.email}</td>
                      <td className="px-6 py-4">
                        {formatDate(customer.create_date)}
                      </td>
                      <td className="px-6 py-4">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(2999)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href={`/customers/${customer.customer_id}`}
                          className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Customer
