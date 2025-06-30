import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HTMLIntroductionPage() {
  return (
    <ScrollArea className="flex-1 h-full mb-20">
    <div className="min-h-full flex flex-col">
      {/* Fixed Header */}
      <div className="flex-none border-b border-[#21262d] bg-[#161b22] px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-white">Introduction to HTML</h1>
          <p className="text-[#8b949e] mt-2">Learn the fundamentals of HTML and start building web pages</p>
        </div>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="px-8 py-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* What is HTML Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-[#1f6feb] rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">1</span>
                What is HTML?
              </h2>
              <div className="pl-11">
                <p className="text-[#8b949e] mb-6">
                  HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of web pages using markup. HTML elements are represented by tags, which label pieces of content such as "heading", "paragraph", "table", and so on.
                </p>
                
                <Card className="bg-[#161b22] border-[#30363d] mb-6">
                  <div className="p-4 border-b border-[#30363d] flex items-center justify-between">
                    <span className="text-sm font-medium text-[#c9d1d9]">Example HTML Code</span>
                    <span className="text-xs text-[#8b949e]">index.html</span>
                  </div>
                  <pre className="p-4 text-sm text-[#8b949e] overflow-x-auto">
                    <code>{`<!DOCTYPE html>
<html>
  <head>
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Welcome to HTML!</h1>
    <p>This is a paragraph.</p>
  </body>
</html>`}</code>
                  </pre>
                </Card>
              </div>
            </section>

            {/* Why Learn HTML Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-[#1f6feb] rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">2</span>
                Why Learn HTML?
              </h2>
              <div className="pl-11">
                <ul className="space-y-4">
                  {[
                    "HTML is the foundation of all web pages",
                    "Required knowledge for web development",
                    "Easy to learn and use",
                    "Free to use and supported by all browsers"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#1f6feb] mr-3 flex-shrink-0" />
                      <span className="text-[#8b949e]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* What You'll Learn Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-[#1f6feb] rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">3</span>
                What You'll Learn
              </h2>
              <div className="pl-11 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Basic Structure",
                    description: "Learn about HTML documents and their basic structure"
                  },
                  {
                    title: "Elements & Tags",
                    description: "Understand HTML elements and how to use tags"
                  },
                  {
                    title: "Attributes",
                    description: "Master HTML attributes and their usage"
                  },
                  {
                    title: "Best Practices",
                    description: "Learn HTML coding best practices and standards"
                  }
                ].map((item, index) => (
                  <Card key={index} className="bg-[#161b22] border-[#30363d] p-4">
                    <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                    <p className="text-[#8b949e]">{item.description}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Prerequisites Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-[#1f6feb] rounded-full w-8 h-8 inline-flex items-center justify-center mr-3">4</span>
                Prerequisites
              </h2>
              <div className="pl-11">
                <p className="text-[#8b949e] mb-4">
                  To get started with HTML, you'll need:
                </p>
                <ul className="space-y-3">
                  {[
                    "A text editor (VS Code, Sublime Text, etc.)",
                    "A modern web browser",
                    "Basic understanding of computers"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-[#8b949e]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1f6feb] mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Navigation Footer */}
            <div className="pt-8 mt-8 border-t border-[#21262d] flex justify-between items-center">
              <div className="opacity-50">
                <span className="text-[#8b949e]">Previous</span>
              </div>
              <Link 
                to="/learn/html/basics"
                className="flex items-center text-[#1f6feb] hover:text-[#388bfd]"
              >
                Next: HTML Basics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
    </ScrollArea>
  );
} 