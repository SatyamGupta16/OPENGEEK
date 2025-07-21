

export default function HTMLLinksPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Links</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Introduction to Links</h2>
        <p className="text-[#c9d1d9] mb-4">
          Links are one of the most important elements in HTML, allowing users to navigate between pages and resources.
          They are created using the <code className="text-[#1f6feb]">&lt;a&gt;</code> (anchor) element.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Basic Link Syntax</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<a href="url">Link Text</a>

Examples:
<a href="https://www.example.com">Visit Example.com</a>
<a href="/about">About Us</a>
<a href="contact.html">Contact Page</a>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Link Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">External Links</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- External link with protocol -->
<a href="https://www.example.com">
  Visit Example.com
</a>

<!-- Open in new tab -->
<a href="https://www.example.com"
   target="_blank"
   rel="noopener noreferrer">
  Opens in New Tab
</a>`}
              </code>
            </pre>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Internal Links</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Relative path -->
<a href="about.html">About</a>

<!-- Root-relative path -->
<a href="/">Home</a>
<a href="/products">Products</a>

<!-- Current directory -->
<a href="./images/photo.jpg">
  View Photo
</a>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Link Attributes</h2>
        <p className="text-[#c9d1d9] mb-4">
          Links can be customized using various attributes to control their behavior and appearance.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Common Link Attributes</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Target attribute -->
<a href="page.html" target="_blank">New Window</a>
<a href="page.html" target="_self">Same Window</a>

<!-- Title attribute -->
<a href="page.html" title="Click to learn more">
  Hover over me
</a>

<!-- Download attribute -->
<a href="file.pdf" download>
  Download PDF
</a>

<!-- Rel attribute -->
<a href="http://example.com" 
   rel="noopener noreferrer">
  Safe External Link
</a>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Page Anchors</h2>
        <p className="text-[#c9d1d9] mb-4">
          Links can be used to navigate to specific sections within a page using ID references.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Anchor Links</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Link to section -->
<a href="#section1">Go to Section 1</a>

<!-- Target section -->
<h2 id="section1">Section 1</h2>

<!-- Link to section on another page -->
<a href="page.html#section2">
  Go to Section 2 on Page
</a>

<!-- Back to top link -->
<a href="#">Back to Top</a>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Advanced Link Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Email Links</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Basic email link -->
<a href="mailto:example@email.com">
  Send email
</a>

<!-- Email with subject -->
<a href="mailto:example@email.com?subject=Hello">
  Email us
</a>

<!-- Email with subject and body -->
<a href="mailto:example@email.com
   ?subject=Hello
   &body=How%20are%20you">
  Send pre-filled email
</a>`}
              </code>
            </pre>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Phone Links</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Phone link -->
<a href="tel:+1234567890">
  Call us
</a>

<!-- SMS link -->
<a href="sms:+1234567890">
  Send SMS
</a>

<!-- WhatsApp link -->
<a href="https://wa.me/1234567890">
  Chat on WhatsApp
</a>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Use descriptive link text (avoid "click here" or "read more")</li>
            <li>Add <code className="text-[#1f6feb]">rel="noopener noreferrer"</code> to external links</li>
            <li>Ensure links are easily distinguishable from regular text</li>
            <li>Use the title attribute to provide additional context</li>
            <li>Check for broken links before publishing</li>
            <li>Consider accessibility when styling links</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create a webpage that demonstrates:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Internal and external links</li>
            <li>Links that open in new tabs</li>
            <li>Page anchors and section navigation</li>
            <li>Email and phone links</li>
            <li>Links with different attributes</li>
          </ul>
          <a 
            href="/learn/html/images" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Images →
          </a>
        </div>
      </section>
    </div>
  );
} 