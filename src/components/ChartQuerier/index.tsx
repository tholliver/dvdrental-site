import { useState } from 'react'
import { LineChart } from '../CustomCharts/LineChart'
import { BarChart } from '../CustomCharts/BarChart'

const Querier = () => {
  const [groupBy, setGroupBy] = useState('day')

  return (
    <>
      <div className="flex flex-col mx-2 dark:text-white dark:bg-slate-800 rounded-md">
        <section className="flex gap-2 p-2 items-center dark:text-gray-300">
          <p>Showing charts by {groupBy}</p>
          <button
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={() => setGroupBy('day')}
          >
            day
          </button>
          <button
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={() => setGroupBy('month')}
          >
            month
          </button>
          <button
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={() => setGroupBy('year')}
          >
            year
          </button>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <BarChart groupBy={groupBy} />
          </div>
          <div>
            <LineChart groupBy={groupBy} />
          </div>
        </section>
      </div>
    </>
  )
}

export default Querier
