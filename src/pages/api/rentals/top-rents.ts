import { QueryRentals } from "@/server/db/queries/query-rentals"
import { TopRentalResponse, TopRentFilm } from "@/server/types"
import { NextApiRequest, NextApiResponse } from "next/types"

export default async function totalTopRentedFilms(
    req: NextApiRequest,
    res: NextApiResponse<TopRentFilm[] | { message: 'Error getting top rental data on API' }>
) {
    const { time, lapse } = req.query
    try {
        if (time && lapse) {
            const topRentedFilms = await
                QueryRentals.GetTopRentedFilmsTimeLapsed(String(time), Number(lapse)).limit(20)
            return res.status(200).json(topRentedFilms)
        }

        const topRentedFilms = await QueryRentals.GetTopRentedFilms().limit(20)
        return res.status(200).json(topRentedFilms)
    } catch (error) {
        res.status(200).json({ message: 'Error getting top rental data on API' })
    }
}