"use client";

import { motion } from "framer-motion";
import { Building, Clock, DollarSign, Briefcase, ExternalLink, BookOpen, Code2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";

const internships = [
  {
    title: "Frontend Developer Intern",
    company: "TechCorp Solutions",
    duration: "3-6 months",
    stipend: "₹20,000-30,000/month",
    location: "Remote",
    type: "Part-time",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    description: "Join our team to build modern web applications using cutting-edge technologies. Work on real client projects and learn from experienced developers.",
    applyLink: "#"
  },
  {
    title: "Full Stack Developer Intern",
    company: "InnovateX",
    duration: "6 months",
    stipend: "₹25,000-40,000/month",
    location: "Hybrid (Bangalore)",
    type: "Full-time",
    skills: ["Node.js", "React", "MongoDB", "AWS"],
    description: "Work on our flagship product, gain experience with modern tech stack, and learn about scalable architecture design.",
    applyLink: "#"
  },
  {
    title: "UI/UX Design Intern",
    company: "DesignHub",
    duration: "3 months",
    stipend: "₹15,000-25,000/month",
    location: "Remote",
    type: "Part-time",
    skills: ["Figma", "Adobe XD", "UI Design", "User Research"],
    description: "Create beautiful and intuitive user interfaces for web and mobile applications. Work closely with our design team on real projects.",
    applyLink: "#"
  }
];

const categories = [
  {
    title: "Development",
    icon: Code2,
    count: 45
  },
  {
    title: "Design",
    icon: BookOpen,
    count: 23
  },
  {
    title: "Business",
    icon: Briefcase,
    count: 18
  }
];

export default function InternshipsPage() {
  return (
    <main className="min-h-screen bg-black antialiased pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl mb-16 sm:mb-24">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white mb-6">
            Find Your Perfect Internship
          </h1>
          <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8">
            Kickstart your career with exciting internship opportunities at innovative companies. Learn, grow, and build your portfolio while earning.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input 
                type="text"
                placeholder="Search internships by skill, company, or location..."
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-colors"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-xl bg-black/20 p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                      <p className="text-sm text-white/70">{category.count} openings</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Internship Listings */}
      <section className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8">Featured Internships</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {internships.map((internship, index) => (
            <motion.div
              key={internship.title}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-black/20 p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors h-full">
                <GridPattern
                  width={12}
                  height={12}
                  x={-1}
                  y={-1}
                  className="absolute inset-0 h-full w-full fill-white/[0.02] stroke-white/[0.02] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
                />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{internship.title}</h3>
                      <p className="text-white/70 text-sm">{internship.company}</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs">
                      {internship.type}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-white/70 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {internship.duration}
                    </div>
                    <div className="flex items-center text-white/70 text-sm">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {internship.stipend}
                    </div>
                    <div className="flex items-center text-white/70 text-sm">
                      <Building className="w-4 h-4 mr-2" />
                      {internship.location}
                    </div>
                    <div className="flex items-center text-white/70 text-sm">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {internship.type}
                    </div>
                  </div>

                  <p className="text-white/70 text-sm mb-4">{internship.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {internship.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 rounded-full bg-white/5 text-white/70 text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <Button 
                    className="w-full group relative text-sm font-medium bg-gradient-to-r from-white/90 via-white/90 to-white/90 text-black hover:from-white hover:via-white hover:to-white transition-all duration-300 rounded-lg shadow-[0_0_0_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_0_2px_rgba(255,255,255,0.4),0_4px_6px_-1px_rgba(255,255,255,0.1),0_2px_4px_-1px_rgba(255,255,255,0.06)] backdrop-blur-sm"
                  >
                    <span className="flex items-center justify-center">
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
} 