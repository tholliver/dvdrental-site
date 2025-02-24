import { db } from "@/server/db"
import { customerSchema } from "@/server/db/schemas"
import { ilike, or, sql } from "drizzle-orm"

export const QueryCustomers = {
    Search: async ({
        page = 1,
        pageSize = 10,
        searchTerm = "",
    }: {
        page?: number
        pageSize?: number
        searchTerm?: string
    }) => {
        // Get total count for pagination
        const totalCount = await db
            .select({ count: sql<number>`count(*)` })
            .from(customerSchema)
            .where(
                or(
                    ilike(customerSchema.first_name, `%${searchTerm}%`),
                    ilike(customerSchema.last_name, `%${searchTerm}%`),
                    ilike(customerSchema.email, `%${searchTerm}%`),
                ),
            )

        const offset = (page - 1) * pageSize

        const customers = await db
            .select()
            .from(customerSchema)
            .where(
                or(
                    ilike(customerSchema.first_name, `%${searchTerm}%`),
                    ilike(customerSchema.last_name, `%${searchTerm}%`),
                    ilike(customerSchema.email, `%${searchTerm}%`),
                ),
            )
            .limit(pageSize)
            .offset(offset)

        const total = totalCount[0].count
        const totalPages = Math.ceil(total / pageSize)

        return {
            customers,
            metadata: {
                total,
                totalPages,
                currentPage: page,
                pageSize,
            },
        }
    },
}

