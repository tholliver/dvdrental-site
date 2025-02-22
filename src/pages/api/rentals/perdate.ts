import { QueryRentals } from "@/server/db/queries/query-rentals"
import type { Rental, RentalResponseData } from '@/server/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RentalResponseData | { message: 'Error getting payment data on API' }>
) {
    const { by } = req.query
    try {
        const queryResult = await QueryRentals.GetRentalsByDateGroup(String(by))
        const rentals: Rental[] = queryResult.rows.map((row: any) => ({
            date: row.date, // Adjust according to your actual database column name
            rents: row.amount, // Adjust according to your actual database column name
        }));

        res.status(200).json({ rentals })
    } catch (error) {
        console.log('Error getting payment data on API.');
        res.status(200).json({ message: 'Error getting payment data on API' })
    }
}