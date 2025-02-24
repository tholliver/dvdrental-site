import { QueryCustomers } from "@/server/db/queries/query-customers"
import type { NextApiRequest, NextApiResponse } from "next"
import type { PaginatedResponse } from "@/types/customer"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PaginatedResponse | { message: string }>,
) {
    try {
        const page = Number(req.query.page) || 1
        const pageSize = Number(req.query.pageSize) || 10
        const searchTerm = req.query.searchTerm?.toString().trim() ?? ""

        const result = await QueryCustomers.Search({ page, pageSize, searchTerm })
        return res.status(200).json(result)
    } catch (error) {
        console.log("Error getting customers data on API.", error)
        res.status(500).json({ message: "Error getting customers data on API." })
    }
}

