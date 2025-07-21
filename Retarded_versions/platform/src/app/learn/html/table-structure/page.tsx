
export default function HTMLTableStructurePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Advanced Table Structure</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Complex Table Structures</h2>
        <p className="text-[#c9d1d9] mb-4">
          Complex tables often require advanced structuring techniques to properly organize and present data.
          Understanding these structures is crucial for creating accessible and well-organized tables.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Column Groups</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Table with column groups -->
<table>
  <colgroup>
    <col style="background-color: #f0f0f0">
    <col span="2" style="background-color: #e0e0e0">
    <col style="background-color: #d0d0d0">
  </colgroup>
  <tr>
    <th>Category</th>
    <th>Q1</th>
    <th>Q2</th>
    <th>Total</th>
  </tr>
</table>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Header Hierarchies</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Multi-level Headers</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Table with complex headers -->
<table>
  <thead>
    <tr>
      <th rowspan="2">Product</th>
      <th colspan="2">Sales</th>
      <th colspan="2">Revenue</th>
    </tr>
    <tr>
      <th>Q1</th>
      <th>Q2</th>
      <th>Q1</th>
      <th>Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Product A</td>
      <td>100</td>
      <td>150</td>
      <td>$1000</td>
      <td>$1500</td>
    </tr>
  </tbody>
</table>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Advanced Cell Relationships</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Header and Data Associations</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Complex header relationships -->
<table>
  <thead>
    <tr>
      <th id="product">Product</th>
      <th id="q1sales">Q1 Sales</th>
      <th id="q2sales">Q2 Sales</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="prodA" headers="product">
        Product A
      </th>
      <td headers="prodA q1sales">100</td>
      <td headers="prodA q2sales">150</td>
    </tr>
  </tbody>
</table>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Responsive Table Structures</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Responsive Design Patterns</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- CSS for responsive tables -->
<style>
/* Card view on mobile */
@media screen and (max-width: 600px) {
  table {
    border: 0;
  }
  
  table thead {
    display: none;
  }
  
  table tr {
    margin-bottom: 10px;
    display: block;
    border: 1px solid #ddd;
  }
  
  table td {
    display: block;
    text-align: right;
    padding-left: 50%;
    position: relative;
  }
  
  table td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-weight: bold;
    text-align: left;
  }
}
</style>

<!-- Responsive table structure -->
<table class="responsive-table">
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Stock</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Product">
        Product A
      </td>
      <td data-label="Price">
        $100
      </td>
      <td data-label="Stock">
        50
      </td>
    </tr>
  </tbody>
</table>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Semantic Table Structure</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Complete Semantic Example</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Fully semantic table -->
<table>
  <caption>
    Annual Sales Report
    <details>
      <summary>Help</summary>
      <p>This table shows annual sales data.</p>
    </details>
  </caption>
  
  <colgroup>
    <col class="product-col">
    <col class="q1-col">
    <col class="q2-col">
    <col class="q3-col">
    <col class="q4-col">
    <col class="total-col">
  </colgroup>
  
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
      <th scope="col">Q3</th>
      <th scope="col">Q4</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  
  <tbody>
    <tr>
      <th scope="row">Product A</th>
      <td>100</td>
      <td>150</td>
      <td>200</td>
      <td>250</td>
      <td>700</td>
    </tr>
  </tbody>
  
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>300</td>
      <td>450</td>
      <td>600</td>
      <td>750</td>
      <td>2100</td>
    </tr>
  </tfoot>
</table>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Advanced Accessibility</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">ARIA Enhancements</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Table with advanced ARIA -->
<div role="region" 
     aria-label="Sales Data" 
     tabindex="0">
  <table aria-describedby="table-desc">
    <caption id="table-desc">
      Quarterly Sales Report 2024
    </caption>
    <thead>
      <tr>
        <th role="columnheader" 
            aria-sort="none"
            scope="col">
          Product
        </th>
        <th role="columnheader"
            aria-sort="ascending"
            scope="col">
          Sales
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th role="rowheader" scope="row">
          Product A
        </th>
        <td role="cell">100</td>
      </tr>
    </tbody>
  </table>
</div>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Use appropriate semantic elements throughout</li>
            <li>Implement proper header scoping</li>
            <li>Include descriptive captions</li>
            <li>Use colgroup for column styling</li>
            <li>Implement responsive design patterns</li>
            <li>Add ARIA labels and roles where needed</li>
            <li>Maintain proper header-data relationships</li>
            <li>Consider mobile-first approach</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create a complex table that includes:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Multi-level headers</li>
            <li>Column groups</li>
            <li>Responsive design</li>
            <li>Advanced ARIA attributes</li>
            <li>Proper semantic structure</li>
          </ul>
          <a 
            href="/learn/html/form-basics" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Form Elements →
          </a>
        </div>
      </section>
    </div>
  );
} 