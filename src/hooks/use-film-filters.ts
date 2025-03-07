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
    // Get current values directly from router.query
    const currentFilters = {
        title: (router.query.title as string) || "",
        category: (router.query.category as string) || "",
        rating: (router.query.rating as string) || "",
        page: Number(router.query.page) || 1,
        pageSize: Number(router.query.pageSize) || 10
    }

    // Debounce the current title from URL
    const debouncedTitle = useDebouncedValue(currentFilters.title, 300)

    const updateFilter = (key: keyof FilterState, value: string | number) => {
        // Update URL with new value
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

    // function updateURLParams(key: keyof FilterState, value: string | number) {
    //     router.push(
    //         {
    //             pathname: router.pathname,
    //             query: {
    //                 ...router.query,
    //                 [key]: value || undefined, // Remove empty values from URL
    //             },
    //         },
    //         undefined,
    //         { shallow: true },
    //     )
    // }

    return {
        filters: currentFilters,
        debouncedTitle,
        updateFilter,
    }
}

