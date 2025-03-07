import { useRouter } from "next/router"
import { useDebouncedValue } from "./use-debunce"

export interface FilterState {
    title?: string
    category?: string
    rating?: string
    page?: number
    pageSize?: number
}

export function useFilmFilters() {
    const router = useRouter()

    const currentFilters = {
        title: (router.query.title as string) || "",
        category: (router.query.category as string) || "",
        rating: (router.query.rating as string) || "",
        page: Number(router.query.page) || 1,
        pageSize: Number(router.query.pageSize) || 10
    }

    // Debounce the current title from URL
    const debouncedTitle = useDebouncedValue(currentFilters.title, 300)

    const updateFilter = <T extends string | number>(key: string, value: T) => {
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
        filters: currentFilters,
        debouncedTitle,
        updateFilter,
    }
}

