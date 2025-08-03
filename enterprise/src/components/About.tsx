'use client'

export default function About() {
    const teamMembers = [
        {
            name: "Alex Johnson",
            role: "CEO & Lead Developer",
            image: "👨‍💻",
            description: "10+ years in web development and business strategy."
        },
        {
            name: "Sarah Chen",
            role: "UI/UX Designer",
            image: "👩‍🎨",
            description: "Expert in creating beautiful and functional user experiences."
        },
        {
            name: "Mike Rodriguez",
            role: "Mobile App Developer",
            image: "👨‍💼",
            description: "Specialized in iOS and Android app development."
        },
        {
            name: "Emily Davis",
            role: "Digital Marketing Specialist",
            image: "👩‍💼",
            description: "Drives growth through strategic digital marketing campaigns."
        }
    ]

    const stats = [
        { number: "100+", label: "Projects Completed" },
        { number: "50+", label: "Happy Clients" },
        { number: "5+", label: "Years Experience" },
        { number: "24/7", label: "Support Available" }
    ]

    return (
        <section id="about" className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* About Us Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20">
                    <div className="px-4">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">About OpenGeek Enterprise</h2>
                        <p className="text-base sm:text-lg text-gray-300 mb-4 lg:mb-6">
                            We are OpenGeek Enterprise - a passionate team of developers, designers, and digital strategists 
                            dedicated to providing the IT services you need for your business. Since our founding, 
                            we've been committed to delivering innovative solutions that drive real results.
                        </p>
                        <p className="text-base sm:text-lg text-gray-300 mb-6 lg:mb-8">
                            Our mission is simple: to be your trusted technology partner. We provide the IT services you need 
                            for your business to thrive in today's digital landscape. Every solution we create is designed 
                            to transform your operations and unlock your growth potential.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-300">Expert team with proven track record</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-300">Latest technologies and best practices</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-300">Dedicated support and maintenance</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gray-900 rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-700">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 lg:mb-6">Why Choose Us?</h3>
                            <div className="space-y-4 lg:space-y-6">
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Quality First</h4>
                                    <p className="text-gray-300 text-sm sm:text-base">We never compromise on quality and always deliver solutions that exceed expectations.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Transparent Communication</h4>
                                    <p className="text-gray-300 text-sm sm:text-base">Regular updates and clear communication throughout every project phase.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Long-term Partnership</h4>
                                    <p className="text-gray-300 text-sm sm:text-base">We build lasting relationships and provide ongoing support for your success.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 lg:mb-20 px-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">{stat.number}</div>
                            <div className="text-gray-300 text-sm sm:text-base">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Team Section */}
                <div className="text-center mb-8 lg:mb-12 px-4">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Meet Our Team</h3>
                    <p className="text-lg sm:text-xl text-gray-300">
                        The talented professionals behind your success
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-700 hover:transform hover:-translate-y-1">
                            <div className="text-4xl sm:text-6xl mb-4">{member.image}</div>
                            <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{member.name}</h4>
                            <p className="text-blue-400 font-medium mb-3 text-sm sm:text-base">{member.role}</p>
                            <p className="text-gray-300 text-xs sm:text-sm">{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}