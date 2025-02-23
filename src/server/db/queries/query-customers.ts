import { db } from "@/server/db"
import { customerSchema } from "@/server/db/schemas"
import { ilike, or } from "drizzle-orm"

export const QueryCustomers = {
    GetAll: function () {
        return db.select().from(customerSchema)
    },
    Search: function (searchTerm: string) {
        return db.select().from(customerSchema)
            .where(
                or(ilike(customerSchema.first_name, `%${searchTerm}%`),
                    ilike(customerSchema.last_name, `%${searchTerm}%`),
                    ilike(customerSchema.email, `%${searchTerm}%`))
            )
    }
}