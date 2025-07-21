export default function HTMLIntroductionPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">What is HTML?</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Introduction to HTML</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML (HyperText Markup Language) is the standard markup language used to create and structure content on the web. 
          It serves as the backbone of any webpage, providing the basic structure and semantic meaning to the content.
        </p>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-4">
          <p className="text-[#c9d1d9]">
            <strong className="text-[#1f6feb]">Key Point:</strong> HTML is not a programming language; it's a markup language 
            that tells web browsers how to structure the content.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Basic HTML Document</h2>
        <p className="text-[#c9d1d9] mb-4">
          Here's a simple example of an HTML document structure:
        </p>
        <pre className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 overflow-x-auto mb-4">
          <code className="text-[#c9d1d9]">
{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First HTML Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>`}
          </code>
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Key Concepts</h2>
        <ul className="list-disc list-inside space-y-3 text-[#c9d1d9]">
          <li>
            <strong className="text-white">Elements:</strong> The building blocks of HTML documents, defined by tags
          </li>
          <li>
            <strong className="text-white">Tags:</strong> Used to mark up the start and end of an HTML element
          </li>
          <li>
            <strong className="text-white">Attributes:</strong> Additional values that configure elements or adjust their behavior
          </li>
          <li>
            <strong className="text-white">DOM:</strong> Document Object Model - the tree-like structure of HTML documents
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Why Learn HTML?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Foundation of Web Development</h3>
            <p className="text-[#c9d1d9]">HTML is essential for anyone interested in web development, as it provides the structure for all web content.</p>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Universal Standard</h3>
            <p className="text-[#c9d1d9]">HTML is supported by all browsers and is crucial for creating accessible and SEO-friendly websites.</p>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Career Opportunities</h3>
            <p className="text-[#c9d1d9]">Understanding HTML is a fundamental requirement for many tech careers, from web development to digital marketing.</p>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Content Creation</h3>
            <p className="text-[#c9d1d9]">HTML knowledge enables you to create and maintain web content effectively.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">HTML Versions</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[#c9d1d9]">
            <thead>
              <tr className="bg-[#161b22]">
                <th className="border border-[#30363d] p-3 text-left">Version</th>
                <th className="border border-[#30363d] p-3 text-left">Year</th>
                <th className="border border-[#30363d] p-3 text-left">Key Features</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#30363d] p-3">HTML</td>
                <td className="border border-[#30363d] p-3">1991</td>
                <td className="border border-[#30363d] p-3">Original version</td>
              </tr>
              <tr className="bg-[#161b22]">
                <td className="border border-[#30363d] p-3">HTML 4.01</td>
                <td className="border border-[#30363d] p-3">1999</td>
                <td className="border border-[#30363d] p-3">Standardized version with frames, tables</td>
              </tr>
              <tr>
                <td className="border border-[#30363d] p-3">XHTML</td>
                <td className="border border-[#30363d] p-3">2000</td>
                <td className="border border-[#30363d] p-3">More strict, XML-based version</td>
              </tr>
              <tr className="bg-[#161b22]">
                <td className="border border-[#30363d] p-3">HTML5</td>
                <td className="border border-[#30363d] p-3">2014</td>
                <td className="border border-[#30363d] p-3">Modern features, semantic elements, multimedia support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Ready to Learn More?</h2>
          <p className="text-[#c9d1d9] mb-4">
            Now that you understand what HTML is, let's dive into the basic structure and elements in the next section.
          </p>
          <a 
            href="/learn/html/structure" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Basic Structure →
          </a>
        </div>
      </section>
    </div>
  );
} 