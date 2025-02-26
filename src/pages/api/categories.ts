import { QueryCategories } from '@/server/db/queries/query-categories';
import { SelectCategory } from '@/server/db/schemas/index';
import type { CategoryResponse } from '@/server/types'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    _: NextApiRequest,
    res: NextApiResponse<CategoryResponse[] | { message: string }>) {

    try {
        const categories = await QueryCategories.GetAll()

        res.status(200).json(categories)
    } catch (error) {
        console.log('Error getting categories data on API.', error);
        res.status(200).json({ message: 'Error getting categories data on API.' })
    }
}
