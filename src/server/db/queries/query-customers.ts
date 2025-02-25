import { db } from "@/server/db"
import { categorySchema, customerSchema, film_category, filmSchema, inventorySchema, paymentSchema, rentalSchema } from "@/server/db/schemas"
import { ilike, or, sql, eq, getTableColumns, avg, count, desc, max, min, sum } from "drizzle-orm"

export const QueryCustomers = {
    GetById: async function name(customerId: number) {
        const { first_name, last_name, email, active } = getTableColumns(customerSchema);
        const [customerInfo] = await db.select({ first_name, last_name, email, active })
            .from(customerSchema)
            .where(eq(customerSchema.customer_id, customerId))

        // Basic stats
        const [stats] = await db
            .select({
                totalPayments: sql<number>`cast(sum(${paymentSchema.amount}) as float)`,
                rentalCount: sql<number>`cast(count(${rentalSchema.rental_id}) as int)`,
                avgPayment: sql<number>`cast(avg(${paymentSchema.amount}) as float)`,
                lastPaymentDate: max(paymentSchema.payment_date).as('lastPaymentDate'),
                firstRentalDate: min(rentalSchema.rental_date).as('firstRentalDate'),
                mostRecentRental: max(rentalSchema.rental_date).as('mostRecentRental'),
            })
            .from(rentalSchema)
            .leftJoin(paymentSchema, eq(rentalSchema.rental_id, paymentSchema.rental_id))
            .where(eq(rentalSchema.customer_id, customerId));

        // Top rented films
        const topFilms = await db
            .select({
                filmId: filmSchema.film_id,
                title: filmSchema.title,
                rentalCount: count(rentalSchema.rental_id).as('rentalCount'),
            })
            .from(rentalSchema)
            .leftJoin(inventorySchema, eq(rentalSchema.inventory_id, inventorySchema.inventory_id))
            .leftJoin(filmSchema, eq(inventorySchema.film_id, filmSchema.film_id))
            .where(eq(rentalSchema.customer_id, customerId))
            .groupBy(filmSchema.film_id, filmSchema.title)
            .orderBy(desc(count(rentalSchema.rental_id)))
            .limit(5);

        // Favorite category
        const [favoriteCategory] = await db
            .select({
                categoryName: categorySchema.name,
                rentalCount: count(rentalSchema.rental_id).as('rentalCount'),
            })
            .from(rentalSchema)
            .leftJoin(inventorySchema, eq(rentalSchema.inventory_id, inventorySchema.inventory_id))
            .leftJoin(filmSchema, eq(inventorySchema.film_id, filmSchema.film_id))
            .leftJoin(film_category, eq(filmSchema.film_id, film_category.film_id))
            .leftJoin(categorySchema, eq(film_category.category_id, categorySchema.category_id))
            .where(eq(rentalSchema.customer_id, customerId))
            .groupBy(categorySchema.name)
            .orderBy(desc(count(rentalSchema.rental_id)))
            .limit(1);

        // Most active month
        const [mostActiveMonth] = await db
            .select({
                month: sql<Date>`DATE_TRUNC('month', ${rentalSchema.rental_date})`.as('month'),
                rentalCount: count(rentalSchema.rental_id).as('rentalCount'),
            })
            .from(rentalSchema)
            .where(eq(rentalSchema.customer_id, customerId))
            .groupBy(sql`DATE_TRUNC('month', ${rentalSchema.rental_date})`)
            .orderBy(desc(count(rentalSchema.rental_id)))
            .limit(1);

        return {
            ...customerInfo,
            stats,
            topFilms,
            favoriteCategory,
            mostActiveMonth
        };
    },
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

