'use client'

import { useState } from 'react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-blue-600">TechSolutions</h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a href="#home" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                Home
                            </a>
                            <a href="#services" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                Services
                            </a>
                            <a href="#portfolio" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                Portfolio
                            </a>
                            <a href="#about" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                About
                            </a>
                            <a href="#contact" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                                Get Quote
                            </a>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-900 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                            <a href="#home" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                Home
                            </a>
                            <a href="#services" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                Services
                            </a>
                            <a href="#portfolio" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                Portfolio
                            </a>
                            <a href="#about" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                About
                            </a>
                            <a href="#contact" className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 mx-3 mt-2">
                                Get Quote
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
