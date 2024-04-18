import { CustomerData } from '@/types'
import { NextPage } from 'next'
import { fetcher } from '@/services/fetcher'
import useSWR from 'swr'
import { API_URI } from '@/config'

interface customerPageProps {
  data?: CustomerData
  id: string | string[] | undefined
}

const CustomerCard: NextPage<customerPageProps> = ({ id }) => {
  const { data, isLoading, error } = useSWR<CustomerData>(
    `${API_URI}/customers/${id}`,
    fetcher
  )

  if (isLoading) return <div className="m-4">Loading...</div>

  if (error || !data) return <div>Error </div>

  return (
    <div id="customer-info" className="px-4 dark:bg-gray-800  rounded-lg ">
      {/* <!-- Card Header --> */}
      <div className="py-1 dark:bg-gray-800 rounded-t-lg text-white">
        <h3 className="text-2xl font-bold dark:text-white">
          {data.userInfo.first_name} {data.userInfo.last_name}
        </h3>
      </div>

      {/* <!-- Card Body --> */}
      <div className=" ">
        {/* <!-- Customer Address (Left Side) --> */}
        <div className="">
          <h4 className="text-md font-medium text-gray-900 dark:text-white">
            Customer Address:
          </h4>
          <p className="text-gray-500 whitespace-normal dark:text-gray-400">
            {data.userInfo.address.nombre} {data.userInfo.address.distrito}
          </p>
        </div>

        {/* <!-- Details (Right Side) --> */}
        <div className="flex justify-between items-center pb-2">
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white">
              Total Rents:
            </h4>
            <span
              key={data.userInfo.customer_id}
              className="px-4 text-blue-800 text-xs font-medium inline-flex items-center  py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
            >
              $ {data.paymentsSummary.count}
            </span>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white">
              Avg:
            </h4>
            <span
              key={data.userInfo.customer_id}
              className=" px-4 text-blue-800 text-xs font-medium inline-flex items-center  py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
            >
              $ {data.paymentsSummary.averagePayment}
            </span>
          </div>

          {/* <!-- Additional Details --> */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white">
              Last Payment:
            </h4>
            <span
              key={data.userInfo.customer_id}
              className=" px-4 text-blue-800 text-xs font-medium inline-flex items-center  py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
            >
              $ {data.paymentsSummary.totalSpend}
            </span>
          </div>

          <div className=" ">
            <h4 className="text-md font-medium text-gray-900 dark:text-white">
              Total Balance:
            </h4>
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
