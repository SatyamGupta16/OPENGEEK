
export default function HTMLImagesPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Images</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Adding Images to Web Pages</h2>
        <p className="text-[#c9d1d9] mb-4">
          Images are essential elements in web design, making content more engaging and informative. 
          The <code className="text-[#1f6feb]">&lt;img&gt;</code> element is used to embed images in HTML documents.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Basic Image Syntax</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Basic image -->
<img src="path/to/image.jpg" alt="Description">

<!-- Image with dimensions -->
<img 
  src="image.jpg"
  alt="Description"
  width="300"
  height="200"
>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Image Attributes</h2>
        <p className="text-[#c9d1d9] mb-4">
          Various attributes can be used to control how images are displayed and handled.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Essential Attributes</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Required attributes -->
<img 
  src="image.jpg"  <!-- Source URL -->
  alt="Description" <!-- Alt text -->
>

<!-- Optional attributes -->
<img 
  src="image.jpg"
  alt="Description"
  width="300"      <!-- Width in pixels -->
  height="200"     <!-- Height in pixels -->
  loading="lazy"   <!-- Lazy loading -->
>`}
              </code>
            </pre>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Additional Attributes</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Title attribute -->
<img 
  src="image.jpg"
  alt="Description"
  title="Image tooltip"
>

<!-- Srcset for responsive images -->
<img 
  src="small.jpg"
  srcset="
    small.jpg 300w,
    medium.jpg 600w,
    large.jpg 900w"
  sizes="(max-width: 600px) 300px,
         (max-width: 900px) 600px,
         900px"
  alt="Responsive image"
>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Image Formats</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Common Image Formats</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-white mb-2">Raster Formats</h4>
              <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
                <li><strong>JPEG/JPG</strong> - Photos and complex images</li>
                <li><strong>PNG</strong> - Images with transparency</li>
                <li><strong>GIF</strong> - Animations and simple graphics</li>
                <li><strong>WebP</strong> - Modern format with better compression</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-2">Vector Format</h4>
              <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
                <li><strong>SVG</strong> - Scalable Vector Graphics</li>
                <li>Perfect for logos and icons</li>
                <li>Scales without quality loss</li>
                <li>Can be styled with CSS</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Responsive Images</h2>
        <p className="text-[#c9d1d9] mb-4">
          Making images responsive ensures they look good on all devices and screen sizes.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Responsive Image Techniques</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Using srcset for different sizes -->
<img 
  src="fallback.jpg"
  srcset="
    small.jpg 300w,
    medium.jpg 600w,
    large.jpg 900w"
  sizes="(max-width: 600px) 300px,
         (max-width: 900px) 600px,
         900px"
  alt="Responsive image">

<!-- Using picture element -->
<picture>
  <source 
    media="(min-width: 800px)"
    srcset="large.jpg">
  <source 
    media="(min-width: 400px)"
    srcset="medium.jpg">
  <img 
    src="small.jpg" 
    alt="Responsive image">
</picture>

<!-- CSS responsive image -->
<img 
  src="image.jpg"
  alt="Responsive image"
  style="max-width: 100%; height: auto;">`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Image Maps</h2>
        <p className="text-[#c9d1d9] mb-4">
          Image maps allow you to create clickable areas on an image.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Image Map Example</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<img 
  src="workplace.jpg"
  alt="Workplace"
  usemap="#workmap">

<map name="workmap">
  <area 
    shape="rect"
    coords="34,44,270,350"
    alt="Computer"
    href="computer.htm">
  <area
    shape="circle"
    coords="337,300,44"
    alt="Coffee"
    href="coffee.htm">
</map>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Always include meaningful alt text for accessibility</li>
            <li>Optimize images for web use (compress and resize)</li>
            <li>Choose the appropriate image format</li>
            <li>Use responsive images for better performance</li>
            <li>Specify image dimensions to prevent layout shifts</li>
            <li>Use lazy loading for better page performance</li>
            <li>Consider using WebP with fallbacks</li>
            <li>Provide alternative text for decorative images</li>
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
            <li>Different image formats (JPG, PNG, SVG)</li>
            <li>Responsive images using srcset and sizes</li>
            <li>An image map with multiple clickable areas</li>
            <li>Proper use of alt text and other attributes</li>
            <li>Lazy loading of images</li>
          </ul>
          <a 
            href="/learn/html/media" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Audio & Video →
          </a>
        </div>
      </section>
    </div>
  );
} 