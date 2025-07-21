
export default function HTMLGraphicsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML5 Graphics: Canvas & SVG</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Introduction to HTML5 Graphics</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML5 provides two powerful ways to create graphics: Canvas for bitmap graphics and
          SVG for vector graphics. Each has its own strengths and ideal use cases.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Canvas vs SVG</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Canvas element -->
<canvas id="myCanvas" 
        width="300" 
        height="200">
  Your browser doesn't support canvas
</canvas>

<!-- SVG element -->
<svg width="300" 
     height="200" 
     viewBox="0 0 300 200">
  <!-- SVG content -->
</svg>

<!-- JavaScript for Canvas -->
<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Canvas drawing code
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);
</script>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Canvas Drawing</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Basic Canvas Operations</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`// Canvas setup
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Basic shapes
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 100, 100);

ctx.strokeStyle = 'red';
ctx.strokeRect(120, 10, 100, 100);

// Paths
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(100, 150);
ctx.closePath();
ctx.fill();

// Circles
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.stroke();

// Text
ctx.font = '20px Arial';
ctx.fillText('Hello Canvas', 10, 30);

// Gradients
const gradient = ctx.createLinearGradient(
  0, 0, 200, 0
);
gradient.addColorStop(0, 'red');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;

// Images
const img = new Image();
img.onload = () => {
  ctx.drawImage(img, 0, 0);
};
img.src = 'image.png';

// Transformations
ctx.translate(100, 100);
ctx.rotate(Math.PI / 4);
ctx.scale(2, 2);

// Animation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw frame
  requestAnimationFrame(animate);
}`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">SVG Elements</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Basic SVG Shapes</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- SVG container -->
<svg width="400" 
     height="300" 
     viewBox="0 0 400 300">
  
  <!-- Rectangle -->
  <rect x="10" 
        y="10" 
        width="100" 
        height="100"
        fill="blue"
        stroke="black"
        stroke-width="2"/>
  
  <!-- Circle -->
  <circle cx="200" 
          cy="100" 
          r="50"
          fill="red"/>
  
  <!-- Ellipse -->
  <ellipse cx="300" 
           cy="100" 
           rx="60" 
           ry="40"
           fill="green"/>
  
  <!-- Line -->
  <line x1="10" 
        y1="200" 
        x2="100" 
        y2="200"
        stroke="black"
        stroke-width="2"/>
  
  <!-- Polyline -->
  <polyline points="120,200 150,250 180,200"
            fill="none"
            stroke="purple"/>
  
  <!-- Polygon -->
  <polygon points="220,200 280,250 250,180"
           fill="orange"/>
  
  <!-- Path -->
  <path d="M300,200 L350,250 L350,150 Z"
        fill="yellow"/>
  
  <!-- Text -->
  <text x="10" 
        y="280" 
        font-family="Arial"
        font-size="20">
    SVG Text
  </text>
</svg>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">SVG Styling and Animation</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Advanced SVG Features</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- SVG with styles and animations -->
<svg width="400" height="300">
  <!-- Gradients -->
  <defs>
    <linearGradient id="gradient" 
                    x1="0%" y1="0%" 
                    x2="100%" y2="0%">
      <stop offset="0%" 
            style="stop-color:rgb(255,0,0)"/>
      <stop offset="100%" 
            style="stop-color:rgb(0,0,255)"/>
    </linearGradient>
  </defs>
  
  <!-- Patterns -->
  <defs>
    <pattern id="pattern" 
             width="10" height="10"
             patternUnits="userSpaceOnUse">
      <circle cx="5" cy="5" r="2" 
              fill="red"/>
    </pattern>
  </defs>
  
  <!-- Filters -->
  <defs>
    <filter id="blur">
      <feGaussianBlur stdDeviation="2"/>
    </filter>
  </defs>
  
  <!-- Animations -->
  <circle cx="100" cy="100" r="20">
    <animate attributeName="cx"
             from="100" to="300"
             dur="3s"
             repeatCount="indefinite"/>
    <animate attributeName="fill"
             values="red;blue;green;red"
             dur="4s"
             repeatCount="indefinite"/>
  </circle>
  
  <!-- Transform -->
  <rect x="10" y="10" width="50" height="50"
        transform="rotate(45 35 35)">
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 35 35"
      to="360 35 35"
      dur="4s"
      repeatCount="indefinite"/>
  </rect>
  
  <!-- Path animation -->
  <path d="M10,100 Q90,0 170,100">
    <animate
      attributeName="d"
      values="M10,100 Q90,0 170,100;
              M10,100 Q90,200 170,100;
              M10,100 Q90,0 170,100"
      dur="3s"
      repeatCount="indefinite"/>
  </path>
</svg>

<!-- CSS styling -->
<style>
.svg-element {
  fill: url(#gradient);
  stroke: #000;
  filter: url(#blur);
  transition: all 0.3s;
}

.svg-element:hover {
  transform: scale(1.1);
}
</style>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Interactive Graphics</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Event Handling</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Canvas interaction -->
<canvas id="interactiveCanvas"></canvas>

<script>
const canvas = document.getElementById(
  'interactiveCanvas'
);
const ctx = canvas.getContext('2d');

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  ctx.clearRect(
    0, 0, canvas.width, canvas.height
  );
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
});

// SVG interaction
const svg = document.querySelector('svg');
const circle = document.querySelector('circle');

circle.addEventListener('click', (e) => {
  circle.style.fill = 
    circle.style.fill === 'red' ? 'blue' : 'red';
});

svg.addEventListener('mousemove', (e) => {
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  
  const svgCoords = pt.matrixTransform(
    svg.getScreenCTM().inverse()
  );
  
  circle.setAttribute('cx', svgCoords.x);
  circle.setAttribute('cy', svgCoords.y);
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
            <li>Choose appropriate technology (Canvas vs SVG)</li>
            <li>Optimize performance</li>
            <li>Handle browser compatibility</li>
            <li>Implement responsive design</li>
            <li>Consider accessibility</li>
            <li>Use appropriate event handling</li>
            <li>Implement proper error handling</li>
            <li>Optimize animations</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create interactive graphics that include:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Canvas drawing and animation</li>
            <li>SVG shapes and transformations</li>
            <li>User interaction handling</li>
            <li>Animations and transitions</li>
            <li>Responsive behavior</li>
          </ul>
          <a 
            href="/learn/html/storage" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Web Storage →
          </a>
        </div>
      </section>
    </div>
  );
} 