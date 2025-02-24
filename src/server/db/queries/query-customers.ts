import { db } from "@/server/db"
import { customerSchema } from "@/server/db/schemas"
import { ilike, or, sql, eq } from "drizzle-orm"

export const QueryCustomers = {
    Search2: async (page = 1, pageSize = 10, searchTerm = "") => {
        const sq = db
            .select({ id: customerSchema.customer_id })
            .from(customerSchema)
            .where(
                or(
                    ilike(customerSchema.first_name, `%${searchTerm}%`),
                    ilike(customerSchema.last_name, `%${searchTerm}%`),
                    ilike(customerSchema.email, `%${searchTerm}%`),
                )
            )
            .orderBy(customerSchema.customer_id)
            .limit(pageSize)
            .offset((page - 1) * pageSize)
            .as('subquery');

        const result = await db
            .select({
                customers: customerSchema,
                count: sql<number>`count(*) over()`
            })
            .from(customerSchema)
            .innerJoin(sq, eq(customerSchema.customer_id, sq.id))
            .orderBy(customerSchema.customer_id);

        const total = result[0]?.count ?? 0;
        const totalPages = Math.ceil(total / pageSize);

        return {
            customers: result.map(r => r.customers),
            metadata: {
                total,
                totalPages,
                currentPage: page,
                pageSize,
            },
        };
    },
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

