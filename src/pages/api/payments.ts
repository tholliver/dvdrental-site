import { db } from '@/server/db'
import { QueryPayments } from '@/server/db/queries/query-payments'
import type { Payment, ResponseData } from '@/server/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | { message: 'Error' }>
) {
    const { by } = req.query
    try {
        const queryResult = await QueryPayments.GetAllPaymentsByDate(String(by))
        const payments: Payment[] = queryResult.rows.map((row: any) => ({
            date: row.date, // Adjust according to your actual database column name
            amount: row.amount, // Adjust according to your actual database column name
        }));

        res.status(200).json({ payments })
    } catch (error) {
        console.log('Error getting payment data on API.');
        res.status(200).json({ message: 'Error' })
    }
}