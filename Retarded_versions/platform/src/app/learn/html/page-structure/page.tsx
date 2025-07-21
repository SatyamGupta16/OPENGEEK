
export default function HTMLPageStructurePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Page Structure</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Basic HTML Document Structure</h2>
        <p className="text-[#c9d1d9] mb-4">
          A well-structured HTML document follows a standard layout that helps browsers understand
          and render the content correctly. The structure also improves accessibility and SEO.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Basic Document Structure</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" 
        content="width=device-width, 
                initial-scale=1.0">
  <title>Page Title</title>
  <meta name="description" 
        content="Page description">
  <link rel="stylesheet" href="styles.css">
  <script src="script.js" defer></script>
</head>
<body>
  <header>
    <nav>
      <!-- Navigation content -->
    </nav>
  </header>

  <main>
    <!-- Main content -->
  </main>

  <footer>
    <!-- Footer content -->
  </footer>
</body>
</html>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Header Section</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Header Structure</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<header>
  <!-- Logo and site title -->
  <div class="brand">
    <img src="logo.png" alt="Site Logo">
    <h1>Website Name</h1>
  </div>

  <!-- Main navigation -->
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>

  <!-- User navigation -->
  <nav aria-label="User menu">
    <ul>
      <li><a href="/profile">Profile</a></li>
      <li><a href="/settings">Settings</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>
  </nav>

  <!-- Search functionality -->
  <form role="search">
    <label for="search">Search:</label>
    <input type="search" 
           id="search" 
           name="q">
    <button type="submit">Search</button>
  </form>
</header>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Main Content Section</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Main Content Structure</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<main>
  <!-- Hero section -->
  <section class="hero">
    <h1>Welcome to Our Site</h1>
    <p>Main tagline or introduction</p>
    <a href="/get-started" 
       class="cta-button">
      Get Started
    </a>
  </section>

  <!-- Featured content -->
  <section aria-labelledby="featured">
    <h2 id="featured">Featured Content</h2>
    <div class="grid">
      <article>
        <h3>Article 1</h3>
        <p>Content...</p>
      </article>
      <article>
        <h3>Article 2</h3>
        <p>Content...</p>
      </article>
    </div>
  </section>

  <!-- Sidebar content -->
  <aside>
    <section class="related">
      <h2>Related Content</h2>
      <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
      </ul>
    </section>
  </aside>
</main>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Footer Section</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Footer Structure</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<footer>
  <!-- Site map -->
  <nav aria-label="Site map">
    <section>
      <h2>Products</h2>
      <ul>
        <li><a href="/products">All Products</a></li>
        <li><a href="/pricing">Pricing</a></li>
      </ul>
    </section>
    
    <section>
      <h2>Company</h2>
      <ul>
        <li><a href="/about">About Us</a></li>
        <li><a href="/careers">Careers</a></li>
      </ul>
    </section>
    
    <section>
      <h2>Support</h2>
      <ul>
        <li><a href="/help">Help Center</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </section>
  </nav>

  <!-- Social links -->
  <section class="social">
    <h2>Follow Us</h2>
    <ul>
      <li>
        <a href="https://twitter.com/example"
           aria-label="Twitter">
          <svg><!-- Twitter icon --></svg>
        </a>
      </li>
      <li>
        <a href="https://facebook.com/example"
           aria-label="Facebook">
          <svg><!-- Facebook icon --></svg>
        </a>
      </li>
    </ul>
  </section>

  <!-- Legal -->
  <section class="legal">
    <p>&copy; 2024 Company Name</p>
    <ul>
      <li><a href="/privacy">Privacy</a></li>
      <li><a href="/terms">Terms</a></li>
    </ul>
  </section>
</footer>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Article Structure</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Article Content Structure</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<article>
  <!-- Article header -->
  <header>
    <h1>Article Title</h1>
    <div class="meta">
      <time datetime="2024-03-20">
        March 20, 2024
      </time>
      <address class="author">
        By <a rel="author" 
              href="/authors/john">
          John Doe
        </a>
      </address>
    </div>
  </header>

  <!-- Article content -->
  <div class="content">
    <section>
      <h2>Introduction</h2>
      <p>Opening paragraph...</p>
    </section>

    <section>
      <h2>Main Points</h2>
      <p>Content...</p>
      
      <figure>
        <img src="image.jpg" 
             alt="Description">
        <figcaption>
          Image caption
        </figcaption>
      </figure>
    </section>

    <section>
      <h2>Conclusion</h2>
      <p>Closing thoughts...</p>
    </section>
  </div>

  <!-- Article footer -->
  <footer>
    <section class="tags">
      <h2>Topics</h2>
      <ul>
        <li><a href="/tag/html">HTML</a></li>
        <li><a href="/tag/css">CSS</a></li>
      </ul>
    </section>

    <section class="share">
      <h2>Share</h2>
      <ul>
        <li>
          <button aria-label="Share on Twitter">
            Tweet
          </button>
        </li>
        <li>
          <button aria-label="Share on Facebook">
            Share
          </button>
        </li>
      </ul>
    </section>
  </footer>
</article>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Use semantic elements for better structure</li>
            <li>Maintain proper heading hierarchy</li>
            <li>Include proper meta tags</li>
            <li>Ensure responsive design</li>
            <li>Add appropriate ARIA labels</li>
            <li>Optimize for SEO</li>
            <li>Consider accessibility</li>
            <li>Use meaningful class names</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create a complete webpage that includes:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Proper document structure</li>
            <li>Header with navigation</li>
            <li>Main content with sections</li>
            <li>Sidebar content</li>
            <li>Footer with site map</li>
          </ul>
          <a 
            href="/learn/html/accessibility" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Accessibility →
          </a>
        </div>
      </section>
    </div>
  );
} 