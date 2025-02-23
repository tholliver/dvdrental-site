import { db } from "@/server/db"
import { categorySchema } from "@/server/db/schemas"

export const QueryCategories = {
    GetAll: function () {
        return db.select().from(categorySchema)
    }
}