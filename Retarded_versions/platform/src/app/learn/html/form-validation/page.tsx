
export default function HTMLFormValidationPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Form Validation</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Built-in HTML5 Validation</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML5 provides built-in form validation features that help ensure data is entered correctly
          before it's submitted to the server.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Required Fields</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Required attribute -->
<form>
  <label for="username">Username:</label>
  <input type="text"
         id="username"
         required>
  
  <label for="email">Email:</label>
  <input type="email"
         id="email"
         required>
  
  <button type="submit">Submit</button>
</form>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Pattern Validation</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Regular Expression Patterns</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Pattern validation -->
<form>
  <!-- Username (letters and numbers only) -->
  <input type="text"
         pattern="[A-Za-z0-9]+"
         title="Letters and numbers only">
  
  <!-- Phone number -->
  <input type="tel"
         pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
         title="Format: 123-456-7890">
  
  <!-- Password (min 8 chars, 1 number, 1 uppercase) -->
  <input type="password"
         pattern="(?=.*\\d)(?=.*[A-Z]).{8,}"
         title="Min 8 chars, 1 number, 1 uppercase">
</form>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Length Validation</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Min and Max Length</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Length constraints -->
<form>
  <!-- Username (3-20 characters) -->
  <input type="text"
         minlength="3"
         maxlength="20"
         title="3-20 characters">
  
  <!-- Bio (max 200 characters) -->
  <textarea maxlength="200"
            rows="4">
  </textarea>
  
  <!-- Password (min 8 characters) -->
  <input type="password"
         minlength="8"
         title="Minimum 8 characters">
</form>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Range Validation</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Min and Max Values</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Range validation -->
<form>
  <!-- Age (18-100) -->
  <input type="number"
         min="18"
         max="100"
         title="Age between 18-100">
  
  <!-- Price (0-1000, steps of 0.01) -->
  <input type="number"
         min="0"
         max="1000"
         step="0.01"
         title="Price between 0-1000">
  
  <!-- Date range -->
  <input type="date"
         min="2024-01-01"
         max="2024-12-31">
</form>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Custom Validation</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">JavaScript Validation</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Custom validation with JavaScript -->
<form id="myForm" novalidate>
  <input type="password" 
         id="password">
  <input type="password" 
         id="confirm">
</form>

<script>
const form = document.getElementById('myForm');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');

form.addEventListener('submit', (e) => {
  let isValid = true;
  
  // Check password match
  if (password.value !== confirm.value) {
    confirm.setCustomValidity(
      'Passwords do not match'
    );
    isValid = false;
  } else {
    confirm.setCustomValidity('');
  }
  
  if (!isValid) {
    e.preventDefault();
  }
});

// Real-time validation
confirm.addEventListener('input', () => {
  if (password.value === confirm.value) {
    confirm.setCustomValidity('');
  } else {
    confirm.setCustomValidity(
      'Passwords do not match'
    );
  }
});
</script>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Styling Validation States</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">CSS for Validation</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- CSS for validation states -->
<style>
/* Valid input */
input:valid {
  border-color: green;
  background: url('check.png') 
              no-repeat right center;
}

/* Invalid input */
input:invalid {
  border-color: red;
  background: url('error.png') 
              no-repeat right center;
}

/* Custom error message */
input:invalid + span::before {
  content: attr(data-error);
  color: red;
  font-size: 0.8em;
}

/* Required field indicator */
label.required::after {
  content: '*';
  color: red;
  margin-left: 4px;
}
</style>

<!-- Form with styled validation -->
<form>
  <div class="form-group">
    <label class="required" for="email">
      Email:
    </label>
    <input type="email" 
           id="email" 
           required>
    <span data-error="Please enter a valid email">
    </span>
  </div>
</form>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Accessibility in Form Validation</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">ARIA Validation</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Accessible form validation -->
<form>
  <div role="group" 
       aria-labelledby="personal-info">
    <h2 id="personal-info">
      Personal Information
    </h2>
    
    <label for="name">Name:</label>
    <input type="text"
           id="name"
           required
           aria-required="true"
           aria-invalid="false"
           aria-describedby="name-error">
    <div id="name-error" 
         role="alert"
         aria-live="polite">
    </div>
    
    <label for="email">Email:</label>
    <input type="email"
           id="email"
           required
           aria-required="true"
           aria-invalid="false"
           aria-describedby="email-error">
    <div id="email-error" 
         role="alert"
         aria-live="polite">
    </div>
  </div>
</form>

<script>
const nameInput = document.getElementById('name');
const nameError = document.getElementById(
  'name-error'
);

nameInput.addEventListener('input', () => {
  const isValid = nameInput.validity.valid;
  nameInput.setAttribute(
    'aria-invalid', 
    !isValid
  );
  
  if (!isValid) {
    nameError.textContent = 
      'Please enter your name';
  } else {
    nameError.textContent = '';
  }
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
            <li>Use HTML5 validation attributes when possible</li>
            <li>Provide clear error messages</li>
            <li>Validate in real-time when appropriate</li>
            <li>Include both client and server validation</li>
            <li>Make validation messages accessible</li>
            <li>Style validation states clearly</li>
            <li>Use appropriate input types</li>
            <li>Test validation across browsers</li>
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
            <li>Required fields validation</li>
            <li>Pattern matching for username/password</li>
            <li>Custom validation for password confirmation</li>
            <li>Accessible error messages</li>
            <li>Styled validation states</li>
          </ul>
          <a 
            href="/learn/html/semantic-elements" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Semantic Elements →
          </a>
        </div>
      </section>
    </div>
  );
} 