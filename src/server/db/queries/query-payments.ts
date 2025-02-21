import { db } from "@/server/db"
import { GroupByType } from "@/server/types"
import { getGroupByKey } from "@/server/utils"
import { sql } from "drizzle-orm"

export const QueryPayments = {
    GetAllPaymentsByDate: function (by: string) {
        const groupBy = getGroupByKey(by as keyof GroupByType)

        return db.execute(
            sql.raw(`select TO_CHAR(DATE_TRUNC('${groupBy.spec}', payment_date),
                          '${groupBy.format}') AS date,
                           sum(amount) as amount
                  from payment
                  group by DATE_TRUNC('${groupBy.spec}', payment_date)
                  order by date
                  limit 7`)
        )
        // [FIX] -> 
        // PostgresError: column "payment.payment_date" must appear in the GROUP BY clause or be used in an aggregate function
        // return await dbConn
        //   .select({
        //     date: sql`TO_CHAR(DATE_TRUNC('${groupBy.spec}', ${paymentSchema.payment_date}), '${groupBy.format}') AS date_only`,
        //     dayTotal: sum(paymentSchema.amount),
        //   })
        //   .from(paymentSchema)
        //   .groupBy(sql`DATE_TRUNC('${groupBy.spec}',${paymentSchema.payment_date})`)
        //   .orderBy(sql`DATE_TRUNC('${groupBy.spec}',${paymentSchema.payment_date})`)
    }
}