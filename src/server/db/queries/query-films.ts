import { db } from "@/server/db";
import { categorySchema, film_category, filmSchema } from "@/server/db/schemas";
import { getTableColumns, ilike, eq, and, SQL, sql } from "drizzle-orm";
import { FilmRating } from "@/server/types";

const countSearchFilms = (filters: SQL[]) => {
    return db
        .select({ count: sql<number>`count(*)` })
        .from(categorySchema)
        .innerJoin(film_category, eq(categorySchema.category_id, film_category.category_id))
        .innerJoin(filmSchema, eq(film_category.film_id, filmSchema.film_id))
        .where(and(...filters)).prepare("count_filtered_films");
};

const searchFilms = (filters: SQL[], limit: number, offset: number) => {
    return db
        .select({ ...getTableColumns(filmSchema) })
        .from(categorySchema)
        .innerJoin(film_category, eq(categorySchema.category_id, film_category.category_id))
        .innerJoin(filmSchema, eq(film_category.film_id, filmSchema.film_id))
        .where(and(...filters)).limit(limit).offset(offset).prepare("filtered_films");
};

export const QueryFilms = {
    Search: async function ({ title, category, rating, page, pageSize }: {
        title?: string;
        category?: string;
        rating?: string;
        page: number;
        pageSize: number
    }) {

        const offset = (page - 1) * pageSize

        const filters: SQL[] = [];
        if (category) {
            filters.push(eq(categorySchema.name, category));
        }
        if (title) {
            filters.push(ilike(filmSchema.title, `%${title}%`));
        }
        if (rating) {
            filters.push(eq(filmSchema.rating, rating as FilmRating));
        }
        const totalCount = await countSearchFilms(filters).execute()
        const films = await searchFilms(filters, pageSize, offset).execute();

        const total = totalCount[0].count
        const totalPages = Math.ceil(total / pageSize)

        return {
            films,
            metadata: {
                total,
                totalPages,
                currentPage: page,
                pageSize
            }
        }

    },
    getAll: async (offset: number) =>
        await db.select().from(filmSchema).limit(10).offset(offset),

    getByTitle: async (title: string, offset: number) =>
        await db
            .select({ ...getTableColumns(filmSchema) })
            .from(filmSchema)
            .where(ilike(filmSchema.title, `%${title}%`))
            .limit(10)
            .offset(offset),

    getByTitleAndRating: async (title: string, rating: string, offset: number) => {
        const validatedRating: FilmRating = rating as FilmRating;
        return await db
            .select({ ...getTableColumns(filmSchema) })
            .from(categorySchema)
            .innerJoin(film_category, eq(categorySchema.category_id, film_category.category_id))
            .innerJoin(filmSchema, eq(film_category.film_id, filmSchema.film_id))
            .where(and(ilike(filmSchema.title, `%${title}%`), eq(filmSchema.rating, validatedRating)))
            .limit(10)
            .offset(offset);
    },

    getByCategoryAndNameAndRating: async (title: string, category: string, rating: string, offset: number) => {
        const validatedRating: FilmRating = rating as FilmRating;
        return await db
            .select({ ...getTableColumns(filmSchema) })
            .from(categorySchema)
            .innerJoin(film_category, eq(categorySchema.category_id, film_category.category_id))
            .innerJoin(filmSchema, eq(film_category.film_id, filmSchema.film_id))
            .where(and(ilike(filmSchema.title, `%${title}%`), eq(filmSchema.rating, validatedRating), eq(categorySchema.name, category)))
            .limit(10)
            .offset(offset);
    },

    getByRating: async (rating: string, offset: number) => {
        const validatedRating: FilmRating = rating as FilmRating;
        return await db
            .select({ ...getTableColumns(filmSchema) })
            .from(filmSchema)
            .where(eq(filmSchema.rating, validatedRating))
            .limit(10)
            .offset(offset);
    },

    getByCategory: async (category: string, offset: number) =>
        await db
            .select({ ...getTableColumns(filmSchema) })
            .from(categorySchema)
            .innerJoin(film_category, eq(categorySchema.category_id, film_category.category_id))
            .innerJoin(filmSchema, eq(film_category.film_id, filmSchema.film_id))
            .where(eq(categorySchema.name, category))
            .limit(10)
            .offset(offset),

    getByCategoryAndRating: async (category: string, rating: string, offset: number) => {
        const validatedRating: FilmRating = rating as FilmRating;
        return await db
            .select({ ...getTableColumns(filmSchema) })
            .from(categorySchema)
            .innerJoin(film_category, eq(categorySchema.category_id, film_category.category_id))
            .innerJoin(filmSchema, eq(film_category.film_id, filmSchema.film_id))
            .where(and(eq(filmSchema.rating, validatedRating), eq(categorySchema.name, category)))
            .limit(10)
            .offset(offset);
    },

    getByCategoryAndName: async (title: string, category: string, offset: number) =>
        await db
            .select({ ...getTableColumns(filmSchema) })
            .from(categorySchema)
            .innerJoin(film_category, eq(categorySchema.category_id, film_category.category_id))
            .innerJoin(filmSchema, eq(film_category.film_id, filmSchema.film_id))
            .where(and(ilike(filmSchema.title, `%${title}%`), eq(categorySchema.name, category)))
            .limit(10)
            .offset(offset),

    getById: async (filmId: number) =>
        await db
            .select()
            .from(filmSchema)
            .where(eq(filmSchema.film_id, filmId)),
};
