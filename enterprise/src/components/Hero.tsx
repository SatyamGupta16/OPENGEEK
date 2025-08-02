'use client'

export default function Hero() {
    return (
        <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-16 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Transform Your Business with 
                            <span className="text-blue-600 block">Digital Solutions</span>
                        </h1>
                        
                        <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                            We create stunning websites and provide comprehensive IT services that help businesses grow, 
                            streamline operations, and stay ahead of the competition.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a 
                                href="#contact" 
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                            >
                                Start Your Project
                            </a>
                            <a 
                                href="#portfolio" 
                                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                            >
                                View Our Work
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-3 gap-8 text-center lg:text-left">
                            <div>
                                <div className="text-3xl font-bold text-blue-600">100+</div>
                                <div className="text-gray-600">Projects Completed</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-600">50+</div>
                                <div className="text-gray-600">Happy Clients</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-600">24/7</div>
                                <div className="text-gray-600">Support</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Services Preview */}
                    <div className="relative">
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Web Development</h4>
                                        <p className="text-gray-600 text-sm">Custom websites and web applications</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Mobile Apps</h4>
                                        <p className="text-gray-600 text-sm">iOS and Android applications</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">IT Consulting</h4>
                                        <p className="text-gray-600 text-sm">Strategic technology solutions</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-orange-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Digital Marketing</h4>
                                        <p className="text-gray-600 text-sm">SEO, social media, and online presence</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating elements for visual appeal */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-200 rounded-full opacity-50"></div>
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-indigo-200 rounded-full opacity-50"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
