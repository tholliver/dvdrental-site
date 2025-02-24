import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { getNavLinks } from '@/lib/auth-client'
import UserMenu from './user-menu'
import { useSession } from '@/lib/auth-client'
import { ViolterDVD } from '../SVG'

export default function BetterNav() {
  const { data: session } = useSession()
  const links = getNavLinks(session?.user.role || 'guest')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className=" flex justify-center bg-gray-800 shadow">
      <nav className="container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <ViolterDVD size={30} />
                <span className="text-2xl font-extrabold text-white">
                  DVD Rental
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-200 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
              {session?.user ? (
                <UserMenu user={session.user} />
              ) : (
                <Link
                  href="/#signin-section"
                  className="text-gray-200 hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log in
                </Link>
              )}
            </div>

            {/* Mobile Menu & User Button */}
            <div className="md:hidden flex items-center gap-4">
              {session?.user && <UserMenu user={session.user} />}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-200 hover:text-white focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-900 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setIsOpen(!isOpen)
                }}
                className="block text-gray-200 hover:text-blue-500 py-2"
              >
                {link.label}
              </Link>
            ))}
            {!session?.user && (
              <Link
                href="/#signin-section"
                className="block text-gray-200 hover:text-blue-500 py-2"
              >
                Log in
              </Link>
            )}
          </div>
        )}
      </nav>
    </div>
  )
}
