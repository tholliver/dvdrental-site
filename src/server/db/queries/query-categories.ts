import { db } from "@/server/db"
import { categorySchema } from "@/server/db/schemas"
import { getTableColumns } from "drizzle-orm"

export const QueryCategories = {
    GetAll: function () {
        const { category_id, name } = getTableColumns(categorySchema)
        return db.select({ value: category_id, name }).from(categorySchema)
    }
}