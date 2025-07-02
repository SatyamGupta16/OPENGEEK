export default function HTMLBasicsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Basics</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Understanding HTML Elements</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML elements are the building blocks of web pages. Each element is defined by a start tag, content, and an end tag.
          Some elements are self-closing and don't require an end tag.
        </p>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-4">
          <p className="text-[#c9d1d9]">
            <strong className="text-[#1f6feb]">Syntax:</strong> &lt;tagname&gt;content&lt;/tagname&gt;
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Basic HTML Tags</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[#c9d1d9]">
            <thead>
              <tr className="bg-[#161b22]">
                <th className="border border-[#30363d] p-3 text-left">Tag</th>
                <th className="border border-[#30363d] p-3 text-left">Description</th>
                <th className="border border-[#30363d] p-3 text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#30363d] p-3">&lt;h1&gt; to &lt;h6&gt;</td>
                <td className="border border-[#30363d] p-3">Headings</td>
                <td className="border border-[#30363d] p-3">&lt;h1&gt;Main Title&lt;/h1&gt;</td>
              </tr>
              <tr className="bg-[#161b22]">
                <td className="border border-[#30363d] p-3">&lt;p&gt;</td>
                <td className="border border-[#30363d] p-3">Paragraph</td>
                <td className="border border-[#30363d] p-3">&lt;p&gt;Text content&lt;/p&gt;</td>
              </tr>
              <tr>
                <td className="border border-[#30363d] p-3">&lt;div&gt;</td>
                <td className="border border-[#30363d] p-3">Division/container</td>
                <td className="border border-[#30363d] p-3">&lt;div&gt;Content block&lt;/div&gt;</td>
              </tr>
              <tr className="bg-[#161b22]">
                <td className="border border-[#30363d] p-3">&lt;span&gt;</td>
                <td className="border border-[#30363d] p-3">Inline container</td>
                <td className="border border-[#30363d] p-3">&lt;span&gt;Inline text&lt;/span&gt;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">HTML Attributes</h2>
        <p className="text-[#c9d1d9] mb-4">
          Attributes provide additional information about HTML elements and are always specified in the start tag.
        </p>
        <pre className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 overflow-x-auto mb-4">
          <code className="text-[#c9d1d9]">
{`<element attribute="value">content</element>

Examples:
<img src="image.jpg" alt="Description">
<a href="https://example.com">Link text</a>
<div class="container">Content</div>`}
          </code>
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Common Attributes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">class</h3>
            <p className="text-[#c9d1d9]">Specifies one or more class names for styling and JavaScript selection</p>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">id</h3>
            <p className="text-[#c9d1d9]">Specifies a unique identifier for an element</p>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">style</h3>
            <p className="text-[#c9d1d9]">Specifies inline CSS styles for an element</p>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">title</h3>
            <p className="text-[#c9d1d9]">Specifies extra information about an element (tooltip)</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Next Steps</h2>
          <p className="text-[#c9d1d9] mb-4">
            Now that you understand the basics of HTML elements and attributes, let's explore how to structure an HTML document.
          </p>
          <a 
            href="/learn/html/structure" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Document Structure →
          </a>
        </div>
      </section>
    </div>
  );
}
