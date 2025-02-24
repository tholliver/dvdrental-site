import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

const categories = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Family']

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog" className="hover:text-indigo-400">
                  Browse Catalog
                </Link>
              </li>
              <li>
                <Link href="/new-releases" className="hover:text-indigo-400">
                  New Releases
                </Link>
              </li>
              <li>
                <Link href="/my-rentals" className="hover:text-indigo-400">
                  My Rentals
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-indigo-400">
                  My Account
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/category/${category.toLowerCase()}`}
                    className="hover:text-indigo-400"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a
                  href="mailto:info@dvdrentals.com"
                  className="hover:text-indigo-400"
                >
                  info@dvdrentals.com
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Movie St, Cinemaville, CV 12345</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">About DVD Rentals</h2>
            <p className="text-sm">
              DVD Rentals is your one-stop shop for all your movie needs. With a
              vast catalog of films across multiple categories, stores in
              various cities, and a dedicated staff, we are here to bring the
              cinema experience to your home.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} DVD Rentals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
