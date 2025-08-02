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
        <section id="about" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* About Us Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">About TechSolutions</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            We are a passionate team of developers, designers, and digital strategists 
                            dedicated to helping businesses thrive in the digital age. Since our founding, 
                            we've been committed to delivering innovative solutions that drive real results.
                        </p>
                        <p className="text-lg text-gray-600 mb-8">
                            Our mission is to bridge the gap between technology and business success. 
                            We believe that every business, regardless of size, deserves access to 
                            world-class digital solutions that can transform their operations and growth potential.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">Expert team with proven track record</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">Latest technologies and best practices</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">Dedicated support and maintenance</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Quality First</h4>
                                    <p className="text-gray-600 text-sm">We never compromise on quality and always deliver solutions that exceed expectations.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Transparent Communication</h4>
                                    <p className="text-gray-600 text-sm">Regular updates and clear communication throughout every project phase.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Long-term Partnership</h4>
                                    <p className="text-gray-600 text-sm">We build lasting relationships and provide ongoing support for your success.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                            <div className="text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Team Section */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h3>
                    <p className="text-xl text-gray-600">
                        The talented professionals behind your success
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="text-6xl mb-4">{member.image}</div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                            <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                            <p className="text-gray-600 text-sm">{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}