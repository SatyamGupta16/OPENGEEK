"use client";

import { motion } from "framer-motion";
import { Calendar, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Squares from "@/components/ui/Squares";

const upcomingEvents = [
  {
    title: "OpenGeek Platform Launch",
    date: "July 9, 2025",
    attendees: "All are welcome",
    description: "Join us for the launch of OpenGeek platform! Learn about our learning paths, projects, and how to make the most of our community.",
    registrationLink: "/events/launch",
    tags: ["Community"]
  },
  {
    title: "Web Dev Fundamentals",
    date: "July 11, 2025",
    attendees: "Beginner and Intermediate groups.",
    description: "Master the basics of modern web development with hands-on coding sessions and live mentorship.",
    registrationLink: "/events/webdev",
    tags: ["Workshop"]
  },
  {
    title: "Code Review Session",
    date: "July 13, 2025",
    attendees: "All are welcome",
    description: "Get your code reviewed by experienced developers and learn best practices in a collaborative environment.",
    registrationLink: "/events/code-review",
    tags: ["Mentorship"]
  },
  {
    title: "Coming Soon",
    date: "To be announced",
    attendees: "Limited spots",
    description: "More workshops coming soon! Join our waitlist to get notified about upcoming events.",
    registrationLink: "#notify",
    tags: ["Upcoming"]
  }
];

const pastEvents = [
  {
    title: "Inverthon 2025",
    date: "March 15, 2024",
    attendees: "45 Attended",
    description: "Introduction to version control with Git and collaboration using GitHub. Covered basic commands and workflow.",
    tags: ["Workshop"]
  },
  {
    title: "Portfolio Building",
    date: "March 1, 2024",
    attendees: "38 Attended",
    description: "Learn how to build and present your developer portfolio. Covered project selection and documentation.",
    tags: ["Workshop"]
  }
];

export default function EventsPage() {
  return (
    <div className="w-full">
      {/* Background */}
      <div className="fixed inset-0 bg-black -z-10">
        <div className="absolute inset-0 opacity-20">
          <Squares 
            speed={0.5} 
            squareSize={40}
            direction='diagonal'
            borderColor='#fff'
            hoverFillColor='#222'
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto pt-28 pb-16">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            Tech Events & Meetups
          </h1>
          <p className="text-white/60 text-lg  mx-auto">
            Join our online workshops and events to learn and grow with fellow developers.
          </p>
        </motion.div>
      </section>

      {/* Events Sections */}
      <div className="container mx-auto space-y-16 pb-24">
        {/* Upcoming Events */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-semibold text-white">Upcoming Events</h2>
            <Separator className="flex-1 bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className={cn(
                  "bg-neutral-900 border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1",
                  "flex flex-col"
                )}>
                  <CardHeader className="space-y-3">
                    <Badge 
                      variant="outline" 
                      className="w-fit bg-white/5 text-white border-white/10"
                    >
                      {event.tags[0]}
                    </Badge>
                    <CardTitle className="text-base font-medium text-white line-clamp-1">
                      {event.title}
                    </CardTitle>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center text-xs text-white/60">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-xs text-white/60">
                        <Users className="w-3.5 h-3.5 mr-1.5" />
                        {event.attendees}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-xs text-white/70 line-clamp-2">
                      {event.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={cn(
                        "w-full h-9 rounded-md text-xs font-medium",
                        event.title === "Coming Soon"
                          ? "bg-white/5 hover:bg-white/10 text-white/70"
                          : "bg-white hover:bg-white/90 text-black hover:text-black"
                      )}
                      variant={event.title === "Coming Soon" ? "ghost" : "default"}
                    >
                      <span className="flex items-center gap-1.5">
                        {event.title === "Coming Soon" ? "Get Notified" : "Register Now"}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Past Events */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-semibold text-white">Past Events</h2>
            <Separator className="flex-1 bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="bg-neutral-900/80 border-white/5 flex flex-col">
                  <CardHeader className="space-y-3">
                    <Badge variant="outline" className="w-fit bg-white/5 text-white/70 border-white/5">
                      {event.tags[0]}
                    </Badge>
                    <CardTitle className="text-base font-medium text-white/80 line-clamp-1">
                      {event.title}
                    </CardTitle>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center text-xs text-white/50">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-xs text-white/50">
                        <Users className="w-3.5 h-3.5 mr-1.5" />
                        {event.attendees}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-xs text-white/50 line-clamp-2">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 