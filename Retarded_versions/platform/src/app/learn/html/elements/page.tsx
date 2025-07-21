
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function HTMLElementsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Elements & Tags</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Understanding HTML Elements</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML elements are the building blocks of web pages. Each element is defined by a start tag, content, and an end tag.
          Elements tell the browser how to structure and present the content.
        </p>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-4">
          <p className="text-[#c9d1d9]">
            <strong className="text-[#1f6feb]">Syntax:</strong> &lt;tagname&gt;content&lt;/tagname&gt;
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Types of Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Block Elements</h3>
            <p className="text-[#c9d1d9] mb-2">
              Start on a new line and take up the full width available.
            </p>
            <ul className="list-disc list-inside text-[#c9d1d9] space-y-1">
              <li>&lt;div&gt;</li>
              <li>&lt;p&gt;</li>
              <li>&lt;h1&gt; to &lt;h6&gt;</li>
              <li>&lt;section&gt;</li>
            </ul>
          </div>
          
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Inline Elements</h3>
            <p className="text-[#c9d1d9] mb-2">
              Don't start on a new line and only take up necessary width.
            </p>
            <ul className="list-disc list-inside text-[#c9d1d9] space-y-1">
              <li>&lt;span&gt;</li>
              <li>&lt;a&gt;</li>
              <li>&lt;strong&gt;</li>
              <li>&lt;em&gt;</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Common HTML Elements</h2>
        <div className="space-y-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Text Elements</h3>
            <pre className="text-[#c9d1d9] mb-2">
{`<h1>Main Heading</h1>
<p>Paragraph text</p>
<strong>Bold text</strong>
<em>Italic text</em>`}
            </pre>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Container Elements</h3>
            <pre className="text-[#c9d1d9] mb-2">
{`<div>Generic container</div>
<section>Thematic grouping</section>
<article>Independent content</article>
<aside>Sidebar content</aside>`}
            </pre>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Navigation Elements</h3>
            <pre className="text-[#c9d1d9] mb-2">
{`<nav>Navigation menu</nav>
<a href="url">Link text</a>
<button>Click me</button>`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Semantic Elements</h2>
        <p className="text-[#c9d1d9] mb-4">
          Semantic elements clearly describe their meaning to both the browser and the developer.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[#c9d1d9]">
            <thead>
              <tr className="bg-[#161b22]">
                <th className="border border-[#30363d] p-3 text-left">Element</th>
                <th className="border border-[#30363d] p-3 text-left">Purpose</th>
                <th className="border border-[#30363d] p-3 text-left">Example Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#30363d] p-3">&lt;header&gt;</td>
                <td className="border border-[#30363d] p-3">Introductory content</td>
                <td className="border border-[#30363d] p-3">Page header, article header</td>
              </tr>
              <tr className="bg-[#161b22]">
                <td className="border border-[#30363d] p-3">&lt;nav&gt;</td>
                <td className="border border-[#30363d] p-3">Navigation links</td>
                <td className="border border-[#30363d] p-3">Menu, navigation bar</td>
              </tr>
              <tr>
                <td className="border border-[#30363d] p-3">&lt;main&gt;</td>
                <td className="border border-[#30363d] p-3">Main content</td>
                <td className="border border-[#30363d] p-3">Primary page content</td>
              </tr>
              <tr className="bg-[#161b22]">
                <td className="border border-[#30363d] p-3">&lt;footer&gt;</td>
                <td className="border border-[#30363d] p-3">Footer content</td>
                <td className="border border-[#30363d] p-3">Copyright, contact info</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <ul className="list-disc list-inside space-y-3 text-[#c9d1d9]">
          <li>
            <strong className="text-white">Use semantic elements</strong> when possible for better accessibility
          </li>
          <li>
            <strong className="text-white">Keep nesting minimal</strong> to maintain clean code structure
          </li>
          <li>
            <strong className="text-white">Close all elements</strong> properly to avoid errors
          </li>
          <li>
            <strong className="text-white">Use lowercase</strong> for element names for consistency
          </li>
        </ul>
      </section>

      {/* Navigation Footer */}
      <div className="pt-8 mt-8 border-t border-[#21262d] flex justify-between items-center">
        <Link 
          to="/learn/html/basics"
          className="flex items-center text-[#1f6feb] hover:text-[#388bfd]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous: HTML Basics
        </Link>
        <Link 
          to="/learn/html/attributes"
          className="flex items-center text-[#1f6feb] hover:text-[#388bfd]"
        >
          Next: HTML Attributes
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
} 