
export default function HTMLPerformancePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Performance Optimization</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Resource Loading</h2>
        <p className="text-[#c9d1d9] mb-4">
          Optimizing resource loading is crucial for improving page load times and
          overall performance. This includes proper handling of scripts, styles,
          images, and other assets.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Script Loading</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Async Scripts -->
<script src="analytics.js" 
        async></script>

<!-- Deferred Scripts -->
<script src="non-critical.js" 
        defer></script>

<!-- Module Scripts -->
<script type="module" 
        src="module.js"></script>

<!-- Inline Critical JS -->
<script>
  // Critical initialization code
  document.documentElement.classList.remove('no-js');
</script>

<!-- Resource Hints -->
<link rel="preload" 
      href="critical.js" 
      as="script">
<link rel="preconnect" 
      href="https://api.example.com">
<link rel="dns-prefetch" 
      href="https://cdn.example.com">
<link rel="prefetch" 
      href="next-page.html">
<link rel="prerender" 
      href="likely-next-page.html">`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">CSS Optimization</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">CSS Loading Strategies</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Critical CSS -->
<style>
  /* Critical styles here */
  .header { /* ... */ }
  .hero { /* ... */ }
</style>

<!-- Non-Critical CSS -->
<link rel="stylesheet" 
      href="non-critical.css"
      media="print" 
      onload="this.media='all'">

<!-- Conditional CSS -->
<link rel="stylesheet" 
      href="mobile.css"
      media="(max-width: 600px)">
<link rel="stylesheet" 
      href="desktop.css"
      media="(min-width: 601px)">

<!-- Preload Fonts -->
<link rel="preload"
      href="font.woff2"
      as="font"
      type="font/woff2"
      crossorigin>

<!-- Font Display -->
<style>
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;
}
</style>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Image Optimization</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Responsive Images</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Basic Responsive Image -->
<img src="image.jpg"
     alt="Description"
     width="800"
     height="600"
     loading="lazy">

<!-- Art Direction -->
<picture>
    <!-- Large screens -->
    <source media="(min-width: 800px)"
            srcset="large.jpg 1x, large@2x.jpg 2x"
            sizes="80vw">
    <!-- Medium screens -->
    <source media="(min-width: 400px)"
            srcset="medium.jpg 1x, medium@2x.jpg 2x"
            sizes="90vw">
    <!-- Small screens -->
    <img src="small.jpg"
         srcset="small.jpg 1x, small@2x.jpg 2x"
         sizes="100vw"
         alt="Responsive image"
         loading="lazy">
</picture>

<!-- Image Sets -->
<img src="small.jpg"
     srcset="small.jpg 300w,
             medium.jpg 600w,
             large.jpg 900w"
     sizes="(max-width: 320px) 280px,
            (max-width: 640px) 580px,
            800px"
     alt="Responsive image"
     loading="lazy">

<!-- Background Images -->
<div style="background-image: url('image.jpg')"
     role="img"
     aria-label="Description">
</div>

<!-- SVG Optimization -->
<svg width="100" 
     height="100" 
     viewBox="0 0 100 100">
    <!-- Optimized path data -->
</svg>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Content Delivery</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Lazy Loading</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Lazy Load Images -->
<img src="image.jpg"
     loading="lazy"
     alt="Lazy loaded image">

<!-- Lazy Load iframes -->
<iframe src="video-player.html"
        loading="lazy"
        title="Video player"></iframe>

<!-- Intersection Observer -->
<script>
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  },
  {
    rootMargin: '50px 0px',
    threshold: 0.01
  }
);

document.querySelectorAll('img[data-src]')
  .forEach(img => observer.observe(img));
</script>

<!-- Dynamic Import -->
<button onclick="loadModule()">
  Load Feature
</button>

<script>
async function loadModule() {
  const module = await import('./feature.js');
  module.initialize();
}
</script>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">HTML Minification</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Optimization Techniques</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Before Minification -->
<div class="container">
    <h1 class="title">
        Page Title
    </h1>
    <p class="description">
        Page description goes here.
    </p>
</div>

<!-- After Minification -->
<div class="container"><h1 class="title">Page Title</h1><p class="description">Page description goes here.</p></div>

<!-- Efficient Class Names -->
<div class="c">
    <h1 class="t">Title</h1>
    <p class="d">Description</p>
</div>

<!-- CSS Class Optimization -->
<style>
.c { /* container */ }
.t { /* title */ }
.d { /* description */ }
</style>

<!-- Data Compression -->
<script>
const data = {
  t: 'Title',    // title
  d: 'Desc',     // description
  i: 1,          // id
  s: true        // status
};
</script>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Performance Metrics</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Monitoring Performance</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Performance Monitoring -->
<script>
// Core Web Vitals
const vitals = {
  getLCP() {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({
      entryTypes: ['largest-contentful-paint']
    });
  },

  getFID() {
    new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({
      type: 'first-input',
      buffered: true
    });
  },

  getCLS() {
    new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        console.log('CLS:', entry.value);
      });
    }).observe({
      entryTypes: ['layout-shift']
    });
  }
};

// Navigation Timing
const timing = performance.getEntriesByType('navigation')[0];
console.log({
  DNS: timing.domainLookupEnd - timing.domainLookupStart,
  TCP: timing.connectEnd - timing.connectStart,
  TTFB: timing.responseStart - timing.requestStart,
  DOMReady: timing.domContentLoadedEventEnd - timing.navigationStart,
  Load: timing.loadEventEnd - timing.navigationStart
});

// Resource Timing
performance.getEntriesByType('resource').forEach(resource => {
  console.log(\`\${resource.name}: \${resource.duration}ms\`);
});
</script>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Minimize HTTP requests</li>
            <li>Use appropriate script loading strategies</li>
            <li>Optimize CSS delivery</li>
            <li>Implement responsive images</li>
            <li>Enable compression</li>
            <li>Utilize browser caching</li>
            <li>Minify resources</li>
            <li>Monitor performance metrics</li>
            <li>Use lazy loading</li>
            <li>Optimize critical rendering path</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Optimize a webpage for performance:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Implement resource loading strategies</li>
            <li>Optimize images and media</li>
            <li>Apply lazy loading</li>
            <li>Monitor performance metrics</li>
            <li>Implement caching strategies</li>
          </ul>
          <a 
            href="/learn/html/patterns" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Common Patterns →
          </a>
        </div>
      </section>
    </div>
  );
} 