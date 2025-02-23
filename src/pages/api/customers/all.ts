import { QueryCustomers } from '@/server/db/queries/query-customers';
import { SelectCustomer } from '@/server/db/schemas/index';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    _: NextApiRequest,
    res: NextApiResponse<SelectCustomer[] | { message: 'Error getting customers data on API.' }>) {

    try {
        const categories = await QueryCustomers.GetAll()

        res.status(200).json(categories)
    } catch (error) {
        console.log('Error getting customers data on API.', error);
        res.status(500).json({ message: 'Error getting customers data on API.' })
    }
}
