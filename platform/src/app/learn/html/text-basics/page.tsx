"use client"


export default function HTMLTextBasicsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Headings & Paragraphs</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">HTML Headings</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML provides six levels of headings, from <code className="text-[#1f6feb]">&lt;h1&gt;</code> to <code className="text-[#1f6feb]">&lt;h6&gt;</code>. 
          These headings help create a hierarchical structure for your content and are crucial for both readability and SEO.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Heading Examples</h3>
          <pre className="text-[#c9d1d9] mb-4">
            <code>
{`<h1>Main Title (Largest)</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>
<h4>Smaller Heading</h4>
<h5>Even Smaller Heading</h5>
<h6>Smallest Heading</h6>`}
            </code>
          </pre>
          <div className="text-[#c9d1d9] mt-4">
            <p className="mb-2"><strong>Best Practices:</strong></p>
            <ul className="list-disc list-inside space-y-2">
              <li>Use only one <code className="text-[#1f6feb]">&lt;h1&gt;</code> per page</li>
              <li>Maintain proper heading hierarchy</li>
              <li>Don't skip heading levels</li>
              <li>Keep headings concise and descriptive</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Paragraphs</h2>
        <p className="text-[#c9d1d9] mb-4">
          Paragraphs are defined using the <code className="text-[#1f6feb]">&lt;p&gt;</code> tag and are used to group related content. 
          They automatically add some space before and after the content.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Basic Paragraph</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<p>
  This is a paragraph of text.
  Line breaks within the HTML
  won't affect the output.
</p>`}
              </code>
            </pre>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Multiple Paragraphs</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<p>First paragraph of text.</p>
<p>Second paragraph of text.</p>
<p>Third paragraph of text.</p>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Text Spacing & Line Breaks</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML provides several ways to control spacing and line breaks in your text content.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Line Breaks and Horizontal Rules</h3>
          <pre className="text-[#c9d1d9] mb-4">
            <code>
{`<p>This is a line of text.<br>
This text appears on a new line.</p>

<hr>  <!-- Horizontal rule (line) -->

<p>This text is after the line.</p>`}
            </code>
          </pre>
          <div className="text-[#c9d1d9] mt-4">
            <ul className="list-disc list-inside space-y-2">
              <li><code className="text-[#1f6feb]">&lt;br&gt;</code> - Creates a line break</li>
              <li><code className="text-[#1f6feb]">&lt;hr&gt;</code> - Creates a horizontal rule (line)</li>
              <li>Use <code className="text-[#1f6feb]">&lt;br&gt;</code> sparingly; prefer proper paragraphs</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Text Formatting</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML includes several elements for basic text formatting and semantic meaning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Basic Formatting</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<p>
  <strong>Bold text</strong>
  <em>Italic text</em>
  <u>Underlined text</u>
  <mark>Highlighted text</mark>
</p>`}
              </code>
            </pre>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Semantic Text</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<p>
  <cite>Citation text</cite>
  <abbr title="World Wide Web">WWW</abbr>
  <code>Computer code</code>
  <small>Small text</small>
</p>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Preformatted Text</h2>
        <p className="text-[#c9d1d9] mb-4">
          The <code className="text-[#1f6feb]">&lt;pre&gt;</code> element preserves both spaces and line breaks, making it perfect for displaying code or ASCII art.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Preformatted Text Example</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<pre>
  This text preserves
     both spaces
  and line breaks
       exactly as written
</pre>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create a webpage that includes:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>A main heading and several subheadings</li>
            <li>Multiple paragraphs with different formatting</li>
            <li>Line breaks and horizontal rules</li>
            <li>Preformatted text</li>
          </ul>
          <a 
            href="/learn/html/text-formatting" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Text Formatting →
          </a>
        </div>
      </section>
    </div>
  );
} 