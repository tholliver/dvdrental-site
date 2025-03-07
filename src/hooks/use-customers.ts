import { useRouter } from "next/router"
import type { NextRouter } from "next/router"
import useSWR from "swr"
import type { PaginatedResponse } from "@/types/customer"
import { SelectCustomer } from "@/server/db/schemas"
import { fetcher } from "@/services/fetcher"

export interface customerFilterState {
    searchTerm?: string
    page?: number
    pageSize?: number
}

export function useCustomers() {
    const router = useRouter()

    const { searchTerm, page, pageSize } = getUrlParams(router)
    const { data, error, isLoading, isValidating } = useSWR<PaginatedResponse<SelectCustomer, "customers">>(
        `/api/customers/search?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`,
        fetcher,
        {
            keepPreviousData: true,
            revalidateOnFocus: false,
        },
    )

    function updateFilter<T extends string | number>(key: string, value: T) {
        const newQuery = {
            ...router.query,
            page: 1,
            [key]: value || undefined, // Remove empty values
        };

        router.push(
            {
                pathname: router.pathname,
                query: newQuery,
            },
            undefined,
            { shallow: true }
        );
    }

    return {
        filters: { searchTerm, page, pageSize },
        updateFilter: updateFilter,
        customers: data?.customers ?? [],
        metadata: data?.metadata,
        isLoading,
        isValidating,
        error,
        currentPage: page,
    }
}



export function getUrlParams(router: NextRouter) {
    // router.query.title
    return {
        searchTerm: (router.query.searchTerm) || "",
        page: Number(router.query.page) || 1,
        pageSize: Number(router.query.pageSize) || 10
    }
}
