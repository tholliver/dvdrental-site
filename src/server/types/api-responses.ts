export type CustomerDetailsResponse = {
    // Customer Info
    first_name: string
    last_name: string
    email: string
    active: boolean
    // Stats
    stats: {
        totalPayments: number | null
        rentalCount: number | null
        avgPayment: number | null
        lastPaymentDate: Date | null
        firstRentalDate: Date | null
        mostRecentRental: Date | null
    }
    // Top Films
    topFilms: Array<{
        filmId: number | null;
        title: string | null;
        rentalCount: number;
    }>
    // Favorite Category
    favoriteCategory: {
        categoryName: string | null;
        rentalCount: number;
    }
    // Most Active Month
    mostActiveMonth: {
        month: Date
        rentalCount: number
    }
}

export type CustomerInfoResponse = {
    // Customer Info
    first_name: string
    last_name: string
    email: string
    active: boolean
    // Stats
    stats: {
        totalPayments: number
        rentalCount: number
        avgPayment: number
        lastPaymentDate: Date
        firstRentalDate: Date
        mostRecentRental: Date
    }
    // Top Films
    topFilms: Array<{
        filmId: number;
        title: string;
        rentalCount: number;
    }>
    // Favorite Category
    favoriteCategory: {
        categoryName: string;
        rentalCount: number;
    }
    // Most Active Month
    mostActiveMonth: {
        month: Date
        rentalCount: number
    }
}

export type FilmInfoResponse = {
    flim_id: number;
    title: string;
    description: string;
    release_year: number;
    language_id: number;
    rental_duraton: number;
    rental_rate: string;
    length: number;
    replacement_cost: string;
    rating: string;
    last_update: Date;
    special_features: string[];
    fulltext: string;
    stats: {
        totalRentals: number;
        totalRevenue: string;
        avgRentalRate: string;
        firstRentalDate: Date;
        lastRentalDate: Date;
    };
    topCustomers: {
        customerId: number;
        rentalCount: number;
    }[];
    filmCategories: {
        categoryName: string;
    }[];
    mostActiveMonth: {
        month: string;
        rentalCount: number;
    };
}