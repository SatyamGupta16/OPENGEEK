export default function HTMLTextElementsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Text Elements in HTML</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Basic Text Elements</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML provides various elements for structuring and formatting text content. These elements help create 
          well-organized and readable content while providing semantic meaning to the text.
        </p>
        
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <pre className="text-[#c9d1d9]">
            <code>
{`<h1>Main Heading</h1>
<h2>Subheading</h2>
<p>This is a paragraph of text.</p>
<p>Another paragraph with <strong>bold</strong> and <em>italic</em> text.</p>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Headings</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML provides six levels of headings, from h1 to h6, with h1 being the most important and h6 the least.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Heading Hierarchy</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
<h4>Sub-subsection</h4>
<h5>Minor heading</h5>
<h6>Smallest heading</h6>`}
              </code>
            </pre>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Best Practices</h3>
            <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
              <li>Use only one h1 per page</li>
              <li>Maintain proper hierarchy</li>
              <li>Don't skip heading levels</li>
              <li>Use for structure, not styling</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Text Formatting Elements</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[#c9d1d9]">
            <thead>
              <tr className="bg-[#161b22]">
                <th className="border border-[#30363d] p-3 text-left">Element</th>
                <th className="border border-[#30363d] p-3 text-left">Description</th>
                <th className="border border-[#30363d] p-3 text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#30363d] p-3">&lt;strong&gt;</td>
                <td className="border border-[#30363d] p-3">Important text (bold)</td>
                <td className="border border-[#30363d] p-3">&lt;strong&gt;Important&lt;/strong&gt;</td>
              </tr>
              <tr className="bg-[#161b22]">
                <td className="border border-[#30363d] p-3">&lt;em&gt;</td>
                <td className="border border-[#30363d] p-3">Emphasized text (italic)</td>
                <td className="border border-[#30363d] p-3">&lt;em&gt;Emphasized&lt;/em&gt;</td>
              </tr>
              <tr>
                <td className="border border-[#30363d] p-3">&lt;mark&gt;</td>
                <td className="border border-[#30363d] p-3">Highlighted text</td>
                <td className="border border-[#30363d] p-3">&lt;mark&gt;Marked&lt;/mark&gt;</td>
              </tr>
              <tr className="bg-[#161b22]">
                <td className="border border-[#30363d] p-3">&lt;sub&gt;</td>
                <td className="border border-[#30363d] p-3">Subscript text</td>
                <td className="border border-[#30363d] p-3">H&lt;sub&gt;2&lt;/sub&gt;O</td>
              </tr>
              <tr>
                <td className="border border-[#30363d] p-3">&lt;sup&gt;</td>
                <td className="border border-[#30363d] p-3">Superscript text</td>
                <td className="border border-[#30363d] p-3">2&lt;sup&gt;3&lt;/sup&gt;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Semantic Text Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Quotations</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<blockquote>
    Long quotation here...
</blockquote>

<q>Short quote</q>

<cite>Source citation</cite>`}
              </code>
            </pre>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Other Elements</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<abbr title="World Wide Web">WWW</abbr>

<address>
    Contact information
</address>

<time datetime="2024-03-25">
    March 25, 2024
</time>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Next Steps</h2>
          <p className="text-[#c9d1d9] mb-4">
            Now that you understand text elements, let's learn how to create links and navigation in HTML.
          </p>
          <a 
            href="/learn/html/links" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Links & Navigation →
          </a>
        </div>
      </section>
    </div>
  );
} 