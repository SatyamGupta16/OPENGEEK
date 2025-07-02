
export default function HTMLInputTypesPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Input Types</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Text Input Types</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML5 introduced several specialized text input types that provide better user experience
          and built-in validation for specific data types.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Text-Based Inputs</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Basic text input -->
<input type="text" 
       placeholder="Regular text">

<!-- Email input -->
<input type="email"
       placeholder="email@example.com">

<!-- Password input -->
<input type="password"
       placeholder="Enter password">

<!-- Search input -->
<input type="search"
       placeholder="Search...">

<!-- URL input -->
<input type="url"
       placeholder="https://example.com">

<!-- Telephone input -->
<input type="tel"
       placeholder="(123) 456-7890"
       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">

<!-- Multi-line text -->
<textarea rows="4" cols="50">
  Enter long text here...
</textarea>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Numeric Input Types</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Number-Based Inputs</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Number input -->
<input type="number"
       min="0"
       max="100"
       step="1">

<!-- Range slider -->
<input type="range"
       min="0"
       max="100"
       step="10"
       value="50">

<!-- Numeric with decimals -->
<input type="number"
       min="0"
       max="1"
       step="0.1">

<!-- Spinbutton example -->
<input type="number"
       min="1"
       max="10"
       value="1"
       aria-label="Quantity">`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Date and Time Inputs</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Date/Time Inputs</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Date input -->
<input type="date"
       min="2024-01-01"
       max="2024-12-31">

<!-- Time input -->
<input type="time">

<!-- DateTime local -->
<input type="datetime-local">

<!-- Month input -->
<input type="month">

<!-- Week input -->
<input type="week">

<!-- With min/max restrictions -->
<input type="datetime-local"
       min="2024-01-01T00:00"
       max="2024-12-31T23:59">`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Selection Inputs</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Selection-Based Inputs</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Checkbox -->
<input type="checkbox" 
       id="subscribe"
       name="subscribe"
       checked>
<label for="subscribe">
  Subscribe to newsletter
</label>

<!-- Radio buttons -->
<input type="radio"
       id="option1"
       name="options"
       value="1">
<label for="option1">Option 1</label>

<input type="radio"
       id="option2"
       name="options"
       value="2">
<label for="option2">Option 2</label>

<!-- Select dropdown -->
<select name="country">
  <option value="">Choose...</option>
  <option value="us">USA</option>
  <option value="uk">UK</option>
</select>

<!-- Multiple select -->
<select multiple name="skills">
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
</select>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">File and Color Inputs</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">File and Color Selection</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Basic file upload -->
<input type="file"
       id="file"
       name="file">

<!-- Multiple file upload -->
<input type="file"
       multiple
       accept=".jpg,.png,.pdf">

<!-- Image file upload -->
<input type="file"
       accept="image/*"
       capture="camera">

<!-- Color picker -->
<input type="color"
       value="#ff0000">

<!-- Hidden input -->
<input type="hidden"
       name="user_id"
       value="123">`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Input Attributes</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Common Input Attributes</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Input with various attributes -->
<input 
  type="text"
  name="username"
  id="username"
  value="default value"
  placeholder="Enter username"
  required
  minlength="3"
  maxlength="20"
  pattern="[A-Za-z0-9]+"
  autocomplete="username"
  spellcheck="false"
  readonly
  disabled>

<!-- Datalist for suggestions -->
<input type="text"
       list="suggestions">
<datalist id="suggestions">
  <option value="Option 1">
  <option value="Option 2">
  <option value="Option 3">
</datalist>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Use appropriate input types for data</li>
            <li>Provide clear labels and placeholders</li>
            <li>Implement proper validation</li>
            <li>Consider mobile usability</li>
            <li>Use autocomplete when appropriate</li>
            <li>Include proper error handling</li>
            <li>Ensure keyboard accessibility</li>
            <li>Test across different browsers</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create a form that includes:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>All major input types</li>
            <li>Proper validation attributes</li>
            <li>Datalist suggestions</li>
            <li>File uploads</li>
            <li>Date and time inputs</li>
          </ul>
          <a 
            href="/learn/html/form-validation" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Form Validation →
          </a>
        </div>
      </section>
    </div>
  );
} 