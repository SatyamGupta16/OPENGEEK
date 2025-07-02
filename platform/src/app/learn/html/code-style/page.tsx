

export default function HTMLCodeStylePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Code Style Guide</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Document Structure</h2>
        <p className="text-[#c9d1d9] mb-4">
          A well-structured HTML document is easier to read, maintain, and debug.
          Following consistent code style practices helps ensure code quality and
          team collaboration.
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
          content="width=device-width, initial-scale=1.0">
    <meta name="description" 
          content="Page description">
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css">
    <script src="main.js" defer></script>
</head>
<body>
    <header>
        <nav>
            <!-- Navigation content -->
        </nav>
    </header>

    <main>
        <article>
            <h1>Main Heading</h1>
            <!-- Main content -->
        </article>
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
        <h2 className="text-2xl font-semibold text-white mb-4">Naming Conventions</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Element and Attribute Naming</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Use lowercase for elements and attributes -->
<section class="main-content" id="article-section">
    
    <!-- Use descriptive class names -->
    <div class="user-profile card">
        <img class="profile-avatar" 
             src="avatar.jpg" 
             alt="User profile picture">
    </div>

    <!-- Use kebab-case for multi-word names -->
    <div class="search-results-container">
        <ul class="search-results-list">
            <li class="search-result-item">
                <!-- Content -->
            </li>
        </ul>
    </div>

    <!-- Use meaningful IDs -->
    <form id="contact-form" 
          class="contact-form"
          action="/submit">
        <!-- Form fields -->
    </form>

    <!-- Use data attributes for custom data -->
    <button data-action="submit"
            data-target="form"
            class="submit-button">
        Submit
    </button>
</section>

<!-- Avoid -->
<DIV CLASS="UserProfile">
    <IMG SRC="avatar.jpg">
</DIV>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Formatting and Indentation</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Code Formatting</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Good: Consistent indentation -->
<article class="blog-post">
    <header class="post-header">
        <h1 class="post-title">Title</h1>
        <div class="post-meta">
            <time datetime="2024-03-20">
                March 20, 2024
            </time>
            <span class="author">
                By John Doe
            </span>
        </div>
    </header>
    
    <div class="post-content">
        <p>First paragraph...</p>
        <p>Second paragraph...</p>
    </div>
</article>

<!-- Good: Line breaks for readability -->
<div class="user-card"
     data-user-id="123"
     data-role="admin"
     aria-label="User information card">
    <!-- Content -->
</div>

<!-- Good: Grouped related attributes -->
<input type="email"
       name="user-email"
       id="email-input"
       class="form-input email-input"
       placeholder="Enter your email"
       required>

<!-- Bad: Inconsistent formatting -->
<div class="container"><p>Content
    </p>
        <span>More content</span>
</div>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Semantic Structure</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Using Semantic Elements</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Good: Semantic structure -->
<article class="product">
    <header>
        <h1>Product Name</h1>
        <p class="product-description">
            Description...
        </p>
    </header>

    <section class="product-details">
        <h2>Specifications</h2>
        <ul>
            <li>Spec 1</li>
            <li>Spec 2</li>
        </ul>
    </section>

    <section class="product-reviews">
        <h2>Customer Reviews</h2>
        <div class="review">
            <!-- Review content -->
        </div>
    </section>
</article>

<!-- Bad: Non-semantic structure -->
<div class="product">
    <div class="header">
        <div class="title">Product Name</div>
        <div class="description">
            Description...
        </div>
    </div>

    <div class="details">
        <div class="specs-title">
            Specifications
        </div>
        <div class="specs-list">
            <div>Spec 1</div>
            <div>Spec 2</div>
        </div>
    </div>
</div>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Attributes and Values</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Attribute Formatting</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Good: Quote attributes -->
<input type="text"
       class="form-input"
       value="Default text">

<!-- Good: Boolean attributes -->
<input type="checkbox" checked>
<button disabled>Submit</button>

<!-- Good: Order attributes consistently -->
<a href="/path"
   id="link-id"
   class="link-class"
   data-tracking="123"
   aria-label="Link description">
    Link text
</a>

<!-- Bad: Inconsistent quotes -->
<div class='container' id=main-content>
    <img src="image.jpg' alt=Image>
</div>

<!-- Good: Self-closing elements -->
<img src="image.jpg" alt="Description">
<br>
<hr>

<!-- Bad: XHTML-style closing -->
<img src="image.jpg" alt="Description" />
<br />`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Comments and Documentation</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Code Comments</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Good: Section comments -->
<!-- Header Section -->
<header class="site-header">
    <!-- Navigation -->
    <nav class="main-nav">
        <!-- Primary Menu -->
        <ul class="menu-primary">
            <!-- Menu items -->
        </ul>
    </nav>
</header>

<!-- Good: Component documentation -->
<!--
    Component: Product Card
    Description: Displays product information
    Usage: Used in product listings and search results
    Dependencies: 
    - product-card.css
    - product-card.js
-->
<article class="product-card">
    <!-- Component content -->
</article>

<!-- Good: TODO comments -->
<!-- TODO: Add accessibility attributes -->
<div class="modal">
    <!-- Modal content -->
</div>

<!-- Bad: Unnecessary comments -->
<!-- Div for container -->
<div class="container">
    <!-- Paragraph with text -->
    <p>Some text</p>
</div>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Use consistent indentation (2 or 4 spaces)</li>
            <li>Write semantic HTML</li>
            <li>Use lowercase for elements and attributes</li>
            <li>Quote attribute values</li>
            <li>Avoid inline styles</li>
            <li>Include proper meta tags</li>
            <li>Maintain proper document structure</li>
            <li>Use meaningful comments</li>
            <li>Follow accessibility guidelines</li>
            <li>Keep code DRY (Don't Repeat Yourself)</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Refactor an HTML document following these guidelines:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Proper document structure</li>
            <li>Semantic HTML elements</li>
            <li>Consistent naming conventions</li>
            <li>Clean formatting and indentation</li>
            <li>Meaningful comments</li>
          </ul>
          <a 
            href="/learn/html/seo" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to SEO Basics →
          </a>
        </div>
      </section>
    </div>
  );
} 