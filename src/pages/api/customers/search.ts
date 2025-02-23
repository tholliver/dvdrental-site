import { QueryCustomers } from '@/server/db/queries/query-customers';
import { SelectCustomer } from '@/server/db/schemas/index';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SelectCustomer[] | { message: string }>) {
    try {
        const searchTerm = req.query.searchTerm?.toString().trim() ?? "";

        const customers = await QueryCustomers.Search(searchTerm);
        return res.status(200).json(customers);

    } catch (error) {
        console.log('Error getting customers data on API.', error);
        res.status(500).json({ message: 'Error getting customers data on API.' })
    }
}
