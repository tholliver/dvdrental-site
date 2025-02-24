export enum eGroupBy {
    Day = 'day',
    Month = 'month',
    Year = 'year',
}

export type GroupByType = {
    day: { spec: string; format: string };
    month: { spec: string; format: string };
    year: { spec: string; format: string };
};


export enum FilmRating {
    G = 'G',
    PG = 'PG',
    'PG-13' = 'PG-13',
    R = 'R',
    'NC-17' = 'NC-17'
}


// For API

export type Payment = {
    date: string;
    amount: number;
};

export type Rental = {
    date: string;
    rents: number;
};

export type TopRentFilm = {
    film_id: number;
    filmName: string;
    amountMade: number;
    rating: "G" | "PG" | "PG-13" | "R" | "NC-17";
    rentedTimes: number;
}

export type ResponseData = {
    payments: Payment[];
};

export type RentalResponseData = {
    rentals: Rental[];
};

export type TopRentalResponse = {
    topRentedFilms: TopRentFilm[]
}  
