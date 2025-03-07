import { useState } from 'react'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import type { AuthUserSession } from '@/lib/auth-client'
import { signOut } from '@/lib/auth-client'

interface UserMenuProps {
  user: AuthUserSession
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="z-10 relative">
      <button
        onClick={toggleMenu}
        className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full bg-gray-200 p-1"
          src={user.image || '/mr_placeholder.webp'}
          alt=""
        />
        {/* <User className="h-8 w-8 rounded-full bg-gray-200 p-1" /> */}
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="px-4 py-2 text-sm text-gray-200">
            <p>Signed in as</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-200 bg-blue-900"
          >
            Your Profile
          </Link>
          <button
            onClick={() => {
              // Implement logout logic here
              signOut()
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-cyan-500"
          >
            <span className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
