import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { PaginateTypes } from '../../interfaces'



const Paginate = ({ setPage, tasks }: PaginateTypes) => {
  const [to, setTo] = useState(0)
  const [from, setFrom] = useState(0)
  const [pagesArray, setPagesArray] = useState<Array<any>>([])

  const arrayForPageItems = async () => {
    let itemPages: any = [];
    for (let i = 0; i <= tasks.pagesTotal; i++) {
      itemPages[i] = { value: i, label: i + 1 };
    }
    setPagesArray(await itemPages);
    console.log(pagesArray)
  }

  const calculatePaginate = () => {
    let calculateFrom = tasks.rowsTotal > 0 ? (tasks.page * 10) + 1 : 0;
    let calculateTo;
    if (tasks.page == 0) {
      calculateTo = tasks.rowsTotal < 10 ? tasks.rowsTotal : 10;
    } else {
      calculateTo = (tasks.page * 10) + 10 > tasks.rowsTotal ? tasks.rowsTotal : (tasks.page * 10) + 10;
    }
    setFrom(calculateFrom);
    setTo(calculateTo);

  }

  const pageSelect = (page: number) => {
    setPage(page)
  }


  useEffect(() => {
    if (tasks != null) {
      calculatePaginate()
      arrayForPageItems()
    }

  }, [tasks])
  return (
    <div className="px-4 py-3 flex items-center justify-between pr-0">
      <div className="flex-1 flex justify-between sm:hidden">
        <button >
          <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </a>
        </button>

        <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-white">
            showing <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span> of{' '}
            <span className="font-medium">{tasks?.rowsTotal}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button disabled={tasks?.page == 0} onClick={() => pageSelect((tasks?.page - 1))}>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </button>

            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

            {pagesArray && pagesArray?.map(page =>
            (
              <a
                onClick={() => pageSelect((page.value))}
                key={page.value}
                href="#"
                aria-current="page"
                className={`${tasks.page == page.value ? 'bg-green-100' : 'bg-white'} border-gray-300 hover:bg-green-100 text-gray-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
              >
                {page.label}
              </a>)

            )
            }

            <button disabled={tasks?.page == tasks?.pagesTotal} onClick={() => pageSelect((tasks?.page + 1))}>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
export default Paginate
