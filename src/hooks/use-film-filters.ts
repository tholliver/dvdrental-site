import { useRouter } from "next/router"
import { useDebounce, useDebouncedValue } from "./use-debunce"

interface FilterState {
    title?: string
    category?: string
    rating?: string
}

export function useFilmFilters() {
    const router = useRouter()

    // Get current values directly from router.query
    const currentFilters = {
        title: (router.query.title as string) || "",
        category: (router.query.category as string) || "",
        rating: (router.query.rating as string) || "",
    }

    // Debounce the current title from URL
    const debouncedTitle = useDebouncedValue(currentFilters.title, 300)

    const updateFilter = (key: keyof FilterState, value: string) => {
        // Update URL with new value
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    [key]: value || undefined, // Remove empty values from URL
                },
            },
            undefined,
            { shallow: true },
        )
    }

    return {
        filters: currentFilters,
        debouncedTitle,
        updateFilter,
    }
}

