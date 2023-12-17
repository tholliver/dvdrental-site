import { CustomerData } from '@/types'
import { NextPage } from 'next'
import { fetcher } from '@/services/fetcher'
import useSWR from 'swr'
import { API_URI } from '@/config'

interface customerPageProps {
  data?: CustomerData
}

const CustomerCard: NextPage<customerPageProps> = () => {
  const { data, isLoading, error } = useSWR<CustomerData>(
    `${API_URI}/customers/3`,
    fetcher
  )

  if (isLoading) return <div className="m-4">Loading...</div>

  if (error || !data) return <div>Error </div>

  return (
    <div id="customer-info" className=" dark:bg-gray-700  rounded-lg ">
      {/* <!-- Card Header --> */}
      <div className=" dark:bg-gray-800 rounded-t-lg text-white">
        <h3 className="m-4 p-8 text-lg font-semibold">
          {data.userInfo.nombre} {data.userInfo.apellido}
        </h3>
      </div>

      {/* <!-- Card Body --> */}
      <div className=" ">
        {/* <!-- Customer Address (Left Side) --> */}
        <div className="">
          <h4 className="text-sm font-medium text-gray-600">
            Customer Address:
          </h4>
          <p className="text-gray-800">
            {data.userInfo.address.nombre} {data.userInfo.address.distrito}
          </p>
        </div>

        {/* <!-- Details (Right Side) --> */}
        <div className="flex justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-600">Total Rents:</h4>
            <span
              key={data.userInfo.customer_id}
              className="px-4 text-blue-800 text-xs font-medium inline-flex items-center  py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
            >
              $ {data.paymentsSummary.count}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-600">Avg:</h4>
            <span
              key={data.userInfo.customer_id}
              className=" px-4 text-blue-800 text-xs font-medium inline-flex items-center  py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
            >
              $ {data.paymentsSummary.averagePayment}
            </span>
          </div>

          {/* <!-- Additional Details --> */}
          <div>
            <h4 className="text-sm font-medium text-gray-600">Last Payment:</h4>
            <span
              key={data.userInfo.customer_id}
              className=" px-4 text-blue-800 text-xs font-medium inline-flex items-center  py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
            >
              $ {data.paymentsSummary.totalSpend}
            </span>
          </div>

          <div className="mb-4 pb-8">
            <h4 className="text-sm font-medium ">Total Balance:</h4>
            <span
              key={data.userInfo.customer_id}
              className="px-4 text-blue-800 text-xs font-medium inline-flex items-center  py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
            >
              $ {data.paymentsSummary.totalSpend}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerCard
