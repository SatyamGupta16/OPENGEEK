"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Code2, BookOpen, Briefcase, Users2 } from "lucide-react";

const navItems = [
  {
    name: "Projects",
    href: "#projects",
    icon: Briefcase,
  },
  {
    name: "Learn",
    href: "#learn",
    icon: BookOpen,
  },
  {
    name: "Community",
    href: "#community",
    icon: Users2,
  },
  {
    name: "Resources",
    href: "#resources",
    icon: Code2,
  },
];

export function Navbar() {
  const [active, setActive] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 top-4 z-50 mx-auto flex h-16 w-[96%] max-w-7xl items-center justify-between rounded-full border border-white/[0.1] px-8 transition-colors duration-300",
        active ? "bg-black/70 backdrop-blur-md" : "bg-transparent backdrop-blur-md"
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="relative z-10 flex items-center gap-2 text-xl font-semibold text-white"
      >
        <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
          OPENGEEK
        </span>
        <span className="hidden sm:inline-block text-sm text-white/50">Community</span>
      </Link>

      {/* Desktop Navigation - Hidden on Mobile */}
      <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white group"
              >
                <item.icon className="h-4 w-4 transition-colors group-hover:text-blue-400" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Join Us Button - Visible on both Mobile and Desktop */}
      <div className="flex items-center gap-3">
        <Link href="/signin" className="hidden sm:block text-sm text-white/70 hover:text-white transition-colors">
          Sign in
        </Link>
        <Button
          className="relative bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  );
}
