
export default function HTMLAccessibilityPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Accessibility</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Introduction to Web Accessibility</h2>
        <p className="text-[#c9d1d9] mb-4">
          Web accessibility ensures that websites and web applications are usable by people with
          disabilities. This includes visual, auditory, physical, speech, cognitive, and neurological
          disabilities.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Basic Accessibility Structure</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" 
        content="width=device-width, 
                initial-scale=1.0">
  <title>Accessible Page Title</title>
</head>
<body>
  <!-- Skip navigation -->
  <a href="#main-content" 
     class="skip-link">
    Skip to main content
  </a>

  <header role="banner">
    <nav role="navigation" 
         aria-label="Main navigation">
      <!-- Navigation content -->
    </nav>
  </header>

  <main id="main-content" 
        role="main">
    <!-- Main content -->
  </main>

  <footer role="contentinfo">
    <!-- Footer content -->
  </footer>
</body>
</html>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Semantic HTML and ARIA</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Semantic Elements with ARIA</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Navigation -->
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a href="/" 
         role="menuitem"
         aria-current="page">
        Home
      </a>
    </li>
  </ul>
</nav>

<!-- Landmarks -->
<aside aria-labelledby="sidebar-title">
  <h2 id="sidebar-title">Related Links</h2>
  <ul>
    <li><a href="#">Link 1</a></li>
  </ul>
</aside>

<!-- Interactive elements -->
<button aria-expanded="false"
        aria-controls="menu-content">
  Toggle Menu
</button>
<div id="menu-content" 
     hidden>
  <!-- Menu content -->
</div>

<!-- Custom widgets -->
<div role="tablist">
  <button role="tab"
          aria-selected="true"
          aria-controls="panel1">
    Tab 1
  </button>
  <div role="tabpanel"
       id="panel1"
       aria-labelledby="tab1">
    Panel 1 content
  </div>
</div>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Forms and Controls</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Accessible Forms</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Accessible form -->
<form aria-labelledby="form-title">
  <h2 id="form-title">Contact Form</h2>
  
  <!-- Text input -->
  <div class="form-group">
    <label for="name">Name:</label>
    <input type="text"
           id="name"
           name="name"
           required
           aria-required="true"
           aria-describedby="name-help">
    <span id="name-help" 
          class="help-text">
      Enter your full name
    </span>
  </div>
  
  <!-- Error handling -->
  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email"
           id="email"
           name="email"
           aria-invalid="true"
           aria-describedby="email-error">
    <div id="email-error" 
         role="alert"
         class="error">
      Please enter a valid email
    </div>
  </div>
  
  <!-- Fieldset for groups -->
  <fieldset>
    <legend>Preferences</legend>
    
    <div class="checkbox-group">
      <input type="checkbox"
             id="newsletter"
             name="newsletter">
      <label for="newsletter">
        Subscribe to newsletter
      </label>
    </div>
  </fieldset>
  
  <!-- Submit button -->
  <button type="submit"
          aria-busy="false">
    Submit Form
  </button>
</form>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Images and Media</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Accessible Media</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Images -->
<img src="logo.png" 
     alt="Company Logo">

<!-- Decorative images -->
<img src="decoration.png" 
     alt="" 
     role="presentation">

<!-- Complex images -->
<figure>
  <img src="chart.png"
       alt="Bar chart showing sales data">
  <figcaption>
    Monthly sales performance
  </figcaption>
</figure>

<!-- Video with captions -->
<figure>
  <video controls>
    <source src="video.mp4" 
            type="video/mp4">
    <track kind="captions"
           src="captions.vtt"
           srclang="en"
           label="English">
  </video>
  <figcaption>
    Video title and description
  </figcaption>
</figure>

<!-- Audio with transcript -->
<figure>
  <audio controls>
    <source src="audio.mp3" 
            type="audio/mpeg">
  </audio>
  <figcaption>
    <details>
      <summary>
        Audio transcript
      </summary>
      <p>Full transcript text...</p>
    </details>
  </figcaption>
</figure>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Tables and Data</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Accessible Tables</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Accessible table -->
<table aria-labelledby="table-title">
  <caption id="table-title">
    Monthly Sales Data
  </caption>
  
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Sales</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>100</td>
      <td>$1,000</td>
    </tr>
  </tbody>
  
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>300</td>
      <td>$3,000</td>
    </tr>
  </tfoot>
</table>

<!-- Complex table -->
<table aria-describedby="table-desc">
  <caption>
    <div id="table-desc">
      Quarterly sales comparison with
      previous year
    </div>
  </caption>
  
  <colgroup>
    <col>
    <col span="2" class="current">
    <col span="2" class="previous">
  </colgroup>
  
  <thead>
    <tr>
      <td></td>
      <th colspan="2" scope="colgroup">
        2024
      </th>
      <th colspan="2" scope="colgroup">
        2023
      </th>
    </tr>
    <tr>
      <th scope="col">Quarter</th>
      <th scope="col">Sales</th>
      <th scope="col">Revenue</th>
      <th scope="col">Sales</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
</table>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Dynamic Content</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Live Regions and Updates</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Live regions -->
<div role="status"
     aria-live="polite">
  <!-- Status messages -->
</div>

<div role="alert">
  <!-- Important notifications -->
</div>

<!-- Progress indicator -->
<div role="progressbar"
     aria-valuenow="75"
     aria-valuemin="0"
     aria-valuemax="100">
  75% Complete
</div>

<!-- Loading state -->
<button aria-busy="true"
        disabled>
  <span class="spinner" 
        aria-hidden="true">
  </span>
  Loading...
</button>

<!-- Expandable content -->
<button aria-expanded="false"
        aria-controls="details">
  Show Details
</button>
<div id="details" hidden>
  <!-- Content -->
</div>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Use semantic HTML elements</li>
            <li>Provide text alternatives for non-text content</li>
            <li>Ensure keyboard navigation</li>
            <li>Use ARIA attributes appropriately</li>
            <li>Maintain proper heading hierarchy</li>
            <li>Include skip navigation links</li>
            <li>Ensure sufficient color contrast</li>
            <li>Test with screen readers</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create an accessible webpage that includes:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Proper semantic structure</li>
            <li>ARIA landmarks and labels</li>
            <li>Accessible forms</li>
            <li>Media with alternatives</li>
            <li>Dynamic content updates</li>
          </ul>
          <a 
            href="/learn/html/html5-elements" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to HTML5 Elements →
          </a>
        </div>
      </section>
    </div>
  );
} 