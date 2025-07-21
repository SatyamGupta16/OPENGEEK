
export default function HTMLPatternsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Common HTML Patterns</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Navigation Patterns</h2>
        <p className="text-[#c9d1d9] mb-4">
          Common navigation patterns help users find their way around your website.
          These patterns should be consistent, accessible, and responsive.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Navigation Examples</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Responsive Navigation -->
<nav class="main-nav" aria-label="Main">
    <button class="menu-toggle" 
            aria-expanded="false"
            aria-controls="menu">
        <span class="sr-only">Menu</span>
        <span class="icon"></span>
    </button>
    
    <ul id="menu" class="nav-list">
        <li><a href="/" aria-current="page">Home</a></li>
        <li class="has-dropdown">
            <button aria-expanded="false">
                Products
            </button>
            <ul class="dropdown">
                <li><a href="/products/new">New</a></li>
                <li><a href="/products/featured">Featured</a></li>
            </ul>
        </li>
    </ul>
</nav>

<!-- Breadcrumb Navigation -->
<nav aria-label="Breadcrumb">
    <ol class="breadcrumb">
        <li>
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
        </li>
        <li>
            <a href="/products">Products</a>
            <span aria-hidden="true">/</span>
        </li>
        <li aria-current="page">
            Product Name
        </li>
    </ol>
</nav>

<!-- Tab Navigation -->
<div class="tabs" role="tablist">
    <button role="tab"
            aria-selected="true"
            aria-controls="panel-1"
            id="tab-1">
        Details
    </button>
    <button role="tab"
            aria-selected="false"
            aria-controls="panel-2"
            id="tab-2">
        Specifications
    </button>
</div>

<div role="tabpanel"
     id="panel-1"
     aria-labelledby="tab-1">
    <!-- Panel content -->
</div>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Form Patterns</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Common Form Patterns</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Search Form -->
<form role="search" 
      aria-label="Site search"
      class="search-form">
    <label for="search" class="sr-only">
        Search
    </label>
    <input type="search"
           id="search"
           name="q"
           placeholder="Search..."
           required>
    <button type="submit">
        <span class="sr-only">Submit search</span>
        <svg><!-- Search icon --></svg>
    </button>
</form>

<!-- Login Form -->
<form class="login-form" 
      aria-labelledby="login-title">
    <h2 id="login-title">Log In</h2>
    
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email"
               id="email"
               name="email"
               autocomplete="email"
               required>
    </div>
    
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password"
               id="password"
               name="password"
               autocomplete="current-password"
               required>
    </div>
    
    <div class="form-group">
        <label class="checkbox">
            <input type="checkbox"
                   name="remember">
            Remember me
        </label>
    </div>
    
    <button type="submit">Log In</button>
</form>

<!-- Multi-Step Form -->
<form class="multi-step-form">
    <div role="progressbar" 
         aria-valuemin="1"
         aria-valuemax="3"
         aria-valuenow="1">
        Step 1 of 3
    </div>
    
    <div class="step" 
         aria-labelledby="step-1"
         hidden>
        <h3 id="step-1">Personal Info</h3>
        <!-- Step 1 fields -->
    </div>
    
    <div class="step" 
         aria-labelledby="step-2"
         hidden>
        <h3 id="step-2">Contact Info</h3>
        <!-- Step 2 fields -->
    </div>
    
    <div class="step" 
         aria-labelledby="step-3"
         hidden>
        <h3 id="step-3">Confirmation</h3>
        <!-- Step 3 fields -->
    </div>
    
    <div class="form-nav">
        <button type="button" class="prev">
            Previous
        </button>
        <button type="button" class="next">
            Next
        </button>
        <button type="submit" class="submit" hidden>
            Submit
        </button>
    </div>
</form>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Card Patterns</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Content Cards</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Product Card -->
<article class="product-card">
    <div class="card-media">
        <img src="product.jpg"
             alt="Product name"
             loading="lazy">
        <span class="badge">New</span>
    </div>
    
    <div class="card-content">
        <h3 class="card-title">
            <a href="/product">Product Name</a>
        </h3>
        
        <p class="card-description">
            Brief product description...
        </p>
        
        <div class="card-meta">
            <span class="price">$99.99</span>
            <span class="rating">
                4.5
                <span class="sr-only">
                    out of 5 stars
                </span>
            </span>
        </div>
        
        <button class="add-to-cart"
                aria-label="Add Product Name to cart">
            Add to Cart
        </button>
    </div>
</article>

