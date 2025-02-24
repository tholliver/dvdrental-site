import useSWR from "swr"
import type { PaginatedResponse } from "@/types/customer"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useCustomers(searchTerm = "", page = 1, pageSize = 10) {
    const { data, error, isLoading, mutate, isValidating } = useSWR<PaginatedResponse>(
        `/api/customers/search?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`,
        fetcher,
        {
            keepPreviousData: true,
            revalidateOnFocus: false,
        },
    )

    return {
        customers: data?.customers ?? [],
        metadata: data?.metadata,
        isLoading,
        error,
        mutate,
    }
}

