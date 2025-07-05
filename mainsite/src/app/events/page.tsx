"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Users, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const upcomingEvents = [
  {
    title: "OpenGeek Platform Launch Workshop",
    date: "April 20, 2024",
    location: "Hybrid (Online & Delhi NCR)",
    attendees: "200+ Expected",
    description: "Join us for the official launch of the OpenGeek platform! Learn how to leverage our platform for collaborative learning, project development, and career growth. Live demos, hands-on sessions, and networking opportunities included.",
    registrationLink: "/events/launch-workshop",
    tags: ["Launch", "Workshop", "Platform"]
  },
  {
    title: "Web Development 2024: The Future Stack",
    date: "May 1, 2024",
    location: "Virtual Event",
    attendees: "300+ Expected",
    description: "Discover the latest in web development! We'll explore Next.js 14, React Server Components, Tailwind CSS v4, TypeScript best practices, and emerging technologies shaping the future of web development.",
    registrationLink: "/events/future-stack",
    tags: ["Web Dev", "Next.js", "Innovation"]
  },
  {
    title: "Tech Career Fair",
    date: "May 15, 2024",
    location: "Bangalore",
    attendees: "1000+ Expected",
    description: "Connect with top tech companies, attend interviews, and land your dream internship or job. Network with industry leaders and explore career opportunities.",
    registrationLink: "/events/career-fair",
    tags: ["Career Fair", "Networking"]
  },
  {
    title: "Coming Soon",
    date: "To be announced",
    location: "To be determined",
    attendees: "Limited spots",
    description: "Something exciting is brewing! Stay tuned for our next big event. Subscribe to notifications to be the first to know when we announce the details.",
    registrationLink: "#notify",
    tags: ["Upcoming", "Special"]
  }
];

const pastEvents = [
  {
    title: "Techathon 2024",
    date: "September 15-17, 2024",
    location: "Virtual & Delhi NCR",
    attendees: "750+",
    description: "A 48-hour hackathon that brought together developers, designers, and innovators to build solutions for real-world challenges. Featured AI/ML, Web3, and Cloud tracks with prizes worth ₹5L+.",
    tags: ["Hackathon", "Innovation", "Tech"]
  },
  {
    title: "Invertithon 2023",
    date: "May 20-22, 2023",
    location: "Hybrid (Online & Mumbai)",
    attendees: "500+",
    description: "Our flagship hackathon focused on inverting traditional problem-solving approaches. Teams worked on reverse engineering challenges and built innovative solutions with a twist.",
    tags: ["Hackathon", "Innovation"]
  }
];

export default function EventsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div className="min-h-screen bg-black">
      {/* Dynamic Background */}
      <div className="fixed inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3B3B3B,transparent)]" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))",
            y
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl pt-24 pb-12">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Tech Events & Meetups
            </h1>
            <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
              Join our community events to learn, network, and grow with fellow developers.
            </p>
          </motion.div>
        </section>

        {/* Events Container */}
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-[1600px] space-y-16 pb-16">
          {/* Upcoming Events */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl font-semibold text-white">Upcoming Events</h2>
              <Separator className="flex-1 bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <Card className={cn(
                    "relative border-white/[0.05] hover:border-white/[0.1] transition-all duration-300 group-hover:-translate-y-1 overflow-hidden",
                    event.title === "Coming Soon" ? "bg-white/[0.01] backdrop-blur-md" : "bg-white/[0.02]"
                  )}>
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-b",
                      event.title === "Coming Soon" 
                        ? "from-white/[0.01] via-white/[0.02] to-transparent" 
                        : "from-white/[0.02] to-transparent"
                    )} />
                    <CardHeader className="relative pb-3">
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className={cn(
                          "text-base font-medium leading-tight",
                          event.title === "Coming Soon" ? "text-white/70" : "text-white/90"
                        )}>
                          {event.title}
                        </CardTitle>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "border-white/10",
                            event.title === "Coming Soon" 
                              ? "bg-white/[0.02] text-white/50" 
                              : "bg-white/5 text-white/70"
                          )}
                        >
                          {event.tags[0]}
                        </Badge>
                      </div>
                      <CardDescription className={cn(
                        "text-xs mt-1.5",
                        event.title === "Coming Soon" ? "text-white/40" : "text-white/50"
                      )}>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1.5 shrink-0" />
                            {event.date}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1.5 shrink-0" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1.5 shrink-0" />
                            {event.attendees}
                          </div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className={cn(
                        "text-xs line-clamp-2",
                        event.title === "Coming Soon" ? "text-white/40" : "text-white/60"
                      )}>
                        {event.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className={cn(
                          "w-full group/btn relative text-xs font-medium border-0",
                          event.title === "Coming Soon"
                            ? "bg-white/[0.02] hover:bg-white/[0.05] text-white/60 hover:text-white/80"
                            : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white"
                        )}
                        variant="outline"
                      >
                        <span className="flex items-center justify-center gap-1.5">
                          {event.title === "Coming Soon" ? "Get Notified" : "Register Now"}
                          <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
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
              <h2 className="text-xl font-semibold text-white">Past Events</h2>
              <Separator className="flex-1 bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <Card className="relative bg-white/[0.01] border-white/[0.03] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent" />
                    <CardHeader className="relative pb-3">
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-base font-medium text-white/80 leading-tight">
                          {event.title}
                        </CardTitle>
                        <Badge variant="outline" className="bg-white/[0.02] text-white/50 border-white/5">
                          {event.tags[0]}
                        </Badge>
                      </div>
                      <CardDescription className="text-white/40 text-xs mt-1.5">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1.5 shrink-0" />
                            {event.date}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1.5 shrink-0" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1.5 shrink-0" />
                            {event.attendees}
                          </div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/40 text-xs line-clamp-2">
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
    </div>
  );
} 