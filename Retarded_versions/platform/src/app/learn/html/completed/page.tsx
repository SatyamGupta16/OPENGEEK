export default function HTMLCompletedPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block p-4 rounded-full bg-green-500/10 mb-4">
          <svg 
            className="w-16 h-16 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Congratulations!
        </h1>
        <p className="text-xl text-[#c9d1d9] mb-8">
          You've completed the HTML course!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">What You've Learned</h2>
          <ul className="space-y-3 text-[#c9d1d9]">
            <li>• HTML fundamentals and document structure</li>
            <li>• Text formatting and content organization</li>
            <li>• Working with images, media, and links</li>
            <li>• Creating forms and handling user input</li>
            <li>• Semantic HTML and accessibility</li>
            <li>• Advanced HTML features and best practices</li>
          </ul>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Next Steps</h2>
          <ul className="space-y-3 text-[#c9d1d9]">
            <li>• Start the CSS course to style your HTML</li>
            <li>• Learn JavaScript for interactivity</li>
            <li>• Practice building real projects</li>
            <li>• Explore web development frameworks</li>
            <li>• Join our community discussions</li>
            <li>• Share your knowledge with others</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <a 
          href="/learn" 
          className="inline-block bg-[#1f6feb] text-white px-6 py-3 rounded-md hover:bg-[#388bfd] transition-colors"
        >
          Return to Learning Path
        </a>
        <a 
          href="/learn/css/introduction" 
          className="inline-block bg-[#238636] text-white px-6 py-3 rounded-md hover:bg-[#2ea043] transition-colors"
        >
          Start CSS Course →
        </a>
      </div>

      <div className="mt-12 p-6 bg-[#161b22] border border-[#30363d] rounded-lg text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Share Your Achievement</h2>
        <p className="text-[#c9d1d9] mb-6">
          Let others know about your accomplishment and inspire them to learn web development!
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-[#1da1f2] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
            Share on Twitter
          </button>
          <button className="bg-[#0a66c2] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
            Share on LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
} 