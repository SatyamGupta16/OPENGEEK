'use client'

export default function Testimonials() {
    const testimonials = [
        {
            name: "John Smith",
            company: "Smith Manufacturing",
            role: "CEO",
            content: "TechSolutions transformed our outdated website into a modern, efficient platform that increased our leads by 200%. Their team was professional and delivered exactly what we needed.",
            rating: 5
        },
        {
            name: "Maria Garcia",
            company: "Local Restaurant Chain",
            role: "Owner",
            content: "The mobile app they developed for our restaurant has been a game-changer. Online orders increased by 150% and our customers love the user-friendly interface.",
            rating: 5
        },
        {
            name: "David Wilson",
            company: "Wilson Consulting",
            role: "Managing Partner",
            content: "Their IT consulting services helped us streamline our operations and reduce costs by 30%. The cloud migration was seamless and their ongoing support is excellent.",
            rating: 5
        },
        {
            name: "Lisa Chen",
            company: "Fashion Boutique",
            role: "Founder",
            content: "The e-commerce platform they built for us is beautiful and functional. Sales have tripled since launch, and the admin panel makes managing inventory so easy.",
            rating: 5
        },
        {
            name: "Robert Johnson",
            company: "Tech Startup",
            role: "CTO",
            content: "Working with TechSolutions was a pleasure. They understood our vision and delivered a product that exceeded our expectations. Highly recommended!",
            rating: 5
        },
        {
            name: "Amanda Brown",
            company: "Healthcare Clinic",
            role: "Practice Manager",
            content: "Their digital marketing services helped us reach more patients in our community. Our online presence has never been stronger, and appointment bookings have increased significantly.",
            rating: 5
        }
    ]

    return (
        <section className="py-20 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Don't just take our word for it. Here's what our satisfied clients 
                        have to say about working with TechSolutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                            {/* Stars */}
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>

                            {/* Author */}
                            <div className="border-t pt-4">
                                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                <div className="text-blue-600 text-sm">{testimonial.role}</div>
                                <div className="text-gray-500 text-sm">{testimonial.company}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join Our Success Stories?</h3>
                        <p className="text-xl text-gray-600 mb-8">
                            Let's discuss how we can help transform your business with our proven solutions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a 
                                href="#contact" 
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
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
                    </div>
                </div>
            </div>
        </section>
    )
}