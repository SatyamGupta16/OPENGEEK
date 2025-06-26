"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";

const upcomingEvents = [
  {
    title: "Tech Hackathon 2024",
    date: "March 15-16, 2024",
    location: "Virtual Event",
    attendees: "500+ Expected",
    description: "48-hour hackathon focused on AI and Web3 technologies. Build innovative solutions and win exciting prizes.",
    registrationLink: "#",
    tags: ["Hackathon", "AI", "Web3"]
  },
  {
    title: "Code Workshop Series",
    date: "Weekly - Every Saturday",
    location: "Hybrid (Online & Delhi NCR)",
    attendees: "100+ per session",
    description: "Learn modern web development, system design, and cloud technologies from industry experts.",
    registrationLink: "#",
    tags: ["Workshop", "Web Dev", "Cloud"]
  },
  {
    title: "Tech Career Fair",
    date: "April 5, 2024",
    location: "Bangalore",
    attendees: "1000+ Expected",
    description: "Connect with top tech companies, attend interviews, and land your dream internship or job.",
    registrationLink: "#",
    tags: ["Career Fair", "Networking"]
  }
];

const pastEvents = [
  {
    title: "Winter Code Camp",
    date: "December 2023",
    location: "Virtual",
    attendees: "750+",
    description: "Intensive coding bootcamp covering full-stack development and cloud deployment.",
    tags: ["Bootcamp", "Full Stack"]
  },
  {
    title: "Design Systems Workshop",
    date: "November 2023",
    location: "Mumbai",
    attendees: "200+",
    description: "Deep dive into creating scalable and maintainable design systems for web applications.",
    tags: ["Design", "UI/UX"]
  }
];

export default function EventsPage() {
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
            Tech Events & Meetups
          </h1>
          <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Join our community events to learn, network, and grow with fellow developers. From hackathons to workshops, we&apos;ve got something for everyone.
          </p>
        </motion.div>
      </section>

      {/* Upcoming Events */}
      <section className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl mb-16 sm:mb-24">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.title}
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
                  <h3 className="text-xl font-semibold text-white mb-3">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-white/70 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-white/70 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-white/70 text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees}
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-4">{event.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {event.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded-full bg-white/5 text-white/70 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button 
                    className="w-full group relative text-sm font-medium bg-gradient-to-r from-white/90 via-white/90 to-white/90 text-black hover:from-white hover:via-white hover:to-white transition-all duration-300 rounded-lg shadow-[0_0_0_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_0_2px_rgba(255,255,255,0.4),0_4px_6px_-1px_rgba(255,255,255,0.1),0_2px_4px_-1px_rgba(255,255,255,0.06)] backdrop-blur-sm"
                  >
                    <span className="flex items-center justify-center">
                      Register Now
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map((event, index) => (
            <motion.div
              key={event.title}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-black/20 p-6 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-colors h-full opacity-80">
                <GridPattern
                  width={12}
                  height={12}
                  x={-1}
                  y={-1}
                  className="absolute inset-0 h-full w-full fill-white/[0.02] stroke-white/[0.02] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
                />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-3">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-white/70 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-white/70 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-white/70 text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees}
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-4">{event.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded-full bg-white/5 text-white/70 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
} 