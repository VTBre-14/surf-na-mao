'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold text-blue-900">
            Surf na Mão
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/boards" className="text-blue-600 hover:text-blue-800">
              Pranchas
            </Link>
            <Link href="/schools" className="text-blue-600 hover:text-blue-800">
              Escolas/Instrutores
            </Link>
            <Link href="/account" className="text-blue-600 hover:text-blue-800">
              Minha Conta
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-4">
            <Link
              href="/boards"
              className="block text-blue-600 hover:text-blue-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Pranchas
            </Link>
            <Link
              href="/schools"
              className="block text-blue-600 hover:text-blue-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Escolas/Instrutores
            </Link>
            <Link
              href="/account"
              className="block text-blue-600 hover:text-blue-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Minha Conta
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
} 