'use client'

export default function Services() {
    const services = [
        {
            icon: (
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Web Development",
            description: "Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.",
            features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile-First"]
        },
        {
            icon: (
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            title: "Mobile App Development",
            description: "Native and cross-platform mobile applications for iOS and Android that engage your customers.",
            features: ["iOS & Android", "Cross-Platform", "User-Friendly", "App Store Ready"]
        },
        {
            icon: (
                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "IT Consulting",
            description: "Strategic technology consulting to help your business make informed decisions about digital transformation.",
            features: ["Tech Strategy", "System Integration", "Security Audit", "Performance Optimization"]
        },
        {
            icon: (
                <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
            ),
            title: "Digital Marketing",
            description: "Comprehensive digital marketing services to boost your online presence and drive business growth.",
            features: ["SEO Optimization", "Social Media", "Content Marketing", "Analytics"]
        },
        {
            icon: (
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
            ),
            title: "Cloud Solutions",
            description: "Scalable cloud infrastructure and migration services to modernize your business operations.",
            features: ["Cloud Migration", "AWS/Azure", "Scalable Infrastructure", "24/7 Monitoring"]
        },
        {
            icon: (
                <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "E-commerce Solutions",
            description: "Complete e-commerce platforms with payment integration, inventory management, and analytics.",
            features: ["Online Stores", "Payment Gateway", "Inventory Management", "Order Tracking"]
        }
    ]

    return (
        <section id="services" className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 px-4">Our Services</h2>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                        We provide comprehensive IT solutions tailored to your business needs, 
                        from web development to digital transformation.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300 border border-gray-700 hover:transform hover:-translate-y-1">
                            <div className="mb-6">
                                {service.icon}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">{service.title}</h3>
                            <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">{service.description}</p>
                            <ul className="space-y-2">
                                {service.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center text-xs md:text-sm text-gray-300">
                                        <svg className="w-4 h-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}