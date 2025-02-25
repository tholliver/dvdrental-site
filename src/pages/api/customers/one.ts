import { QueryCustomers } from '@/server/db/queries/query-customers';
import { CustomerDetailsResponse } from '@/server/types/api-responses';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CustomerDetailsResponse | { message: string }>) {

    try {
        const { id } = req.query
        if (!id) {
            return res.status(400).json({ message: 'Error on getting unknown customer.' })
        } else {
            const customerDetailedStats = await QueryCustomers.GetById(Number(id))
            return res.status(200).json({ ...customerDetailedStats })
        }
    } catch (error) {
        console.log('Error getting customers data on API.', error);
        return res.status(500).json({ message: 'Error getting customers data on API.' })
    }
}
