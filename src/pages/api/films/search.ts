import { QueryFilms } from "@/server/db/queries/query-films";
import { SelectFilm } from "@/server/db/schema";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function searchFilms(
    req: NextApiRequest,
    res: NextApiResponse<SelectFilm[] | { error: "Internal Server Error" }>
) {
    const { category, rating, title, offset } = req.query;

    try {
        const filters = {
            title: title ? String(title) : undefined,
            category: category ? String(category) : undefined,
            rating: rating ? String(rating) : undefined,
            offset: Number(offset) || 0,
        };

        const films = await QueryFilms.search(filters);
        return res.status(200).send(films);
    } catch (error) {
        console.log('Error on server ', error);

        return res.status(500).json({ error: "Internal Server Error" });
    }
}


// export default async function searchFilms(req: NextApiRequest,
//     res: NextApiResponse<SelectFilm[]>) {
//     const { category, rating, title, offset } = req.query;
//     try {
//         if (category && title && rating) {
//             const categorizedFilm = await QueryFilms.getByCategoryAndNameAndRating(
//                 String(title),
//                 String(category),
//                 String(rating),
//                 Number(offset)
//             );
//             return res.status(200).send(categorizedFilm);
//         }

//         if (category && title && !rating) {
//             const categorizedFilm = await QueryFilms.getByCategoryAndName(
//                 String(title),
//                 String(category),
//                 Number(offset)
//             );
//             return res.status(200).send(categorizedFilm);
//         }

//         if (category && !title && rating) {
//             const filmsByCategory = await QueryFilms.getByCategoryAndRating(
//                 String(category),
//                 String(rating),
//                 Number(offset)
//             );
//             return res.status(200).send(filmsByCategory);
//         }

//         if (category && !title && !rating) {
//             const filmsByCategory = await QueryFilms.getByCategory(
//                 String(category),
//                 Number(offset)
//             );
//             return res.status(200).send(filmsByCategory);
//         }

//         if (!title && !category && rating) {
//             const films = await QueryFilms.getByRating(
//                 String(rating),
//                 Number(offset)
//             );
//             return res.status(200).send(films);

//         }

//         if (title && !category && rating) {
//             const film = await QueryFilms.getByTitleAndRating(
//                 String(title),
//                 String(rating),
//                 Number(offset)
//             );
//             return res.status(200).send(film);
//         }

//         if (title && !category && !rating) {
//             const film = await QueryFilms.getByTitle(
//                 String(title),
//                 Number(offset)
//             );
//             return res.status(200).send(film);
//         }

//         const films = await QueryFilms.getAll(Number(offset));
//         return res.status(200).send(films);
//     } catch (error) {
//         // next(error);
//     }
// }