<!-- Blog Post Card -->
<article class="blog-card">
    <header class="card-header">
        <img src="post-image.jpg"
             alt=""
             aria-hidden="true"
             loading="lazy">
        <div class="card-category">Category</div>
    </header>
    
    <div class="card-body">
        <h3 class="card-title">
            <a href="/post">Post Title</a>
        </h3>
        
        <p class="card-excerpt">
            Brief excerpt of the post...
        </p>
    </div>
    
    <footer class="card-footer">
        <div class="author">
            <img src="author.jpg"
                 alt="Author name"
                 class="author-avatar">
            <span class="author-name">
                Author Name
            </span>
        </div>
        
        <time datetime="2024-03-20">
            Mar 20, 2024
        </time>
    </footer>
</article>

<!-- Profile Card -->
<article class="profile-card">
    <header class="profile-header">
        <img src="profile.jpg"
             alt="User name"
             class="profile-avatar">
        
        <h3 class="profile-name">User Name</h3>
        <p class="profile-title">Job Title</p>
    </header>
    
    <div class="profile-body">
        <div class="profile-stats">
            <div class="stat">
                <span class="stat-value">1.2k</span>
                <span class="stat-label">Followers</span>
            </div>
            <div class="stat">
                <span class="stat-value">427</span>
                <span class="stat-label">Following</span>
            </div>
        </div>
        
        <div class="profile-actions">
            <button class="follow-btn">
                Follow
            </button>
            <button class="message-btn">
                Message
            </button>
        </div>
    </div>
</article>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Modal Patterns</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Dialog Examples</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Basic Modal -->
<dialog class="modal" 
        aria-labelledby="modal-title">
    <header class="modal-header">
        <h2 id="modal-title">Modal Title</h2>
        <button class="close-btn"
                aria-label="Close modal">
            ×
        </button>
    </header>
    
    <div class="modal-body">
        <!-- Modal content -->
    </div>
    
    <footer class="modal-footer">
        <button class="cancel-btn">Cancel</button>
        <button class="confirm-btn">Confirm</button>
    </footer>
</dialog>

<!-- Alert Dialog -->
<dialog class="alert-dialog"
        role="alertdialog"
        aria-labelledby="alert-title"
        aria-describedby="alert-desc">
    <h2 id="alert-title">Warning</h2>
    
    <p id="alert-desc">
        Are you sure you want to proceed?
    </p>
    
    <div class="dialog-buttons">
        <button autofocus>Yes, proceed</button>
        <button>Cancel</button>
    </div>
</dialog>

<!-- Image Modal -->
<dialog class="image-modal"
        aria-labelledby="image-title">
    <div class="modal-content">
        <img src="large-image.jpg"
             alt="Detailed view"
             loading="lazy">
             
        <h2 id="image-title">Image Title</h2>
        <p class="image-description">
            Detailed description...
        </p>
    </div>
    
    <button class="close-btn"
            aria-label="Close image view">
        Close
    </button>
</dialog>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Loading Patterns</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Loading States</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Loading Spinner -->
<div class="loading" 
     role="status"
     aria-label="Loading content">
    <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" 
                cx="25" 
                cy="25" 
                r="20" 
                fill="none" 
                stroke-width="5">
        </circle>
    </svg>
    <span class="sr-only">Loading...</span>
</div>

<!-- Skeleton Loading -->
<div class="skeleton-card" 
     aria-hidden="true">
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
    </div>
</div>

<!-- Progress Bar -->
<div class="progress" 
     role="progressbar"
     aria-valuemin="0"
     aria-valuemax="100"
     aria-valuenow="60">
    <div class="progress-bar" 
         style="width: 60%">
        <span class="sr-only">60% Complete</span>
    </div>
</div>

<!-- Infinite Scroll Loading -->
<div class="infinite-scroll">
    <div class="content">
        <!-- Content items -->
    </div>
    
    <div class="scroll-loader"
         role="status"
         aria-live="polite">
        <span class="sr-only">
            Loading more items...
        </span>
        <div class="loader-dots">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
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
            <li>Ensure keyboard accessibility</li>
            <li>Provide proper ARIA attributes</li>
            <li>Maintain consistent structure</li>
            <li>Include loading states</li>
            <li>Handle error states</li>
            <li>Support responsive design</li>
            <li>Follow accessibility guidelines</li>
            <li>Use progressive enhancement</li>
            <li>Implement proper validation</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create a webpage that implements:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Responsive navigation</li>
            <li>Form patterns</li>
            <li>Content cards</li>
            <li>Modal dialogs</li>
            <li>Loading states</li>
          </ul>
          <a 
            href="/learn/html/introduction" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Return to Introduction →
          </a>
        </div>
      </section>
    </div>
  );
} 