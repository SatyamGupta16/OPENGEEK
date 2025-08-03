'use client'

import { useState } from 'react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="bg-gray-900 shadow-lg fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-xl sm:text-2xl font-bold text-blue-400">
                            <span className="hidden sm:inline">OpenGeek Enterprise</span>
                            <span className="sm:hidden">OpenGeek</span>
                        </h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4 lg:space-x-8">
                            <a href="#home" className="text-gray-300 hover:text-blue-400 px-2 lg:px-3 py-2 text-sm font-medium transition-colors">
                                Home
                            </a>
                            <a href="#services" className="text-gray-300 hover:text-blue-400 px-2 lg:px-3 py-2 text-sm font-medium transition-colors">
                                Services
                            </a>
                            <a href="#portfolio" className="text-gray-300 hover:text-blue-400 px-2 lg:px-3 py-2 text-sm font-medium transition-colors">
                                Portfolio
                            </a>
                            <a href="#about" className="text-gray-300 hover:text-blue-400 px-2 lg:px-3 py-2 text-sm font-medium transition-colors">
                                About
                            </a>
                            <a href="#contact" className="bg-blue-600 text-white px-3 lg:px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition-colors">
                                Get Quote
                            </a>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-300 hover:text-blue-400 focus:outline-none focus:text-blue-400"
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
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-700">
                            <a href="#home" className="text-gray-300 hover:text-blue-400 hover:bg-gray-800 block px-3 py-3 text-base font-medium rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </a>
                            <a href="#services" className="text-gray-300 hover:text-blue-400 hover:bg-gray-800 block px-3 py-3 text-base font-medium rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Services
                            </a>
                            <a href="#portfolio" className="text-gray-300 hover:text-blue-400 hover:bg-gray-800 block px-3 py-3 text-base font-medium rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Portfolio
                            </a>
                            <a href="#about" className="text-gray-300 hover:text-blue-400 hover:bg-gray-800 block px-3 py-3 text-base font-medium rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                                About
                            </a>
                            <a href="#contact" className="bg-blue-600 text-white block px-3 py-3 rounded-md text-base font-medium hover:bg-blue-500 mx-3 mt-4 text-center transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Get Quote
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
