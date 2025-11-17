'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Bookshelve
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`hover:text-blue-200 transition-colors ${
                isActive('/') ? 'border-b-2 border-white' : ''
              }`}
            >
              Início
            </Link>
            <Link
              href="/sorteio"
              className={`hover:text-blue-200 transition-colors flex items-center gap-1 ${
                pathname?.startsWith('/sorteio') ? 'border-b-2 border-white' : ''
              }`}
            >
              <span>🎁</span>
              Sorteio
            </Link>
            <Link
              href="/profile"
              className={`hover:text-blue-200 transition-colors ${
                isActive('/profile') ? 'border-b-2 border-white' : ''
              }`}
            >
              Perfil
            </Link>
            <Link
              href="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
