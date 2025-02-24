import { SelectCustomer, SelectFilm } from "@/server/db/schemas"

// export interface PaginatedResponse {
//     customers: SelectCustomer[]
//     metadata: {
//         total: number
//         totalPages: number
//         currentPage: number
//         pageSize: number
//     }
// }


export type PaginatedResponse<T, K extends string = 'items'> = {
    [key in K]: T[]
} & {
    metadata: {
        total: number
        totalPages: number
        currentPage: number
        pageSize: number
    }
}

export type CustomerPaginatedResponse = PaginatedResponse<SelectCustomer, "customers">
export type FilmPaginatedResponse = PaginatedResponse<SelectFilm, "films">
