import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = {
  platform: [
    { name: "About Us", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Community", href: "#community" },
    { name: "Mentorship", href: "#mentorship" },
  ],
  resources: [
    { name: "Documentation", href: "#docs" },
    { name: "Learning Path", href: "#learn" },
    { name: "Blog", href: "#blog" },
    { name: "FAQ", href: "#faq" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Code of Conduct", href: "#conduct" },
    { name: "Contact", href: "#contact" },
  ],
};

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-10 md:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Branding & Newsletter */}
          <div className="flex flex-col gap-4 col-span-2 sm:col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-gray-900">
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                OPENGEEK
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-600">
              Empowering the next generation of developers with real-world projects and opportunities.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="mb-2 sm:mb-4 text-sm font-semibold text-gray-900">Platform</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-2 sm:mb-4 text-sm font-semibold text-gray-900">Resources</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-2 sm:mb-4 text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 md:flex-row">
          <p className="text-xs sm:text-sm text-gray-600 text-center md:text-left">
            © {new Date().getFullYear()} OpenGeek. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="#privacy" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
            <Link to="#terms" className="text-sm text-gray-600 hover:text-gray-900">
              Terms
            </Link>
            <Link to="#cookies" className="text-sm text-gray-600 hover:text-gray-900">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 