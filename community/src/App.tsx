import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <Sidebar />
      <main className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-zinc-100 mb-8">Welcome to OpenGeek Community</h1>
          <div className="bg-black rounded-lg border border-zinc-800 p-6">
            <p className="text-zinc-400">
              This is where the main content will go. The navbar is fixed at the top, and the sidebar
              has a scrollable content area for navigation and channels.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
