export default function HTMLTextFormattingPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Text Formatting</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Text Styling Elements</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML provides various elements for formatting text, each with its own semantic meaning and visual style.
          While some elements are purely for styling, others convey specific meaning about the text they contain.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Basic Text Formatting</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Bold and Strong -->
<strong>Important text</strong>
<b>Bold text</b>

<!-- Italic and Emphasis -->
<em>Emphasized text</em>
<i>Italic text</i>

<!-- Underline -->
<u>Underlined text</u>

<!-- Strikethrough -->
<s>Strikethrough text</s>
<del>Deleted text</del>`}
              </code>
            </pre>
            <div className="text-[#c9d1d9]">
              <p className="mb-2"><strong>Usage Notes:</strong></p>
              <ul className="list-disc list-inside space-y-2">
                <li>Use <code className="text-[#1f6feb]">&lt;strong&gt;</code> for importance</li>
                <li>Use <code className="text-[#1f6feb]">&lt;em&gt;</code> for emphasis</li>
                <li>Use <code className="text-[#1f6feb]">&lt;del&gt;</code> for deleted content</li>
                <li>Use <code className="text-[#1f6feb]">&lt;s&gt;</code> for no-longer-accurate content</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Semantic Text Elements</h2>
        <p className="text-[#c9d1d9] mb-4">
          Semantic elements provide meaning to the text they contain, helping both browsers and search engines understand your content better.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Citations and Definitions</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Citations -->
<cite>The Hobbit</cite>

<!-- Abbreviations -->
<abbr title="World Health Organization">
  WHO
</abbr>

<!-- Definitions -->
<dfn>HTML</dfn>

<!-- Quotations -->
<q>Inline quote</q>
<blockquote>
  Block quote
</blockquote>`}
              </code>
            </pre>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Technical Text</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Code -->
<code>console.log('Hello');</code>

<!-- Keyboard Input -->
<kbd>Ctrl + S</kbd>

<!-- Sample Output -->
<samp>Error 404</samp>

<!-- Variables -->
<var>x</var> = <var>y</var> + 2`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Text Subscript and Superscript</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML provides elements for displaying subscript and superscript text, useful for mathematical or chemical formulas.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Subscript and Superscript Examples</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Superscript -->
<p>E = mc<sup>2</sup></p>
<p>5<sup>th</sup> of September</p>

<!-- Subscript -->
<p>H<sub>2</sub>O</p>
<p>Log<sub>2</sub>n</p>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Text Direction</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML supports bi-directional text, allowing you to mix left-to-right and right-to-left text.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Text Direction Examples</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Right to Left -->
<p dir="rtl">This text goes right to left</p>

<!-- Bidirectional Override -->
<bdo dir="rtl">Reversed text</bdo>

<!-- Bidirectional Isolation -->
<bdi>User input text</bdi>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Special Characters</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML entities allow you to display special characters that might otherwise be interpreted as HTML code.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Common HTML Entities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Special Characters -->
&lt; = <
&gt; = >
&amp; = &
&quot; = "
&apos; = '
&copy; = ©
&reg; = ®
&trade; = ™`}
              </code>
            </pre>
            <div className="text-[#c9d1d9]">
              <p className="mb-2"><strong>When to Use:</strong></p>
              <ul className="list-disc list-inside space-y-2">
                <li>For reserved characters in HTML</li>
                <li>For special symbols</li>
                <li>For characters not on your keyboard</li>
                <li>To ensure proper rendering</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create a webpage that demonstrates:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Different text formatting techniques</li>
            <li>Use of semantic elements</li>
            <li>Mathematical formulas with sub/superscript</li>
            <li>Special characters and entities</li>
          </ul>
          <a 
            href="/learn/html/lists" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Lists →
          </a>
        </div>
      </section>
    </div>
  );
} 