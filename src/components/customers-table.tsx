import { SelectCustomer } from '@/server/db/schemas'

type CustomersTableProps = {
  customers: SelectCustomer[]
}

export default function CustomersTable({ customers }: CustomersTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
  return (
    <div>
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
                className="bg-gray-900 even:bg-gray-800 border-b border-gray-700"
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
              <td
                colSpan={5}
                className="px-6 py-12 text-center text-muted-foreground"
              >
                No customers found
              </td>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
