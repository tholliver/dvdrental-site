export interface CustomerData {
  userInfo: CustomerInfo
  paymentsSummary: PaymentsSummary
}

export interface PaymentsSummary {
  userName: string
  userLastName: string
  averagePayment: number
  count: number
  totalSpend: number
}

export interface CustomerInfo {
  customer_id: number
  store_id: number
  first_name: string
  last_name: string
  email: string
  address_id: number
  activebool: boolean
  create_date: string
  last_update: string
  active: number
  address: Address
}

interface City {
  city_id: number
  city: string
  country_id: number
  last_update: string
}

export interface Address {
  address_id: number
  address: string
  address2: string
  district: string
  city_id: number
  postal_code: string
  telefono: string
  last_update: Date
  city: City
}

// rental
export interface RentalInfo {
  filmName: string
  rentalDate: string
  returnDate: string
  amountPaid: string
  customerId: number
}



export interface FilmInfo {
  filmName: string
  film_id: number
  amountMade: number
  rentedTimes: number
  // film_id: number;
  // titulo: string;
  // descripcion?: string;
  // lanzamiento?: number;
  // language_id: number;
  // duracion_de_renta: number;
  // rental_rate: number;
  // duracion?: number;
  // costo_de_reemplazo: number;
  rating?: string; // Assuming mpaa_rating is a string type
  // last_update: string; // Assuming last_update is a string representation of a timestamp
  // special_features?: string[];
  // fulltext: string;
}

export interface IStats {
  rents: string
  totalMade: string
  units: string
  films: string
  customers: string
}

export interface IGraphStats {
  date: string
  count: string
}

export interface IFilm {
  film_id: number;
  title: string;
  description: string;
  release_year: number;
  language_id: number;
  rental_duration: number;
  rental_rate: number;
  length: number;
  replacement_cost: number;
  rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17'; // Assuming the possible values for mpaa_rating
  last_update: string;
  special_features: string[];
  fulltext: string;
}

export interface ICategory {
  category_id: string,
  name: string,
  updated_at: Date
}

export enum FilmRating {
  G = 'G',
  PG = 'PG',
  PG_13 = 'PG-13',
  R = 'R',
  NC_17 = 'NC-17'
}

export const ratings: { value: FilmRating; name: string }[] = [
  { value: FilmRating.NC_17, name: 'NC-17' },
  { value: FilmRating.G, name: 'G' },
  { value: FilmRating.PG_13, name: 'PG-13' },
  { value: FilmRating.PG, name: 'PG' },
  { value: FilmRating.R, name: 'R' }
];


export interface TimeLapseSelect {
  time: string
  value: number
  label: string
}
// Specify a d: Day| m: Month | y: Year
export const timeOptions: TimeLapseSelect[] = [
  { time: '', value: 1, label: 'All time' },
  { time: 'd', value: 1, label: 'Last day' },
  { time: 'd', value: 7, label: 'Last 7 days' },
  { time: 'd', value: 30, label: 'Last 30 days' },
  { time: 'm', value: 1, label: 'Last month' },
  { time: 'y', value: 1, label: 'Last year' }
];