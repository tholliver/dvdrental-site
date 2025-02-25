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