import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { FilterState } from '@/hooks/use-film-filters'
// import { updateFilter } from '../hooks/use-film-filters'

interface PaginatorProps {
  page: number
  total: number
  totalPages: number
  currentPage: number
  pageSize: number
  updatePage: <T extends string | number>(key: string, value: T) => void
}

export default function Paginator({
  page,
  total,
  totalPages = 1,
  currentPage,
  pageSize,
  updatePage,
}: PaginatorProps) {
  // Generate array of page numbers to display
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: (number | 'ellipsis')[] = []
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always show first page
    pageNumbers.push(1)

    // Calculate start and end of page numbers around current page
    let start = Math.max(2, page - 2)
    let end = Math.min(totalPages - 1, page + 2)

    // Adjust if we're near the start
    if (page <= 4) {
      end = 5
    }

    // Adjust if we're near the end
    if (page >= totalPages - 3) {
      start = totalPages - 4
    }

    // Add ellipsis if needed
    if (start > 2) {
      pageNumbers.push('ellipsis')
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }

    // Add ellipsis if needed
    if (end < totalPages - 1) {
      pageNumbers.push('ellipsis')
    }

    // Always show last page
    pageNumbers.push(totalPages)

    return pageNumbers
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => updatePage('page', Math.max(1, page - 1))}
                className={
                  page <= 1
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>

            {getPageNumbers().map((pageNumber, index) => (
              <PaginationItem key={index}>
                {pageNumber === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => updatePage('page', pageNumber)}
                    isActive={page === pageNumber}
                    className="cursor-pointer"
                  >
                    {pageNumber}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  updatePage('page', Math.min(totalPages, page + 1))
                }
                className={
                  page >= totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <div className="mb-5 text-sm text-muted-foreground text-center">
        Showing page {currentPage} of {totalPages} ({total} total results)
      </div>
    </div>
  )
}
