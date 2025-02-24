import { QueryFilms } from "@/server/db/queries/query-films";
import type { FilmPaginatedResponse } from "@/types/customer";
import type { NextApiRequest, NextApiResponse } from "next/types";

export default async function searchFilms(
    req: NextApiRequest,
    res: NextApiResponse<FilmPaginatedResponse | { error: string }>
) {
    const { category, rating, title } = req.query;

    try {
        const filters = {
            title: title ? String(title) : undefined,
            category: category ? String(category) : undefined,
            rating: rating ? String(rating) : undefined,
            page: Number(req.query.page) || 1,
            pageSize: Number(req.query.pageSize) || 10
        };

        const films = await QueryFilms.Search(filters);
        return res.status(200).json(films);
    } catch (error) {
        console.log('Error on server ', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
