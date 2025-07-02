import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronDown, CheckCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CourseItem {
  id: string;
  title: string;
  isSpecial?: boolean;
}

interface CourseStructure {
  [section: string]: CourseItem[];
}

const htmlCourseStructure: CourseStructure = {
  'Getting Started': [
    { id: 'introduction', title: 'Introduction to HTML' },
    { id: 'basics', title: 'HTML Basics' },
    { id: 'structure', title: 'HTML Document Structure' },
    { id: 'elements', title: 'HTML Elements' },
    { id: 'code-style', title: 'HTML Code Style' },
  ],
  'Text and Content': [
    { id: 'text-basics', title: 'Text Basics' },
    { id: 'text-formatting', title: 'Text Formatting' },
    { id: 'text-elements', title: 'Text Elements' },
    { id: 'links', title: 'Links & Navigation' },
    { id: 'images', title: 'Images' },
    { id: 'media', title: 'Media' },
    { id: 'iframes', title: 'iFrames' },
  ],
  'Lists and Tables': [
    { id: 'lists', title: 'Lists' },
    { id: 'tables', title: 'Tables' },
    { id: 'table-structure', title: 'Table Structure' },
  ],
  'Forms': [
    { id: 'form-basics', title: 'Form Basics' },
    { id: 'input-types', title: 'Input Types' },
    { id: 'form-validation', title: 'Form Validation' },
  ],
  'Structure and Semantics': [
    { id: 'page-structure', title: 'Page Structure' },
    { id: 'semantic-elements', title: 'Semantic Elements' },
    { id: 'patterns', title: 'Common Patterns' },
    { id: 'accessibility', title: 'Accessibility' },
  ],
  'Advanced Features': [
    { id: 'graphics', title: 'Graphics' },
    { id: 'geolocation', title: 'Geolocation' },
    { id: 'storage', title: 'Storage' },
    { id: 'performance', title: 'Performance' },
    { id: 'seo', title: 'SEO' },
  ],
  'Course Completion': [
    { id: 'completed', title: 'Complete Course', isSpecial: true },
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
        <ScrollArea className="h-screen mb-10">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-white mb-4">HTML Tutorial</h2>
            <div className="space-y-2">
              {Object.entries(htmlCourseStructure).map(([section, items]) => (
                <Collapsible
                  key={section}
                  open={openSections.includes(section) || section === 'Course Completion'}
                  onOpenChange={() => section !== 'Course Completion' && toggleSection(section)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between ${
                        section === 'Course Completion' 
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-white hover:bg-[#374151]'
                      }`}
                      disabled={section === 'Course Completion'}
                    >
                      {section}
                      {section !== 'Course Completion' && (
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          openSections.includes(section) ? 'transform rotate-180' : ''
                        }`} />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-1">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        to={`/learn/html/${item.id}`}
                        className={`block py-2 px-3 rounded-md text-sm ${
                          item.isSpecial
                            ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20 flex items-center gap-2'
                            : isLinkActive(item.id)
                              ? 'bg-blue-500/10 text-blue-400'
                              : 'text-gray-400 hover:text-white hover:bg-[#374151]'
                        }`}
                      >
                        {item.title}
                        {item.isSpecial && <CheckCircle className="w-4 h-4" />}
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
      <div className="flex-1 overflow-auto bg-[#111827] mb-10">
        <div className="container mx-auto py-8 px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
} 