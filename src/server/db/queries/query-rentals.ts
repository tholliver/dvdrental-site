import { db } from "@/server/db"
import { GroupByType } from "@/server/types"
import { getGroupByKey, timeLapseConverter } from "@/server/utils"
import { sql, eq, sum, between, desc } from "drizzle-orm"
import { filmSchema, inventorySchema, paymentSchema, rentalSchema } from "../schema"

export const QueryRentals = {
    GetCustomerRentals: function (customerId: number) {
        return db
            .select({
                filmName: filmSchema.title,
                rentalDate: rentalSchema.rental_date,
                returnDate: rentalSchema.return_date,
                amountPaid: sql`${paymentSchema.amount}`.mapWith(Number),
            })
            .from(filmSchema)
            .innerJoin(inventorySchema, eq(filmSchema.film_id, inventorySchema.film_id))
            .innerJoin(
                rentalSchema,
                eq(inventorySchema.inventory_id, rentalSchema.inventory_id)
            )
            .innerJoin(
                paymentSchema,
                eq(paymentSchema.rental_id, rentalSchema.rental_id)
            )
            .where(eq(rentalSchema.customer_id, customerId))

    },
    GetTopRentedFilmsTimeLapsed: function (time: string, lapse: number) {
        const timelapseTyped = timeLapseConverter(time, lapse)

        return db
            .select({
                film_id: filmSchema.film_id,
                filmName: filmSchema.title,
                amountMade: sql`sum(${paymentSchema.amount})`.mapWith(Number),
                rating: filmSchema.rating,
                rentedTimes: sql<number>`count(${filmSchema.film_id})`,
            })
            .from(filmSchema)
            .innerJoin(inventorySchema, eq(filmSchema.film_id, inventorySchema.film_id))
            .innerJoin(
                rentalSchema,
                eq(inventorySchema.inventory_id, rentalSchema.inventory_id)
            )
            .innerJoin(
                paymentSchema,
                eq(rentalSchema.rental_id, paymentSchema.rental_id)
            )
            .where(
                between(
                    rentalSchema.rental_date,
                    sql`${timelapseTyped}`,
                    sql`CURRENT_DATE`
                )
            )
            .groupBy(filmSchema.film_id)
            .orderBy(desc(sql`count(${filmSchema.film_id})`))
    },
    GetTopRentedFilms: function () {
        return db
            .select({
                film_id: filmSchema.film_id,
                filmName: filmSchema.title,
                amountMade: sql`sum(${paymentSchema.amount})`.mapWith(Number),
                rating: filmSchema.rating,
                rentedTimes: sql<number>`count(${filmSchema.film_id})`,
            })
            .from(filmSchema)
            .innerJoin(inventorySchema, eq(filmSchema.film_id, inventorySchema.film_id))
            .innerJoin(
                rentalSchema,
                eq(inventorySchema.inventory_id, rentalSchema.inventory_id)
            )
            .innerJoin(
                paymentSchema,
                eq(rentalSchema.rental_id, paymentSchema.rental_id)
            )
            .groupBy(filmSchema.film_id)
            .orderBy(desc(sql`count(${filmSchema.film_id})`))
    },
    GetRentalsByDateGroup: function (by: string) {
        const groupBy = getGroupByKey(by as keyof GroupByType)

        return db.execute(
            sql.raw(`select TO_CHAR(DATE_TRUNC('${groupBy.spec}', return_date),
                            '${groupBy.format}') AS date,
                             count(*) AS amount
                    from rental
                    group by DATE_TRUNC('${groupBy.spec}', return_date)
                    order by date
                    limit 7
                    `)
        )
    }


}