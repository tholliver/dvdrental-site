import useSWR from "swr"
import type { PaginatedResponse } from "@/types/customer"
import { SelectFilm } from "@/server/db/schemas"
import { fetcher } from "@/services/fetcher"

export function useFilms(category = "", rating = "", searchTerm = "", page = 1, pageSize = 10) {
    const { data, error, isLoading, mutate, isValidating } = useSWR<PaginatedResponse<SelectFilm, "films">>(
        `/api/films/search?category=${category}&title=${searchTerm}&rating=${rating}&page=${page}&pageSize=${pageSize}`,

        fetcher,
        {
            keepPreviousData: true,
            revalidateOnFocus: false,
        },
    )

    return {
        films: data?.films ?? [],
        metadata: data?.metadata,
        isLoading,
        isValidating,
        error,
        mutate,
    }
}

