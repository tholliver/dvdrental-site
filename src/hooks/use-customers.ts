import useSWR from "swr"
import type { PaginatedResponse } from "@/types/customer"
import { SelectCustomer } from "@/server/db/schemas"
import { fetcher } from "@/services/fetcher"

export function useCustomers(searchTerm = "", page = 1, pageSize = 10) {
    const { data, error, isLoading, mutate, isValidating } = useSWR<PaginatedResponse<SelectCustomer, "customers">>(
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

