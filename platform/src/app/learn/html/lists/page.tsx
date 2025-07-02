
export default function HTMLListsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Lists</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Types of Lists</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML provides three types of lists to organize content: unordered lists, ordered lists, and description lists.
          Each type serves a different purpose and helps structure content in a meaningful way.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Unordered List</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>`}
              </code>
            </pre>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Ordered List</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<ol>
  <li>First</li>
  <li>Second</li>
  <li>Third</li>
</ol>`}
              </code>
            </pre>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Description List</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<dl>
  <dt>Term</dt>
  <dd>Description</dd>
</dl>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Unordered Lists</h2>
        <p className="text-[#c9d1d9] mb-4">
          Unordered lists (<code className="text-[#1f6feb]">&lt;ul&gt;</code>) are used when the order of items doesn't matter. 
          Each item is marked with a bullet point by default.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Unordered List Styles</h3>
          <pre className="text-[#c9d1d9] mb-4">
            <code>
{`<!-- Default bullets -->
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>

<!-- With CSS styling -->
<ul style="list-style-type: circle">
  <li>Circle bullet</li>
  <li>Circle bullet</li>
</ul>

<ul style="list-style-type: square">
  <li>Square bullet</li>
  <li>Square bullet</li>
</ul>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Ordered Lists</h2>
        <p className="text-[#c9d1d9] mb-4">
          Ordered lists (<code className="text-[#1f6feb]">&lt;ol&gt;</code>) are used when the sequence of items matters. 
          Items are automatically numbered.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Ordered List Attributes</h3>
          <pre className="text-[#c9d1d9] mb-4">
            <code>
{`<!-- Default numbers -->
<ol>
  <li>First item</li>
  <li>Second item</li>
</ol>

<!-- Start from specific number -->
<ol start="5">
  <li>Fifth item</li>
  <li>Sixth item</li>
</ol>

<!-- Reverse order -->
<ol reversed>
  <li>Last item</li>
  <li>Previous item</li>
</ol>

<!-- Different numbering types -->
<ol type="A">
  <li>Item A</li>
  <li>Item B</li>
</ol>

<ol type="i">
  <li>Item i</li>
  <li>Item ii</li>
</ol>`}
            </code>
          </pre>
          <div className="text-[#c9d1d9]">
            <p className="mb-2"><strong>Type Attributes:</strong></p>
            <ul className="list-disc list-inside space-y-2">
              <li><code className="text-[#1f6feb]">type="1"</code> - Default numbers</li>
              <li><code className="text-[#1f6feb]">type="A"</code> - Uppercase letters</li>
              <li><code className="text-[#1f6feb]">type="a"</code> - Lowercase letters</li>
              <li><code className="text-[#1f6feb]">type="I"</code> - Uppercase Roman numerals</li>
              <li><code className="text-[#1f6feb]">type="i"</code> - Lowercase Roman numerals</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Description Lists</h2>
        <p className="text-[#c9d1d9] mb-4">
          Description lists (<code className="text-[#1f6feb]">&lt;dl&gt;</code>) are used to create a list of terms and their descriptions.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Description List Example</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language - the standard markup language for web pages.</dd>
  
  <dt>CSS</dt>
  <dd>Cascading Style Sheets - used for styling web pages.</dd>
  
  <dt>JavaScript</dt>
  <dd>A programming language that enables interactive web pages.</dd>
</dl>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Nested Lists</h2>
        <p className="text-[#c9d1d9] mb-4">
          Lists can be nested inside other lists to create hierarchical structures.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Nested List Example</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<ul>
  <li>Front-end
    <ul>
      <li>HTML
        <ul>
          <li>Elements</li>
          <li>Attributes</li>
        </ul>
      </li>
      <li>CSS
        <ol>
          <li>Selectors</li>
          <li>Properties</li>
        </ol>
      </li>
    </ul>
  </li>
  <li>Back-end
    <ul>
      <li>Node.js</li>
      <li>Python</li>
    </ul>
  </li>
</ul>`}
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
            <li>An unordered list with different bullet styles</li>
            <li>An ordered list with custom starting number and type</li>
            <li>A description list with multiple terms and descriptions</li>
            <li>A nested list with at least three levels</li>
          </ul>
          <a 
            href="/learn/html/links" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Links →
          </a>
        </div>
      </section>
    </div>
  );
} 