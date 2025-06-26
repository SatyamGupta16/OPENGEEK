"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Code2, Target, ExternalLink, X, ChevronRight } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image, { StaticImageData } from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type CarouselItemType = {
  type: "image" | "achievement";
  title: string;
  description: string;
  image?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  longDescription?: string;
};

const carouselItems: CarouselItemType[] = [
  {
    type: "image",
    title: "Hackathon Victory I",
    subtitle: "Smart India Hackathon 2023",
    image: "/ab.png",
    description: "Won first place in Smart India Hackathon 2023",
    longDescription: "Led a team of 6 developers to create an innovative solution for Smart India Hackathon 2023. Our project focused on solving real-world problems using cutting-edge technology, resulting in first place recognition among 500+ teams."
  },
  {
    type: "image",
    title: "Hackathon Victory II",
    subtitle: "Code For Good 2024",
    image: "/aa.png",
    description: "First place in Code For Good Hackathon",
    longDescription: "Developed a high-impact solution during Code For Good 2024, addressing critical social challenges. Our team's innovative approach and technical excellence earned us the top position, competing against teams from across the country."
  },
  {
    type: "achievement",
    icon: <Trophy className="h-6 w-6 text-blue-400" />,
    title: "20+ Projects",
    description: "Successfully completed and deployed various web applications and systems",
    longDescription: "Delivered over 20 successful projects ranging from e-commerce platforms to complex enterprise solutions. Each project demonstrates our commitment to quality and innovation in web development."
  },
  {
    type: "achievement",
    icon: <Code2 className="h-6 w-6 text-green-400" />,
    title: "40-50K Per Project",
    description: "Average project value, delivering high-quality solutions",
    longDescription: "Our projects typically range from 40-50K, reflecting the high-value solutions we provide. Each project includes comprehensive planning, development, testing, and deployment phases with ongoing support."
  },
  {
    type: "achievement",
    icon: <Target className="h-6 w-6 text-purple-400" />,
    title: "500+ Members",
    description: "Growing tech community with active participation and collaboration",
    longDescription: "Built a thriving community of over 500 tech enthusiasts, developers, and industry professionals. Our platform facilitates knowledge sharing, collaboration, and professional growth through various initiatives and events."
  }
];

export function Achievements() {
  const plugin = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [selectedItem, setSelectedItem] = useState<CarouselItemType | null>(null);

  return (
    <>
      <section id="achievements" className="relative w-full bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black" />
        
        <div className="w-full py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 relative z-10">
            <motion.div 
              className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 rounded-lg blur opacity-20"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <h2 
                  className="relative text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white"
                >
                  Our Achievements
                </h2>
              </div>
              <p 
                className="max-w-[90%] xs:max-w-[85%] sm:max-w-2xl mx-auto text-sm xs:text-base sm:text-lg text-white/80 leading-relaxed"
              >
                Showcasing our team&apos;s success in hackathons and web development projects
              </p>
            </motion.div>

            <motion.div 
              className="w-full max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                plugins={[plugin.current]}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-3">
                  {carouselItems.map((item, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-3 basis-full xs:basis-[85%] sm:basis-3/4 md:basis-1/2 lg:basis-1/3">
                      <motion.div 
                        className="p-0.5"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <div className="group/card cursor-pointer">
                          <Card className="border-white/10 bg-black/20 backdrop-blur-sm transition-all duration-500 hover:border-white/30 hover:bg-black/30 hover:shadow-2xl hover:shadow-blue-500/10 relative aspect-[1/1]">
                            <CardContent className="p-0 relative h-full">
                              {item.type === "image" && item.image ? (
                                <div className="relative w-full h-full flex flex-col">
                                  <div className="relative w-full h-[70%] transition-all duration-500 group-hover/card:h-[65%] overflow-hidden">
                                    <Image
                                      src={item.image as string}
                                      alt={item.title}
                                      fill
                                      className="object-cover transition-all duration-500 group-hover/card:brightness-110 group-hover/card:scale-105"
                                      priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
                                  </div>
                                  <div className="absolute bottom-0 w-full bg-black/70 backdrop-blur-sm p-3 xs:p-4 transition-all duration-500 h-[30%] group-hover/card:h-[35%] group-hover/card:bg-black/80">
                                    <div className="flex items-center justify-between mb-1">
                                      <h4 className="text-white font-semibold text-sm xs:text-base">{item.title}</h4>
                                      <Trophy className="h-3 w-3 xs:h-4 xs:w-4 text-blue-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
                                    </div>
                                    <p className="text-white/70 text-xs">{item.subtitle}</p>
                                    <div className="h-0 opacity-0 group-hover/card:h-auto group-hover/card:opacity-100 transition-all duration-500 pt-1 xs:pt-1.5 overflow-hidden">
                                      <p className="text-white/60 text-xs line-clamp-2">{item.description}</p>
                                      <button 
                                        className="mt-1 xs:mt-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group/btn"
                                        onClick={() => setSelectedItem(item)}
                                      >
                                        View Details
                                        <ChevronRight className="h-3 w-3 transform group-hover/btn:translate-x-1 transition-transform" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="h-full p-3 xs:p-4 flex flex-col">
                                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2 xs:space-y-3 transition-all duration-500 group-hover/card:translate-y-[-5%]">
                                    <div className="flex h-10 w-10 xs:h-12 xs:w-12 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 group-hover/card:ring-white/20 group-hover/card:bg-white/10 group-hover/card:scale-110 transition-all duration-500">
                                      {item.icon}
                                    </div>
                                    <h4 className="text-white font-semibold text-base xs:text-lg">{item.title}</h4>
                                    <p className="text-white/70 text-xs xs:text-sm leading-relaxed">{item.description}</p>
                                  </div>
                                  <div className="h-0 opacity-0 group-hover/card:h-auto group-hover/card:opacity-100 transition-all duration-500 overflow-hidden">
                                    <button 
                                      className="w-full text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center gap-1 group/btn mt-2"
                                      onClick={() => setSelectedItem(item)}
                                    >
                                      View Details
                                      <ChevronRight className="h-3 w-3 transform group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden xs:flex -left-12 border-white/20 bg-black/50 hover:bg-black/70 text-white" />
                <CarouselNext className="hidden xs:flex -right-12 border-white/20 bg-black/50 hover:bg-black/70 text-white" />
              </Carousel>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
            <DialogContent className="bg-black/95 border-white/20 backdrop-blur-xl p-0 max-w-2xl mx-3">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <GridPattern
                  width={12}
                  height={12}
                  x={-1}
                  y={-1}
                  className="absolute inset-0 h-full w-full fill-white/[0.02] stroke-white/[0.02] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
                />
                <div className="relative z-20">
                  {selectedItem?.type === "image" && selectedItem.image && (
                    <div className="relative w-full h-[180px] xs:h-[200px] sm:h-[300px] overflow-hidden">
                      <Image
                        src={selectedItem.image}
                        alt={selectedItem.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold text-white mb-1">
                          {selectedItem?.title}
                        </h3>
                        {selectedItem?.subtitle && (
                          <p className="text-sm text-white/70 mb-3">{selectedItem.subtitle}</p>
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="text-white/50 hover:text-white/70 transition-colors p-1 hover:bg-white/10 rounded-full"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-sm xs:text-base text-white/80 leading-relaxed">
                      {selectedItem?.longDescription}
                    </p>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}