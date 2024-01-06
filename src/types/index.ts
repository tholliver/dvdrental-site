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
  nombre: string
  apellido: string
  email: string
  address_id: number
  activebool: boolean
  create_date: Date
  last_update: Date
  activo: number
  address: Address
}

export interface Address {
  address_id: number
  nombre: string
  direccion2: string
  distrito: string
  city_id: number
  postal_code: string
  telefono: string
  last_update: Date
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