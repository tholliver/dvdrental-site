import { SelectCustomer } from "@/server/db/schemas"

export interface PaginatedResponse {
    customers: SelectCustomer[]
    metadata: {
        total: number
        totalPages: number
        currentPage: number
        pageSize: number
    }
}


