import React from 'react'
import { API_URI } from '@/config'
import { CustomerInfo } from '@/types'
import useSWR from 'swr'
import { fetcher } from '@/services/fetcher'

const Customer = () => {
  const { data, isLoading, error } = useSWR(`${API_URI}/customers`, fetcher)
  // const response = await fetch(`${API_URI_LOCAL}/customers/3`)

  if (isLoading) return <div>nbh</div>
  if (!data) return <div>Error</div>

  return (
    <div>
      <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">
        Customers
      </h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                {' '}
                Active
              </th>
              <th scope="col" className="px-6 py-3">
                {' '}
                Joined date
              </th>
              <th scope="col" className="px-6 py-3">
                {' '}
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer: CustomerInfo) => (
              <tr
                key={customer.customer_id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {customer.nombre} {customer.apellido}
                </th>
                <td className="px-6 py-4"> {customer.email}</td>
                <td className="px-6 py-4">
                  {' '}
                  {customer.create_date.toISOString()}
                </td>
                <td className="px-6 py-4"> $2999</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={`/customers/${customer.customer_id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}

            {/* <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4"> Black</td>
              <td className="px-6 py-4"> Accessories</td>
              <td className="px-6 py-4"> $99</td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Customer
