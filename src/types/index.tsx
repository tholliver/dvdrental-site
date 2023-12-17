export interface CustomerData {
  userInfo: UserInfo
  paymentsSummary: PaymentsSummary
}

export interface PaymentsSummary {
  userName: string
  userLastName: string
  averagePayment: number
  count: number
  totalSpend: number
}

export interface UserInfo {
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
