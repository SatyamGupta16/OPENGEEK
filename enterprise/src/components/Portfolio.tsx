'use client'

import { useState } from 'react'

export default function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('all')

    const projects = [
        {
            id: 1,
            title: "E-commerce Platform",
            category: "web",
            image: "/api/placeholder/400/300",
            description: "Modern e-commerce solution with payment integration and inventory management.",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            link: "#"
        },
        {
            id: 2,
            title: "Restaurant Mobile App",
            category: "mobile",
            image: "/api/placeholder/400/300",
            description: "Food delivery app with real-time tracking and payment processing.",
            technologies: ["React Native", "Firebase", "Google Maps"],
            link: "#"
        },
        {
            id: 3,
            title: "Corporate Website",
            category: "web",
            image: "/api/placeholder/400/300",
            description: "Professional corporate website with CMS and SEO optimization.",
            technologies: ["Next.js", "Tailwind CSS", "Sanity CMS"],
            link: "#"
        },
        {
            id: 4,
            title: "Cloud Migration",
            category: "consulting",
            image: "/api/placeholder/400/300",
            description: "Complete cloud infrastructure migration for manufacturing company.",
            technologies: ["AWS", "Docker", "Kubernetes", "Terraform"],
            link: "#"
        },
        {
            id: 5,
            title: "Fitness Tracking App",
            category: "mobile",
            image: "/api/placeholder/400/300",
            description: "Health and fitness tracking application with social features.",
            technologies: ["Flutter", "Firebase", "HealthKit"],
            link: "#"
        },
        {
            id: 6,
            title: "Digital Marketing Campaign",
            category: "marketing",
            image: "/api/placeholder/400/300",
            description: "Complete digital marketing overhaul resulting in 300% traffic increase.",
            technologies: ["Google Ads", "SEO", "Social Media", "Analytics"],
            link: "#"
        }
    ]

    const filters = [
        { key: 'all', label: 'All Projects' },
        { key: 'web', label: 'Web Development' },
        { key: 'mobile', label: 'Mobile Apps' },
        { key: 'consulting', label: 'IT Consulting' },
        { key: 'marketing', label: 'Digital Marketing' }
    ]

    const filteredProjects = activeFilter === 'all' 
        ? projects 
        : projects.filter(project => project.category === activeFilter)

    return (
        <section id="portfolio" className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 px-4">Our Portfolio</h2>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                        Explore our recent projects and see how we've helped businesses 
                        transform their digital presence and operations.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 md:mb-12 px-4">
                    {filters.map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => setActiveFilter(filter.key)}
                            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-colors text-sm sm:text-base ${
                                activeFilter === filter.key
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700 hover:transform hover:-translate-y-1">
                            <div className="h-40 sm:h-48 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                                <div className="text-4xl sm:text-6xl text-blue-400">🖥️</div>
                            </div>
                            <div className="p-4 sm:p-6">
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-gray-300 mb-4 text-sm sm:text-base">{project.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm rounded-full">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                
                                <a 
                                    href={project.link}
                                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                                >
                                    View Project
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}