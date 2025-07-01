"use client"

import { Twitter, Linkedin, Github, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const imageVariants: Variants = {
  initial: { filter: "brightness(1) contrast(1)" },
  hover: {
    filter: "brightness(1.1) contrast(1.1)",
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
}

const cardVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
}

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid grid-cols-6 gap-2 opacity-[0.02] pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="col-span-1 h-full border-r border-foreground" />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative space-y-4"
        >
          <div className="relative">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-px bg-gradient-to-r from-transparent via-foreground/50 to-transparent absolute -bottom-4 left-0"
            />
            <h1 className="text-center font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Meet Our{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-500 to-zinc-800 dark:from-zinc-200 dark:to-zinc-500">
                Founders
              </span>
            </h1>
          </div>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16 text-sm sm:text-base">
            Visionaries driving innovation and fostering the next generation of tech talent
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {/* First Founder */}
          <motion.div variants={fadeInUp}>
            <motion.div
              initial="initial"
              whileHover="hover"
              variants={cardVariants}
            >
              <Card className="group transition-all duration-300 border-border/50 bg-card/50 backdrop-blur h-full hover:shadow-2xl hover:shadow-zinc-800/5">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <motion.div 
                      className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shrink-0 ring-2 ring-border/50 mx-auto md:mx-0"
                      variants={imageVariants}
                    >
                      <Image
                        src="/ahqaf.jpg"
                        alt="Mr. Ahqaf Ali"
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                    <div className="space-y-3 flex-1 text-center md:text-left">
                      <div>
                        <h2 className="text-2xl font-bold">Mr. Ahqaf Ali</h2>
                        <p className="text-muted-foreground font-medium text-sm">Founder & CEO | Full Stack Developer</p>
                        <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                          <Badge variant="secondary" className="text-xs">Hackathon Winner</Badge>
                          <Badge variant="outline" className="text-xs">Founder of InvertisPrep</Badge>
                          <Badge variant="outline" className="text-xs">Full Stack Developer</Badge>
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                        Visionary Founder and CEO of InvertisPrep, dedicated to empowering students with quality educational resources. Combines technical expertise with a passion for learning to build tools that simplify academic success.
                      </p>
                      <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="ghost" size="sm" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800" asChild>
                              <Link href="https://www.linkedin.com/in/ahqaf-ali/" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-4 h-4" />
                              </Link>
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="text-xs">
                            Connect on LinkedIn
                          </HoverCardContent>
                        </HoverCard>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="ghost" size="sm" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800" asChild>
                              <Link href="https://github.com/AhqafCoder" target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4" />
                              </Link>
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="text-xs">
                            View GitHub Profile
                          </HoverCardContent>
                        </HoverCard>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="ghost" size="sm" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800" asChild>
                              <Link href="tel:+917084089921">
                                <Phone className="w-4 h-4" />
                              </Link>
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="text-xs">
                            Call: +91 7084089921
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Second Founder */}
          <motion.div variants={fadeInUp}>
            <motion.div
              initial="initial"
              whileHover="hover"
              variants={cardVariants}
            >
              <Card className="group transition-all duration-300 border-border/50 bg-card/50 backdrop-blur h-full hover:shadow-2xl hover:shadow-zinc-800/5">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <motion.div 
                      className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shrink-0 ring-2 ring-border/50 mx-auto md:mx-0"
                      variants={imageVariants}
                    >
                      <Image
                        src="/vivek.jpg"
                        alt="Mr. Vivek Vishwakarma"
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                    <div className="space-y-3 flex-1 text-center md:text-left">
                      <div>
                        <h2 className="text-2xl font-bold">Mr. Vivek Vishwakarma</h2>
                        <p className="text-muted-foreground font-medium text-sm">Founder & CEO | Cyber Security Head</p>
                        <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                          <Badge variant="secondary" className="text-xs">Co-Founder</Badge>
                          <Badge variant="outline" className="text-xs">Hackathon Winner</Badge>
                          <Badge variant="outline" className="text-xs">AI/ML & Cyber Security</Badge>
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                        Expert in cyber security and software testing, ensuring platform integrity and reliability. Actively expanding expertise in AI/ML to drive innovative educational technology solutions.
                      </p>
                      <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="ghost" size="sm" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800" asChild>
                              <Link href="https://www.linkedin.com/in/vivek-vishwakarma-953697321/" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-4 h-4" />
                              </Link>
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="text-xs">
                            Connect on LinkedIn
                          </HoverCardContent>
                        </HoverCard>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="ghost" size="sm" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800" asChild>
                              <Link href="https://github.com/vivek12coder" target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4" />
                              </Link>
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="text-xs">
                            View GitHub Profile
                          </HoverCardContent>
                        </HoverCard>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="ghost" size="sm" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800" asChild>
                              <Link href="tel:+919792130770">
                                <Phone className="w-4 h-4" />
                              </Link>
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="text-xs">
                            Call: +91 9792130770
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      
    </div>
  )
}