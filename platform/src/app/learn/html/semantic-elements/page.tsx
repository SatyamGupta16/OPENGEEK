
export default function HTMLSemanticElementsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Semantic Elements</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Introduction to Semantic HTML</h2>
        <p className="text-[#c9d1d9] mb-4">
          Semantic HTML elements clearly describe their meaning to both the browser and the developer.
          They provide better structure, accessibility, and SEO benefits compared to non-semantic elements.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Semantic vs Non-Semantic</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Non-semantic elements -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>

<!-- Semantic elements -->
<header>
  <nav>
    <ul>
      <li>Home</li>
    </ul>
  </nav>
</header>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Document Structure Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Header and Footer</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Page header -->
<header>
  <h1>Website Title</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<!-- Page footer -->
<footer>
  <p>&copy; 2024 My Website</p>
  <nav>
    <ul>
      <li><a href="/privacy">Privacy</a></li>
      <li><a href="/terms">Terms</a></li>
    </ul>
  </nav>
</footer>`}
              </code>
            </pre>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Main and Article</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Main content -->
<main>
  <article>
    <header>
      <h1>Article Title</h1>
      <p>Published on: <time 
         datetime="2024-03-20">
         March 20, 2024
      </time></p>
    </header>
    
    <section>
      <h2>Introduction</h2>
      <p>Article content...</p>
    </section>
    
    <footer>
      <p>Author: John Doe</p>
    </footer>
  </article>
</main>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Content Sectioning</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Section and Aside</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Content sections -->
<main>
  <article>
    <section>
      <h2>Main Content</h2>
      <p>Primary content here...</p>
    </section>
    
    <aside>
      <h3>Related Content</h3>
      <ul>
        <li>Related article 1</li>
        <li>Related article 2</li>
      </ul>
    </aside>
  </article>
</main>

<!-- Navigation sections -->
<nav>
  <section>
    <h2>Main Menu</h2>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </section>
  
  <section>
    <h2>User Menu</h2>
    <ul>
      <li><a href="/profile">Profile</a></li>
      <li><a href="/settings">Settings</a></li>
    </ul>
  </section>
</nav>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Text Content Elements</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Text Semantics</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Text content elements -->
<article>
  <h1>Article Title</h1>
  
  <p>Regular paragraph text...</p>
  
  <blockquote cite="source-url">
    <p>Quoted text here...</p>
    <footer>
      <cite>Author Name</cite>
    </footer>
  </blockquote>
  
  <figure>
    <img src="image.jpg" 
         alt="Description">
    <figcaption>
      Image caption text
    </figcaption>
  </figure>
  
  <details>
    <summary>Click to expand</summary>
    <p>Detailed content here...</p>
  </details>
  
  <mark>Highlighted text</mark>
  
  <time datetime="2024-03-20">
    March 20, 2024
  </time>
</article>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Interactive Elements</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Interactive Content</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Interactive elements -->
<dialog>
  <h2>Dialog Title</h2>
  <p>Dialog content...</p>
  <button>Close</button>
</dialog>

<details>
  <summary>Expandable Section</summary>
  <p>Hidden content...</p>
</details>

<menu>
  <li><button>Copy</button></li>
  <li><button>Cut</button></li>
  <li><button>Paste</button></li>
</menu>

<form>
  <fieldset>
    <legend>Form Group</legend>
    <label for="name">Name:</label>
    <input type="text" id="name">
  </fieldset>
</form>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Embedded Content</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Media Elements</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Embedded content -->
<figure>
  <img src="image.jpg" 
       alt="Description">
  <figcaption>
    Image caption
  </figcaption>
</figure>

<figure>
  <audio controls>
    <source src="audio.mp3" 
            type="audio/mpeg">
  </audio>
  <figcaption>
    Audio caption
  </figcaption>
</figure>

<figure>
  <video controls>
    <source src="video.mp4" 
            type="video/mp4">
  </video>
  <figcaption>
    Video caption
  </figcaption>
</figure>

<picture>
  <source media="(min-width: 800px)" 
          srcset="large.jpg">
  <source media="(min-width: 400px)" 
          srcset="medium.jpg">
  <img src="small.jpg" 
       alt="Responsive image">
</picture>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Use semantic elements over generic divs and spans</li>
            <li>Ensure proper nesting of elements</li>
            <li>Include appropriate ARIA roles when needed</li>
            <li>Use headings to create a logical document outline</li>
            <li>Apply semantic elements consistently</li>
            <li>Consider accessibility implications</li>
            <li>Maintain clear content hierarchy</li>
            <li>Use semantic elements for their intended purpose</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create a webpage that includes:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Proper document structure</li>
            <li>Article with sections</li>
            <li>Navigation menus</li>
            <li>Interactive elements</li>
            <li>Embedded media with captions</li>
          </ul>
          <a 
            href="/learn/html/page-structure" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Page Structure →
          </a>
        </div>
      </section>
    </div>
  );
} 