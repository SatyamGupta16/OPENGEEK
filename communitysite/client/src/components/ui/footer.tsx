'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50 -mx-4 lg:-mx-0 lg:ml-[-256px] lg:mr-[-320px] lg:pl-64 lg:pr-80">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-white">OPENGEEK</h3>
              <span className="px-2 py-0.5 text-xs font-medium bg-zinc-800/50 text-zinc-400 rounded-full">
                Community
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              A vibrant community where developers, designers, and tech enthusiasts come together to share knowledge and collaborate.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-medium text-sm">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/discussions" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm">
                Discussions
              </Link>
              <Link href="/projects" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm">
                Projects
              </Link>
              <Link href="/blog" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm">
                Blog
              </Link>
              <Link href="/about" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm">
                About
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h4 className="text-white font-medium text-sm">Connect</h4>
            <div className="flex items-center space-x-3">
              <Link 
                href="https://github.com" 
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link 
                href="https://twitter.com" 
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link 
                href="https://linkedin.com" 
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link 
                href="mailto:hello@opengeek.com" 
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-zinc-800/30 space-y-3 sm:space-y-0">
          <p className="text-zinc-500 text-sm">
            © {currentYear} OpenGeek Community. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/privacy" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm">
              Privacy
            </Link>
            <Link href="/terms" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}