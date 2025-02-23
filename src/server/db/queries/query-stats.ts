import { count, sql } from "drizzle-orm"
import { db } from ".."
import { customerSchema, filmSchema, inventorySchema, paymentSchema, rentalSchema } from "@/server/db/schemas"

export const QueryStats =
{
    GetTotalRentalsByDate: function (startDate: string) {
        const currentDate = new Date().toISOString().slice(0, 10)

        return db.select({
            totalRents: count(rentalSchema.rental_date)
        }).from(rentalSchema)
            .where(
                sql`${rentalSchema.last_update}::date BETWEEN ${startDate} AND ${currentDate}`
            )
    },
    GetTotalPaysByDate: function (startDate: string) {
        const currentDate = new Date().toISOString().slice(0, 10)

        return db
            .select({
                totalPays: sql<number>`COALESCE(SUM(${paymentSchema.amount}), 0)`
            })
            .from(paymentSchema)
            .where(
                sql`${paymentSchema.payment_date}::date BETWEEN ${startDate} AND ${currentDate}`
            )
    }, GetUnitsOnInventory: function () {
        return db.select({ filmUnits: count(inventorySchema.film_id) }).from(inventorySchema)
    },
    GetTotalCustomer: function () {
        return db.select({ totalCustomers: count(customerSchema.first_name) }).from(customerSchema)
    },
    GetTotalFilms: function () {
        return db.select({ totalFilms: count(filmSchema.title) }).from(filmSchema)
    }
}