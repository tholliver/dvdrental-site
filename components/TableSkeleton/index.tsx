import { NextPage } from 'next'

interface skeProps {
  numberRows: number
}

export const TableSkeleton: NextPage<skeProps> = (props) => {
  return (
    <div className="m-4 p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
      {[...Array(props.numberRows)].map((row, i) => (
        <div
          key={i}
          className={`flex items-center justify-between ${
            i === 0 ? '' : ' pt-4'
          }`}
        >
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
      ))}
    </div>
  )
}

// className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700  dark:border-gray-700 dark:bg-slate-600 "

// {i === 0 ? (
//     <div className="flex items-center justify-between">
//       <div>
//         <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-500 w-24 mb-2.5"></div>
//         <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-500"></div>
//       </div>
//       <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
//     </div>
//   ) : (
//     <div className="flex items-center justify-between ">
//       <div>
//         <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-500 w-24 mb-2.5"></div>
//         <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-500"></div>
//       </div>
//       <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
//     </div>
//   )}

export default TableSkeleton
