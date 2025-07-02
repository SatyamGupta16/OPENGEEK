
export default function HTMLFormBasicsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Form Elements</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Introduction to Forms</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML forms are used to collect user input and send it to a server for processing.
          Forms are essential for creating interactive web applications and gathering user data.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Basic Form Structure</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Basic form -->
<form action="/submit" method="post">
  <label for="username">Username:</label>
  <input type="text" 
         id="username" 
         name="username">
  
  <label for="password">Password:</label>
  <input type="password" 
         id="password" 
         name="password">
  
  <button type="submit">Submit</button>
</form>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Form Attributes</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Common Form Attributes</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Form with attributes -->
<form 
  action="/submit"
  method="post"
  enctype="multipart/form-data"
  autocomplete="on"
  novalidate
  target="_blank">
  
  <!-- Form content -->
</form>

<!-- Form attributes explained -->
action    - URL where form data is sent
method    - HTTP method (get/post)
enctype   - How form data is encoded
autocomplete - Browser autocomplete
novalidate   - Disable validation
target    - Where to display response`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Basic Form Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Text Inputs</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Text input types -->
<input type="text" 
       placeholder="Enter text">

<input type="password" 
       placeholder="Enter password">

<input type="email" 
       placeholder="Enter email">

<input type="tel" 
       placeholder="Enter phone">

<input type="number" 
       min="0" max="100">

<textarea rows="4" cols="50">
  Enter long text...
</textarea>`}
              </code>
            </pre>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Selection Elements</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Checkbox -->
<input type="checkbox" 
       id="agree" 
       name="agree">
<label for="agree">
  I agree to terms
</label>

<!-- Radio buttons -->
<input type="radio" 
       id="male" 
       name="gender" 
       value="male">
<label for="male">Male</label>

<input type="radio" 
       id="female" 
       name="gender" 
       value="female">
<label for="female">Female</label>

<!-- Select dropdown -->
<select name="country">
  <option value="">Select...</option>
  <option value="us">USA</option>
  <option value="uk">UK</option>
</select>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Form Organization</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Grouping Elements</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Fieldset and Legend -->
<form>
  <fieldset>
    <legend>Personal Information</legend>
    
    <div>
      <label for="name">Name:</label>
      <input type="text" 
             id="name" 
             name="name">
    </div>
    
    <div>
      <label for="email">Email:</label>
      <input type="email" 
             id="email" 
             name="email">
    </div>
  </fieldset>
  
  <fieldset>
    <legend>Preferences</legend>
    
    <div>
      <input type="checkbox" 
             id="newsletter" 
             name="newsletter">
      <label for="newsletter">
        Subscribe to newsletter
      </label>
    </div>
  </fieldset>
</form>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Form Buttons</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Button Types</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Submit button -->
<button type="submit">
  Submit Form
</button>

<!-- Reset button -->
<button type="reset">
  Clear Form
</button>

<!-- Regular button -->
<button type="button">
  Click Me
</button>

<!-- Input buttons -->
<input type="submit" 
       value="Submit">
<input type="reset" 
       value="Reset">
<input type="button" 
       value="Click Me">`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Form Layout</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Responsive Form Layout</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- CSS for form layout -->
<style>
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

@media (min-width: 768px) {
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}
</style>

<!-- Responsive form -->
<form class="form-grid">
  <div class="form-group">
    <label class="form-label" 
           for="firstname">
      First Name:
    </label>
    <input class="form-control"
           type="text" 
           id="firstname" 
           name="firstname">
  </div>
  
  <div class="form-group">
    <label class="form-label" 
           for="lastname">
      Last Name:
    </label>
    <input class="form-control"
           type="text" 
           id="lastname" 
           name="lastname">
  </div>
</form>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Always use labels with form controls</li>
            <li>Group related fields with fieldset</li>
            <li>Use appropriate input types</li>
            <li>Implement proper form validation</li>
            <li>Make forms keyboard accessible</li>
            <li>Provide clear error messages</li>
            <li>Use autocomplete when appropriate</li>
            <li>Implement responsive design</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create a registration form that includes:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Personal information fields</li>
            <li>Different input types</li>
            <li>Form validation</li>
            <li>Proper grouping</li>
            <li>Responsive layout</li>
          </ul>
          <a 
            href="/learn/html/input-types" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Input Types →
          </a>
        </div>
      </section>
    </div>
  );
} 