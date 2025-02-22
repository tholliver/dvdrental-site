import { db } from "@/server/db"
import { categorySchema } from "../schema"

export const QueryCategories = {
    GetAll: function () {
        return db.select().from(categorySchema)
    }
}