
export default function HTMLStoragePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML5 Web Storage</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Introduction to Web Storage</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML5 Web Storage provides two mechanisms for storing data on the client side:
          localStorage and sessionStorage. These APIs allow you to store key-value pairs
          in a way that's more powerful than cookies.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Storage Types</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`// localStorage - persistent storage
localStorage.setItem('username', 'john_doe');
const username = localStorage.getItem('username');
localStorage.removeItem('username');
localStorage.clear();

// sessionStorage - session-only storage
sessionStorage.setItem('token', 'abc123');
const token = sessionStorage.getItem('token');
sessionStorage.removeItem('token');
sessionStorage.clear();

// Storage event handling
window.addEventListener('storage', (e) => {
  console.log('Storage changed:', {
    key: e.key,
    oldValue: e.oldValue,
    newValue: e.newValue,
    url: e.url
  });
});`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Working with Complex Data</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Storing Objects and Arrays</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`// Storing objects
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    notifications: true
  }
};

// Convert to string and store
localStorage.setItem(
  'user',
  JSON.stringify(user)
);

// Retrieve and parse
const storedUser = JSON.parse(
  localStorage.getItem('user')
);

// Storing arrays
const todos = [
  { id: 1, text: 'Learn HTML', done: true },
  { id: 2, text: 'Learn CSS', done: false }
];

localStorage.setItem(
  'todos',
  JSON.stringify(todos)
);

// Update array items
const storedTodos = JSON.parse(
  localStorage.getItem('todos')
);
storedTodos.push({
  id: 3,
  text: 'Learn JavaScript',
  done: false
});
localStorage.setItem(
  'todos',
  JSON.stringify(storedTodos)
);`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Storage Wrapper Class</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Creating a Storage API</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`class StorageAPI {
  constructor(storage = localStorage) {
    this.storage = storage;
  }

  // Set item with optional expiration
  set(key, value, expiresIn = null) {
    const item = {
      value,
      timestamp: Date.now()
    };

    if (expiresIn) {
      item.expiresAt = Date.now() + expiresIn;
    }

    this.storage.setItem(
      key,
      JSON.stringify(item)
    );
  }

  // Get item and check expiration
  get(key, defaultValue = null) {
    const item = this.storage.getItem(key);
    
    if (!item) return defaultValue;

    const { value, expiresAt } = JSON.parse(item);
    
    if (expiresAt && Date.now() > expiresAt) {
      this.remove(key);
      return defaultValue;
    }

    return value;
  }

  // Remove item
  remove(key) {
    this.storage.removeItem(key);
  }

  // Clear all items
  clear() {
    this.storage.clear();
  }

  // Get all keys
  keys() {
    return Object.keys(this.storage);
  }

  // Check if key exists
  has(key) {
    return this.storage.getItem(key) !== null;
  }
}

// Usage example
const storage = new StorageAPI();

// Store with 1 hour expiration
storage.set('token', 'abc123', 3600000);

// Get value
const token = storage.get('token');

// Store object
storage.set('user', {
  name: 'John',
  role: 'admin'
});

// Check existence
if (storage.has('user')) {
  const user = storage.get('user');
}`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Storage Events and Sync</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Cross-Tab Communication</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`// Storage event handler
class StorageSync {
  constructor() {
    this.handlers = new Map();
    
    window.addEventListener(
      'storage',
      this.handleStorageEvent.bind(this)
    );
  }

  // Add event listener
  subscribe(key, callback) {
    if (!this.handlers.has(key)) {
      this.handlers.set(key, new Set());
    }
    this.handlers.get(key).add(callback);
    
    return () => {
      this.handlers.get(key).delete(callback);
    };
  }

  // Handle storage event
  handleStorageEvent(event) {
    const { key, newValue, oldValue } = event;
    
    if (this.handlers.has(key)) {
      const handlers = this.handlers.get(key);
      handlers.forEach(handler => {
        handler({
          key,
          newValue: JSON.parse(newValue),
          oldValue: JSON.parse(oldValue)
        });
      });
    }
  }

  // Broadcast change
  broadcast(key, value) {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }
}

// Usage example
const sync = new StorageSync();

// Subscribe to changes
const unsubscribe = sync.subscribe(
  'theme',
  ({ newValue }) => {
    document.body.className = newValue;
  }
);

// Broadcast change
sync.broadcast('theme', 'dark');

// Cleanup
unsubscribe();`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Storage Quotas and Limits</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Managing Storage Space</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`// Check storage quota
async function checkStorageQuota() {
  if (navigator.storage && 
      navigator.storage.estimate) {
    const quota = await navigator.storage.estimate();
    
    const percentageUsed = (
      quota.usage / quota.quota * 100
    ).toFixed(2);

    console.log(\`Storage quota: 
      \${quota.quota} bytes
      Used: \${quota.usage} bytes
      \${percentageUsed}% used\`);
      
    return quota;
  }
  
  throw new Error('Storage API not supported');
}

// Storage cleanup
class StorageManager {
  constructor(maxItems = 100) {
    this.maxItems = maxItems;
  }

  // Add item with cleanup
  addItem(key, value) {
    const items = this.getItems();
    
    // Remove oldest if at limit
    if (items.length >= this.maxItems) {
      const oldest = items[0];
      localStorage.removeItem(oldest.key);
      items.shift();
    }
    
    // Add new item
    const item = {
      key,
      value,
      timestamp: Date.now()
    };
    
    items.push(item);
    localStorage.setItem(
      'storage_items',
      JSON.stringify(items)
    );
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }

  // Get all items
  getItems() {
    const items = localStorage.getItem(
      'storage_items'
    );
    return items ? JSON.parse(items) : [];
  }

  // Clear old items
  clearOldItems(maxAge) {
    const items = this.getItems();
    const now = Date.now();
    
    const newItems = items.filter(item => {
      const age = now - item.timestamp;
      if (age > maxAge) {
        localStorage.removeItem(item.key);
        return false;
      }
      return true;
    });
    
    localStorage.setItem(
      'storage_items',
      JSON.stringify(newItems)
    );
  }
}`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Use appropriate storage type</li>
            <li>Handle storage errors</li>
            <li>Implement quota management</li>
            <li>Clear old/unused data</li>
            <li>Use storage events properly</li>
            <li>Secure sensitive data</li>
            <li>Implement fallback mechanisms</li>
            <li>Version your stored data</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create a storage management system that includes:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Data persistence layer</li>
            <li>Quota management</li>
            <li>Cross-tab synchronization</li>
            <li>Error handling</li>
            <li>Cleanup mechanisms</li>
          </ul>
          <a 
            href="/learn/html/geolocation" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Geolocation →
          </a>
        </div>
      </section>
    </div>
  );
} 