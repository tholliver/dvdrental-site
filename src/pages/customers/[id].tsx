import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CustomerData, RentalInfo } from '@/types'
import { fetcher } from '@/services/fetcher'

import { API_URI } from '@/config'
import TableSkeleton from '@/components/TableSkeleton'
import CustomerCard from '@/components/Cards/CustomerCard'

const Customer = () => {
  const { id } = useRouter().query
  const { data, isLoading, error } = useSWR(`${API_URI}/rentals/${id}`, fetcher)
  console.log('Here the id', id)

  if (isLoading)
    return (
      <div className="m-4">
        <TableSkeleton numberRows={10} />
      </div>
    )

  if (error) return <div>Error </div>

  return (
    <div className="py-1">
      <div className="m-4 rounded-t-lg">
        <CustomerCard id={id} />
      </div>
      <div id="rented-films-table" className="px-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Films rented
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Here the rented films by the user.
              </p>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Film name
                </th>
                <th scope="col" className="px-6 py-3">
                  Rental Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Return Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((rental: RentalInfo, i: number) => (
                <tr
                  key={i}
                  className={`bg-white dark:bg-gray-800 ${
                    i === data.length ? '' : 'border-b dark:border-gray-700'
                  }`}
                >
                  <th
                    scope="row"
                    className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`}
                  >
                    {rental.filmName}
                  </th>
                  <td className="px-6 py-4">{rental.rentalDate}</td>
                  <td className="px-6 py-4">{rental.returnDate}</td>
                  <td className="px-6 py-4">{rental.amountPaid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Customer
