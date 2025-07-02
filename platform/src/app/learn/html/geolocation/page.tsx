
export default function HTMLGeolocationPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML5 Geolocation</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Introduction to Geolocation</h2>
        <p className="text-[#c9d1d9] mb-4">
          The HTML5 Geolocation API allows you to retrieve the user's geographical
          location. This can be used to provide location-aware features in your web
          applications, such as finding nearby places or customizing content based
          on location.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Basic Usage</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`// Check if geolocation is supported
if ("geolocation" in navigator) {
  // Get current position
  navigator.geolocation.getCurrentPosition(
    // Success callback
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(\`Location: \${latitude}, \${longitude}\`);
    },
    // Error callback
    (error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          console.error("User denied permission");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Location unavailable");
          break;
        case error.TIMEOUT:
          console.error("Request timed out");
          break;
        default:
          console.error("Unknown error");
          break;
      }
    },
    // Options
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );
} else {
  console.error("Geolocation not supported");
}`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Continuous Location Tracking</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Watch Position</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`class LocationTracker {
  constructor() {
    this.watchId = null;
    this.positions = [];
  }

  // Start tracking
  startTracking() {
    if (!("geolocation" in navigator)) {
      throw new Error("Geolocation not supported");
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    this.watchId = navigator.geolocation.watchPosition(
      this.handleSuccess.bind(this),
      this.handleError.bind(this),
      options
    );
  }

  // Stop tracking
  stopTracking() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  // Handle success
  handleSuccess(position) {
    const { latitude, longitude, accuracy } = 
      position.coords;
    
    const locationData = {
      latitude,
      longitude,
      accuracy,
      timestamp: position.timestamp
    };

    this.positions.push(locationData);
    this.onLocationUpdate(locationData);
  }

  // Handle error
  handleError(error) {
    let message = "Unknown error";
    
    switch(error.code) {
      case error.PERMISSION_DENIED:
        message = "Location permission denied";
        break;
      case error.POSITION_UNAVAILABLE:
        message = "Location unavailable";
        break;
      case error.TIMEOUT:
        message = "Location request timeout";
        break;
    }

    this.onError(message);
  }

  // Calculate distance
  calculateDistance(pos1, pos2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = this.toRadians(pos1.latitude);
    const φ2 = this.toRadians(pos2.latitude);
    const Δφ = this.toRadians(
      pos2.latitude - pos1.latitude
    );
    const Δλ = this.toRadians(
      pos2.longitude - pos1.longitude
    );

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
              
    const c = 2 * Math.atan2(
      Math.sqrt(a), 
      Math.sqrt(1-a)
    );

    return R * c; // Distance in meters
  }

  // Convert degrees to radians
  toRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  // Event handlers
  onLocationUpdate(location) {
    // Override this method
  }

  onError(message) {
    // Override this method
  }
}

// Usage example
const tracker = new LocationTracker();

tracker.onLocationUpdate = (location) => {
  console.log('New location:', location);
  
  if (tracker.positions.length > 1) {
    const prev = tracker.positions[
      tracker.positions.length - 2
    ];
    const distance = tracker.calculateDistance(
      prev,
      location
    );
    console.log(\`Distance moved: \${distance}m\`);
  }
};

tracker.onError = (message) => {
  console.error('Location error:', message);
};

// Start tracking
tracker.startTracking();

// Stop tracking after 1 minute
setTimeout(() => {
  tracker.stopTracking();
}, 60000);`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Location-Based Features</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Nearby Places</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`class NearbyPlaces {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.currentLocation = null;
  }

  // Get current location
  async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve(this.currentLocation);
        },
        (error) => reject(error)
      );
    });
  }

  // Search nearby places
  async searchNearby(type, radius = 1000) {
    if (!this.currentLocation) {
      await this.getCurrentLocation();
    }

    const url = \`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=\${this.currentLocation.lat},\${this.currentLocation.lng}&radius=\${radius}&type=\${type}&key=\${this.apiKey}\`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return this.processResults(data.results);
    } catch (error) {
      console.error('Error fetching places:', error);
      throw error;
    }
  }

  // Process search results
  processResults(results) {
    return results.map(place => ({
      name: place.name,
      address: place.vicinity,
      location: place.geometry.location,
      rating: place.rating,
      distance: this.calculateDistance(
        this.currentLocation,
        place.geometry.location
      )
    }));
  }

  // Calculate distance to place
  calculateDistance(from, to) {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(to.lat - from.lat);
    const dLng = this.toRadians(to.lng - from.lng);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRadians(from.lat)) * 
      Math.cos(this.toRadians(to.lat)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
      
    const c = 2 * Math.atan2(
      Math.sqrt(a), 
      Math.sqrt(1-a)
    );
    
    return R * c; // Distance in km
  }

  toRadians(degrees) {
    return degrees * Math.PI / 180;
  }
}

// Usage example
const places = new NearbyPlaces('YOUR_API_KEY');

async function findNearbyRestaurants() {
  try {
    const restaurants = await places.searchNearby(
      'restaurant',
      1000 // 1km radius
    );
    
    restaurants.sort((a, b) => a.distance - b.distance);
    
    console.log('Nearby restaurants:');
    restaurants.forEach(restaurant => {
      console.log(\`
        \${restaurant.name}
        Distance: \${restaurant.distance.toFixed(2)}km
        Rating: \${restaurant.rating}
        Address: \${restaurant.address}
      \`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Geofencing</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Location Boundaries</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`class Geofence {
  constructor(center, radius) {
    this.center = center; // {lat, lng}
    this.radius = radius; // meters
    this.isInside = false;
    this.watchId = null;
  }

  // Start monitoring
  startMonitoring(onEnter, onExit) {
    if (!("geolocation" in navigator)) {
      throw new Error("Geolocation not supported");
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const distance = this.calculateDistance(
          this.center,
          currentPosition
        );

        const wasInside = this.isInside;
        this.isInside = distance <= this.radius;

        if (this.isInside && !wasInside) {
          onEnter(currentPosition);
        } else if (!this.isInside && wasInside) {
          onExit(currentPosition);
        }
      },
      (error) => {
        console.error('Geofence error:', error);
      },
      options
    );
  }

  // Stop monitoring
  stopMonitoring() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  // Calculate distance
  calculateDistance(point1, point2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = this.toRadians(point1.lat);
    const φ2 = this.toRadians(point2.lat);
    const Δφ = this.toRadians(point2.lat - point1.lat);
    const Δλ = this.toRadians(point2.lng - point1.lng);

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
              
    const c = 2 * Math.atan2(
      Math.sqrt(a), 
      Math.sqrt(1-a)
    );

    return R * c;
  }

  toRadians(degrees) {
    return degrees * Math.PI / 180;
  }
}

// Usage example
const fence = new Geofence(
  { lat: 40.7128, lng: -74.0060 }, // NYC
  1000 // 1km radius
);

fence.startMonitoring(
  (position) => {
    console.log('Entered geofence!', position);
    // Send notification, update UI, etc.
  },
  (position) => {
    console.log('Exited geofence!', position);
    // Send notification, update UI, etc.
  }
);`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Always check for geolocation support</li>
            <li>Handle permission denials gracefully</li>
            <li>Provide clear purpose for location requests</li>
            <li>Implement proper error handling</li>
            <li>Consider battery impact</li>
            <li>Use appropriate accuracy levels</li>
            <li>Implement timeout handling</li>
            <li>Respect user privacy</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create a location-aware application that includes:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>Current location display</li>
            <li>Distance tracking</li>
            <li>Geofencing implementation</li>
            <li>Error handling</li>
            <li>Privacy considerations</li>
          </ul>
          <a 
            href="/learn/html/code-style" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to Code Style →
          </a>
        </div>
      </section>
    </div>
  );
} 