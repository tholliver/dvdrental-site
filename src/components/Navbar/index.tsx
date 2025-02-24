import { useState } from 'react'
import Link from 'next/link'
import { YellowDVD, BlackDVD, ViolterDVD } from '../SVG'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signIn, useSession, signUp } from '@/lib/auth-client'

const menuList = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Films', path: '/films' },
  { id: 3, title: 'Stores', path: '/stores' },
  { id: 4, title: 'Contact', path: '/contact' },
  { id: 5, title: 'About', path: '/about' },
]

const userLinkList = [
  { id: 1, title: 'Dashboard', path: '/dashboard' },
  { id: 2, title: 'Films', path: '/films' },
  { id: 3, title: 'Customers', path: '/customers' },
  { id: 4, title: 'Contact', path: '/films' },
]
type NavbarProp = {
  isSignedIn: boolean
  userRole?: string
}

const Navbar = () => {
  const { data: session, isPending, error } = useSession()
  const [navbarIsOpen, setNavbarIsOpen] = useState(false)
  const [userOpts, setUserOpts] = useState(false)

  return (
    <nav className="border-b border-gray-200 dark:border-gray-600 dark:bg-gray-900">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <ViolterDVD size={30} />
          <span className="text-2xl font-extrabold text-white">DVD Rental</span>
        </Link>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6">
          {menuList.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="text-white hover:text-blue-500"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* User Avatar & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {/* User Button */}
          <div className="relative">
            <button
              onClick={() => setUserOpts(!userOpts)}
              className="w-10 h-10 rounded-full border border-gray-400"
            >
              <img
                className="w-full h-full rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="User"
              />
            </button>

            {/* Dropdown */}
            {userOpts && (
              <div className="absolute z-50 right-0 mt-3 w-48 bg-gray-800 text-white rounded-lg shadow-lg">
                <div className="px-4 py-3">
                  <span className="block text-sm">{session?.user.name}</span>
                  <span className="block text-xs text-gray-400">
                    {session?.user.email || 'No user'}
                  </span>
                </div>
                <ul className="py-2">
                  {userLinkList.map((userlink) => (
                    <li key={userlink.id}>
                      <Link
                        href={userlink.path}
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        {userlink.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setNavbarIsOpen(!navbarIsOpen)}
            className="md:hidden p-2 text-gray-400 hover:bg-gray-700 rounded-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {navbarIsOpen && (
        <div className="md:hidden bg-gray-800 text-white p-4">
          {menuList.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="block py-2 px-4 hover:bg-gray-700"
              onClick={() => setNavbarIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
