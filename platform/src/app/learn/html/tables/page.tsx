
export default function HTMLTablesPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Tables</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Introduction to Tables</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML tables allow you to organize data into rows and columns, making it easier to present structured information.
          Tables should be used for tabular data only, not for layout purposes.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Basic Table Structure</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Basic table -->
<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Table Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Basic Elements</h3>
            <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
              <li><code className="text-[#1f6feb]">&lt;table&gt;</code> - Container for the table</li>
              <li><code className="text-[#1f6feb]">&lt;tr&gt;</code> - Table row</li>
              <li><code className="text-[#1f6feb]">&lt;th&gt;</code> - Table header cell</li>
              <li><code className="text-[#1f6feb]">&lt;td&gt;</code> - Table data cell</li>
            </ul>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Structural Elements</h3>
            <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
              <li><code className="text-[#1f6feb]">&lt;thead&gt;</code> - Header section</li>
              <li><code className="text-[#1f6feb]">&lt;tbody&gt;</code> - Body section</li>
              <li><code className="text-[#1f6feb]">&lt;tfoot&gt;</code> - Footer section</li>
              <li><code className="text-[#1f6feb]">&lt;caption&gt;</code> - Table caption</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Table Attributes</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Common Table Attributes</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Table with attributes -->
<table border="1" cellspacing="0" cellpadding="10">
  <caption>Monthly Budget</caption>
  <tr>
    <th colspan="2">Income</th>
    <th rowspan="2">Expenses</th>
  </tr>
  <tr>
    <td>Salary</td>
    <td>Bonus</td>
  </tr>
</table>

<!-- Modern approach using CSS -->
<style>
  table {
    border-collapse: collapse;
    border-spacing: 0;
    padding: 10px;
  }
</style>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Cell Spanning</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Colspan and Rowspan</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Cell spanning example -->
<table>
  <tr>
    <th colspan="2">Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>First</td>
    <td>Last</td>
    <td rowspan="2">25</td>
  </tr>
  <tr>
    <td colspan="2">John Doe</td>
  </tr>
</table>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Table Styling</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Modern Table Styling</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- CSS for modern table styling -->
<style>
.modern-table {
  border-collapse: collapse;
  width: 100%;
}

.modern-table th,
.modern-table td {
  padding: 12px;
  border: 1px solid #ddd;
}

.modern-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.modern-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.modern-table tr:hover {
  background-color: #f5f5f5;
}
</style>

<!-- Table with modern styling -->
<table class="modern-table">
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Quantity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Item 1</td>
      <td>$10.00</td>
      <td>5</td>
    </tr>
  </tbody>
</table>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Accessibility Features</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Making Tables Accessible</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Accessible table -->
<table>
  <caption>Monthly Sales Report</caption>
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Sales</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Product A</th>
      <td>100</td>
    </tr>
  </tbody>
</table>

<!-- Table with ARIA labels -->
<table aria-label="Monthly Sales Data">
  <tr>
    <th id="product">Product</th>
    <td headers="product">Product A</td>
  </tr>
</table>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Use tables only for tabular data</li>
            <li>Include proper table headers</li>
            <li>Use caption for table description</li>
            <li>Implement proper scoping of headers</li>
            <li>Consider responsive design for mobile</li>
            <li>Use semantic markup (thead, tbody, tfoot)</li>
            <li>Include proper ARIA labels</li>
            <li>Style using CSS instead of HTML attributes</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create a table that demonstrates:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Proper semantic structure</li>
            <li>Column and row spanning</li>
            <li>Accessible features</li>
            <li>Modern styling</li>
            <li>Responsive design</li>
          </ul>
          <a 
            href="/learn/html/table-structure" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Table Structure →
          </a>
        </div>
      </section>
    </div>
  );
} 