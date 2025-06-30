import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const htmlCourseStructure = {
  'Getting Started': [
    { id: 'introduction', title: 'Introduction to HTML' },
    { id: 'basics', title: 'HTML Basics' },
    { id: 'structure', title: 'HTML Document Structure' },
  ],
  'HTML Elements': [
    { id: 'text-elements', title: 'Text Elements' },
    { id: 'links', title: 'Links & Navigation' },
    { id: 'images', title: 'Images & Media' },
    { id: 'lists', title: 'Lists & Tables' },
  ],
  'Forms & Input': [
    { id: 'forms-basics', title: 'Form Basics' },
    { id: 'input-types', title: 'Input Types' },
    { id: 'form-validation', title: 'Form Validation' },
  ],
  'Semantic HTML': [
    { id: 'semantic-elements', title: 'Semantic Elements' },
    { id: 'layout-elements', title: 'Layout Elements' },
    { id: 'accessibility', title: 'Accessibility' },
  ],
  'Advanced Topics': [
    { id: 'meta-tags', title: 'Meta Tags & SEO' },
    { id: 'html5-apis', title: 'HTML5 APIs' },
    { id: 'best-practices', title: 'Best Practices' },
  ],
};

export default function HTMLCourseLayout() {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<string[]>(['Getting Started']);

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isLinkActive = (id: string) => {
    return location.pathname.includes(`/html/${id}`);
  };

  return (
    
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#1f2937] border-r border-[#374151]">
        <ScrollArea className="h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-white mb-4">HTML Tutorial</h2>
            <div className="space-y-2">
              {Object.entries(htmlCourseStructure).map(([section, items]) => (
                <Collapsible
                  key={section}
                  open={openSections.includes(section)}
                  onOpenChange={() => toggleSection(section)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-white hover:bg-[#374151]"
                    >
                      {section}
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        openSections.includes(section) ? 'transform rotate-180' : ''
                      }`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-1">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        to={`/learn/html/${item.id}`}
                        className={`block py-2 px-3 rounded-md text-sm ${
                          isLinkActive(item.id)
                            ? 'bg-blue-500/10 text-blue-400'
                            : 'text-gray-400 hover:text-white hover:bg-[#374151]'
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[#111827]">
        <div className="container mx-auto py-8 px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
} 