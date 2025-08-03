'use client'

export default function Hero() {
    return (
        <section id="home" className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 pb-20 min-h-screen overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                {/* Main Hero Content */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-8">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                        OpenGeek Enterprise - Your Technology Partner
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
                        <span className="block">The IT Services</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                            You Need
                        </span>
                        <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 text-gray-300">
                            FOR YOUR BUSINESS
                        </span>
                    </h1>
                    
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                        Transform your business with cutting-edge web development, mobile applications, 
                        and comprehensive IT solutions that drive growth and innovation.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <a 
                            href="#contact" 
                            className="group bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
                        >
                            <span className="flex items-center justify-center">
                                Start Your Project
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </a>
                        <a 
                            href="#portfolio" 
                            className="group border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <span className="flex items-center justify-center">
                                View Our Work
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    <div className="text-center group">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">100+</div>
                        <div className="text-gray-400 text-sm sm:text-base">Projects Completed</div>
                    </div>
                    <div className="text-center group">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">50+</div>
                        <div className="text-gray-400 text-sm sm:text-base">Happy Clients</div>
                    </div>
                    <div className="text-center group">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">5+</div>
                        <div className="text-gray-400 text-sm sm:text-base">Years Experience</div>
                    </div>
                    <div className="text-center group">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">24/7</div>
                        <div className="text-gray-400 text-sm sm:text-base">Support</div>
                    </div>
                </div>

                {/* Services Preview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/80 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                        <div className="bg-blue-600 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Web Development</h3>
                        <p className="text-gray-400 text-sm">Custom websites and web applications</p>
                    </div>

                    <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/80 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                        <div className="bg-blue-600 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Mobile Apps</h3>
                        <p className="text-gray-400 text-sm">iOS and Android applications</p>
                    </div>

                    <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/80 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                        <div className="bg-blue-600 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">IT Consulting</h3>
                        <p className="text-gray-400 text-sm">Strategic technology solutions</p>
                    </div>

                    <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/80 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                        <div className="bg-blue-600 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Digital Marketing</h3>
                        <p className="text-gray-400 text-sm">SEO, social media, and online presence</p>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="flex justify-center mt-16">
                    <div className="animate-bounce">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}
