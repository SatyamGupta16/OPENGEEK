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
        <section id="portfolio" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our recent projects and see how we've helped businesses 
                        transform their digital presence and operations.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => setActiveFilter(filter.key)}
                            className={`px-6 py-3 rounded-full font-medium transition-colors ${
                                activeFilter === filter.key
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                                <div className="text-6xl text-blue-300">🖥️</div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                
                                <a 
                                    href={project.link}
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
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