export default function HTMLStructurePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Document Structure</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Document Structure</h2>
        <p className="text-[#c9d1d9] mb-4">
          Every HTML document follows a standard structure that helps browsers understand and render the content correctly.
          Let's break down each part of an HTML document:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <pre className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 overflow-x-auto">
            <code className="text-[#c9d1d9]">
{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>
</head>
<body>
    <!-- Content goes here -->
</body>
</html>`}
            </code>
          </pre>
          
          <div className="space-y-4">
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Document Type Declaration</h3>
              <p className="text-[#c9d1d9]">
                <code className="text-[#1f6feb]">&lt;!DOCTYPE html&gt;</code> declares that this is an HTML5 document.
              </p>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">HTML Root Element</h3>
              <p className="text-[#c9d1d9]">
                <code className="text-[#1f6feb]">&lt;html&gt;</code> is the container for all other HTML elements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">The Head Section</h2>
        <p className="text-[#c9d1d9] mb-4">
          The <code className="text-[#1f6feb]">&lt;head&gt;</code> section contains metadata about the document:
        </p>
        
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <pre className="text-[#c9d1d9]">
            <code>
{`<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Page description">
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js"></script>
</head>`}
            </code>
          </pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Meta Tags</h3>
            <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
              <li>Character encoding</li>
              <li>Viewport settings</li>
              <li>SEO information</li>
              <li>Author details</li>
            </ul>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Resource Links</h3>
            <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
              <li>CSS stylesheets</li>
              <li>JavaScript files</li>
              <li>Favicon</li>
              <li>Fonts</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">The Body Section</h2>
        <p className="text-[#c9d1d9] mb-4">
          The <code className="text-[#1f6feb]">&lt;body&gt;</code> section contains the visible content of your webpage:
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <pre className="text-[#c9d1d9]">
            <code>
{`<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h2>Main Content</h2>
            <p>This is the main content area.</p>
        </article>
    </main>

    <footer>
        <p>&copy; 2024 My Website</p>
    </footer>
</body>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Document Structure</h3>
            <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
              <li>Always declare DOCTYPE</li>
              <li>Include language attribute</li>
              <li>Use proper character encoding</li>
              <li>Include viewport meta tag</li>
            </ul>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Content Organization</h3>
            <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
              <li>Use semantic elements</li>
              <li>Maintain proper hierarchy</li>
              <li>Keep code indented</li>
              <li>Add meaningful comments</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Next Steps</h2>
          <p className="text-[#c9d1d9] mb-4">
            Now that you understand the basic structure of an HTML document, let's explore text elements and formatting.
          </p>
          <a 
            href="/learn/html/text-elements" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Text Elements →
          </a>
        </div>
      </section>
    </div>
  );
} 