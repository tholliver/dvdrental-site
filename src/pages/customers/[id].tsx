import useSWR, { Fetcher } from 'swr'

type RentalInfo = {
  filmName: string
  rentalDate: string
  returnDate: string
  amountPaid: string
  customerId: number
}

const Customer = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, isLoading, error } = useSWR(
    `http://localhost:3001/rentals/3`,
    fetcher
  )

  if (isLoading) return <div>Loading </div>

  if (error) return <div>Error </div>

  return (
    <div className="">
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
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {rental.filmName}
                  </th>
                  <td className="px-6 py-4">{rental.rentalDate}</td>
                  <td className="px-6 py-4">{rental.returnDate}</td>
                  <td className="px-6 py-4">{rental.amountPaid}</td>
                </tr>
              ))}
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">$1999</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Customer
