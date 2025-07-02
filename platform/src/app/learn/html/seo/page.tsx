
export default function HTMLSEOPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML SEO Basics</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Meta Tags and Document Structure</h2>
        <p className="text-[#c9d1d9] mb-4">
          Proper HTML structure and meta tags are crucial for search engine optimization.
          They help search engines understand your content and improve your site's visibility.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Essential Meta Tags</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Character Encoding -->
    <meta charset="UTF-8">
    
    <!-- Viewport for Responsive Design -->
    <meta name="viewport" 
          content="width=device-width, initial-scale=1.0">
    
    <!-- Page Title -->
    <title>Page Title - Brand Name | Keywords</title>
    
    <!-- Meta Description -->
    <meta name="description" 
          content="A clear, concise description of the page content (150-160 characters)">
    
    <!-- Keywords (less important now) -->
    <meta name="keywords" 
          content="keyword1, keyword2, keyword3">
    
    <!-- Robots Control -->
    <meta name="robots" 
          content="index, follow">
    
    <!-- Open Graph Tags -->
    <meta property="og:title" 
          content="Page Title">
    <meta property="og:description" 
          content="Page description">
    <meta property="og:image" 
          content="https://example.com/image.jpg">
    <meta property="og:url" 
          content="https://example.com/page">
    
    <!-- Twitter Cards -->
    <meta name="twitter:card" 
          content="summary_large_image">
    <meta name="twitter:site" 
          content="@username">
    <meta name="twitter:title" 
          content="Page Title">
    <meta name="twitter:description" 
          content="Page description">
    <meta name="twitter:image" 
          content="https://example.com/image.jpg">
    
    <!-- Canonical URL -->
    <link rel="canonical" 
          href="https://example.com/page">
</head>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Semantic Structure for SEO</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Content Structure</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Proper Heading Hierarchy -->
<main>
    <h1>Main Page Title</h1>
    
    <article>
        <h2>Article Title</h2>
        <p>Introduction paragraph...</p>
        
        <section>
            <h3>Section Title</h3>
            <p>Section content...</p>
            
            <h4>Subsection Title</h4>
            <p>Subsection content...</p>
        </section>
    </article>
    
    <aside>
        <h2>Related Content</h2>
        <!-- Related content -->
    </aside>
</main>

<!-- Rich Snippets with Schema.org -->
<article itemscope 
         itemtype="http://schema.org/BlogPosting">
    <h1 itemprop="headline">
        Article Title
    </h1>
    
    <meta itemprop="author" 
          content="Author Name">
    <meta itemprop="datePublished" 
          content="2024-03-20">
    
    <div itemprop="articleBody">
        <!-- Article content -->
    </div>
</article>

<!-- Image Optimization -->
<img src="image.jpg"
     alt="Descriptive alt text"
     width="800"
     height="600"
     loading="lazy">`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Navigation and Links</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">SEO-Friendly Navigation</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Breadcrumb Navigation -->
<nav aria-label="Breadcrumb">
    <ol itemscope 
        itemtype="http://schema.org/BreadcrumbList">
        <li itemprop="itemListElement" 
            itemscope
            itemtype="http://schema.org/ListItem">
            <a itemprop="item" href="/">
                <span itemprop="name">Home</span>
            </a>
            <meta itemprop="position" content="1">
        </li>
        <li itemprop="itemListElement" 
            itemscope
            itemtype="http://schema.org/ListItem">
            <a itemprop="item" href="/category">
                <span itemprop="name">Category</span>
            </a>
            <meta itemprop="position" content="2">
        </li>
    </ol>
</nav>

<!-- Site Navigation -->
<nav aria-label="Main navigation">
    <ul>
        <li><a href="/" title="Home">Home</a></li>
        <li>
            <a href="/products" 
               title="Our Products">
                Products
            </a>
        </li>
        <li>
            <a href="/services" 
               title="Our Services">
                Services
            </a>
        </li>
    </ul>
</nav>

<!-- Internal Linking -->
<article>
    <p>
        Learn more about our 
        <a href="/services/web-design"
           title="Web Design Services">
            web design services
        </a>.
    </p>
</article>

<!-- External Links -->
<a href="https://example.com"
   rel="noopener noreferrer"
   target="_blank">
    External Link
</a>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Mobile Optimization</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Mobile-First Approach</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Responsive Images -->
<picture>
    <source media="(min-width: 800px)" 
            srcset="large.jpg">
    <source media="(min-width: 400px)" 
            srcset="medium.jpg">
    <img src="small.jpg" 
         alt="Responsive image"
         loading="lazy">
</picture>

<!-- Responsive Tables -->
<div class="table-container">
    <table>
        <caption>Product Comparison</caption>
        <thead>
            <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Rating</th>
            </tr>
        </thead>
        <tbody>
            <!-- Table content -->
        </tbody>
    </table>
</div>

<!-- Mobile-Friendly Forms -->
<form action="/submit" method="post">
    <label for="name">Name:</label>
    <input type="text" 
           id="name" 
           name="name"
           autocomplete="name"
           inputmode="text">
    
    <label for="phone">Phone:</label>
    <input type="tel" 
           id="phone" 
           name="phone"
           autocomplete="tel"
           inputmode="tel"
           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
    
    <button type="submit">Submit</button>
</form>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Performance Optimization</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Resource Loading</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Resource Hints -->
<link rel="preconnect" 
      href="https://example.com">
<link rel="dns-prefetch" 
      href="https://example.com">
<link rel="preload" 
      href="critical.css" 
      as="style">
<link rel="preload" 
      href="main.js" 
      as="script">

<!-- Async/Defer Scripts -->
<script src="analytics.js" 
        async></script>
<script src="non-critical.js" 
        defer></script>

<!-- Lazy Loading -->
<img src="image.jpg"
     loading="lazy"
     alt="Lazy loaded image">

<iframe src="video-player.html"
        loading="lazy"
        title="Video player"></iframe>

<!-- Critical CSS -->
<style>
  /* Critical styles here */
</style>
<link rel="stylesheet" 
      href="non-critical.css"
      media="print" 
      onload="this.media='all'">`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Use descriptive title tags</li>
            <li>Write meaningful meta descriptions</li>
            <li>Implement proper heading hierarchy</li>
            <li>Optimize images with alt text</li>
            <li>Use semantic HTML elements</li>
            <li>Create mobile-friendly layouts</li>
            <li>Implement schema markup</li>
            <li>Optimize page load speed</li>
            <li>Use canonical URLs</li>
            <li>Create XML sitemaps</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Optimize a webpage for search engines:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Implement proper meta tags</li>
            <li>Structure content semantically</li>
            <li>Add schema markup</li>
            <li>Optimize images and resources</li>
            <li>Implement mobile-friendly design</li>
          </ul>
          <a 
            href="/learn/html/performance" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Performance →
          </a>
        </div>
      </section>
    </div>
  );
} 