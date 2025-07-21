
export default function HTMLIframesPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML iframes</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Introduction to iframes</h2>
        <p className="text-[#c9d1d9] mb-4">
          An iframe (Inline Frame) is an HTML element that allows you to embed another HTML document within the current document.
          It's commonly used for embedding external content like maps, videos, or other web pages.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Basic iframe Syntax</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Basic iframe -->
<iframe 
  src="URL"
  width="400"
  height="300"
  title="Description">
</iframe>

<!-- iframe with fallback content -->
<iframe src="URL">
  <p>Your browser does not support iframes.</p>
</iframe>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Common Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Maps</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Google Maps embed -->
<iframe
  src="https://maps.google.com/maps
       ?q=location&output=embed"
  width="600"
  height="450"
  style="border:0;"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Google Maps">
</iframe>`}
              </code>
            </pre>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Videos</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- YouTube embed -->
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="YouTube video"
  frameborder="0"
  allow="accelerometer; autoplay; 
         clipboard-write; encrypted-media; 
         gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">iframe Attributes</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <table className="w-full text-[#c9d1d9]">
            <thead>
              <tr className="border-b border-[#30363d]">
                <th className="text-left py-2">Attribute</th>
                <th className="text-left py-2">Description</th>
                <th className="text-left py-2">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#30363d]">
                <td className="py-2"><code className="text-[#1f6feb]">src</code></td>
                <td>URL of the page to embed</td>
                <td><code>src="page.html"</code></td>
              </tr>
              <tr className="border-b border-[#30363d]">
                <td className="py-2"><code className="text-[#1f6feb]">width</code></td>
                <td>Width of the frame</td>
                <td><code>width="400"</code></td>
              </tr>
              <tr className="border-b border-[#30363d]">
                <td className="py-2"><code className="text-[#1f6feb]">height</code></td>
                <td>Height of the frame</td>
                <td><code>height="300"</code></td>
              </tr>
              <tr className="border-b border-[#30363d]">
                <td className="py-2"><code className="text-[#1f6feb]">title</code></td>
                <td>Description for accessibility</td>
                <td><code>title="Map"</code></td>
              </tr>
              <tr className="border-b border-[#30363d]">
                <td className="py-2"><code className="text-[#1f6feb]">sandbox</code></td>
                <td>Security restrictions</td>
                <td><code>sandbox="allow-scripts"</code></td>
              </tr>
              <tr>
                <td className="py-2"><code className="text-[#1f6feb]">loading</code></td>
                <td>Loading behavior</td>
                <td><code>loading="lazy"</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Security Considerations</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Sandbox Attribute</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Secure iframe with sandbox -->
<iframe
  src="page.html"
  sandbox="allow-scripts 
          allow-same-origin
          allow-forms"
  title="Secure content">
</iframe>

<!-- Common sandbox values -->
allow-forms
allow-scripts
allow-same-origin
allow-top-navigation
allow-popups
allow-modals`}
            </code>
          </pre>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Content Security Policy</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- CSP meta tag -->
<meta
  http-equiv="Content-Security-Policy"
  content="frame-src 'self' 
           https://www.youtube.com 
           https://maps.google.com;">

<!-- Allow specific features -->
<iframe
  src="https://example.com"
  allow="fullscreen; 
         geolocation; 
         microphone"
  title="Feature-specific iframe">
</iframe>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Responsive iframes</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Responsive Wrapper</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- CSS for responsive container -->
<style>
.iframe-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 ratio */
  height: 0;
  overflow: hidden;
}

.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<!-- Responsive iframe -->
<div class="iframe-container">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Responsive video"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Always include a title attribute for accessibility</li>
            <li>Use appropriate sandbox restrictions for security</li>
            <li>Implement responsive design for better user experience</li>
            <li>Consider loading="lazy" for performance</li>
            <li>Provide fallback content</li>
            <li>Use HTTPS sources when possible</li>
            <li>Be mindful of same-origin policy</li>
            <li>Consider user privacy when embedding third-party content</li>
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
            <li>A responsive YouTube video embed</li>
            <li>A Google Maps embed</li>
            <li>A sandboxed iframe with specific permissions</li>
            <li>Proper fallback content</li>
            <li>Different loading strategies</li>
          </ul>
          <a 
            href="/learn/html/tables" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Tables →
          </a>
        </div>
      </section>
    </div>
  );
} 