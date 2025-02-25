import { QueryFilms } from '@/server/db/queries/query-films';
import { FilmInfoResponse } from '@/server/types/api-responses';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<FilmInfoResponse | { message: string }>) {

    try {
        const { id } = req.query
        console.log(typeof id);

        if (!id) {
            return res.status(400).json({ message: 'Error on getting unknown customer.' })
        } else {
            const filmDetailedStats = await QueryFilms.GetById(Number(id))
            return res.status(200).json({ ...filmDetailedStats })
        }
    } catch (error) {
        console.log('Error getting film data on API.', error);
        return res.status(500).json({ message: 'Error getting film data on API.' })
    }
}
