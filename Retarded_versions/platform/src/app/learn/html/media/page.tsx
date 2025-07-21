
export default function HTMLMediaPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">HTML Audio & Video</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Introduction to HTML Media</h2>
        <p className="text-[#c9d1d9] mb-4">
          HTML5 introduced native support for audio and video content through the <code className="text-[#1f6feb]">&lt;audio&gt;</code> and <code className="text-[#1f6feb]">&lt;video&gt;</code> elements,
          eliminating the need for third-party plugins like Flash.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Audio Element</h2>
        <p className="text-[#c9d1d9] mb-4">
          The audio element allows you to embed sound content in your web pages.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Basic Audio</h3>
            <pre className="text-[#c9d1d9]">
              <code>
{`<!-- Basic audio player -->
<audio controls>
  <source src="audio.mp3" 
          type="audio/mpeg">
  <source src="audio.ogg" 
          type="audio/ogg">
  Your browser does not support audio.
</audio>

<!-- Audio with attributes -->
<audio
  controls
  autoplay
  muted
  loop>
  <source src="audio.mp3" 
          type="audio/mpeg">
</audio>`}
              </code>
            </pre>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Audio Attributes</h3>
            <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
              <li><code className="text-[#1f6feb]">controls</code> - Shows player controls</li>
              <li><code className="text-[#1f6feb]">autoplay</code> - Starts playing automatically</li>
              <li><code className="text-[#1f6feb]">muted</code> - Starts muted</li>
              <li><code className="text-[#1f6feb]">loop</code> - Repeats when finished</li>
              <li><code className="text-[#1f6feb]">preload</code> - Buffering behavior</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Video Element</h2>
        <p className="text-[#c9d1d9] mb-4">
          The video element enables you to embed video content directly in your web pages.
        </p>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Video Examples</h3>
          <pre className="text-[#c9d1d9]">
            <code>
{`<!-- Basic video player -->
<video width="320" height="240" controls>
  <source src="movie.mp4" 
          type="video/mp4">
  <source src="movie.webm" 
          type="video/webm">
  Your browser does not support video.
</video>

<!-- Video with poster and attributes -->
<video
  width="320"
  height="240"
  controls
  autoplay
  muted
  loop
  poster="thumbnail.jpg">
  <source src="video.mp4" 
          type="video/mp4">
  <source src="video.webm" 
          type="video/webm">
</video>

<!-- Responsive video -->
<div style="position: relative; 
            padding-bottom: 56.25%; 
            height: 0;">
  <video
    style="position: absolute; 
           top: 0; left: 0; 
           width: 100%; height: 100%;"
    controls>
    <source src="video.mp4" 
            type="video/mp4">
  </video>
</div>`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Media Formats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Audio Formats</h3>
            <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
              <li><strong>MP3</strong> (.mp3)
                <ul className="list-inside ml-4 mt-1">
                  <li>Most widely supported</li>
                  <li>Good compression</li>
                </ul>
              </li>
              <li><strong>WAV</strong> (.wav)
                <ul className="list-inside ml-4 mt-1">
                  <li>Uncompressed audio</li>
                  <li>High quality</li>
                </ul>
              </li>
              <li><strong>OGG</strong> (.ogg)
                <ul className="list-inside ml-4 mt-1">
                  <li>Open format</li>
                  <li>Good compression</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Video Formats</h3>
            <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
              <li><strong>MP4</strong> (.mp4)
                <ul className="list-inside ml-4 mt-1">
                  <li>Most widely supported</li>
                  <li>Good compression</li>
                </ul>
              </li>
              <li><strong>WebM</strong> (.webm)
                <ul className="list-inside ml-4 mt-1">
                  <li>Open format</li>
                  <li>Excellent compression</li>
                </ul>
              </li>
              <li><strong>OGV</strong> (.ogv)
                <ul className="list-inside ml-4 mt-1">
                  <li>Open format</li>
                  <li>Alternative to WebM</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Media Attributes</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-6">
          <table className="w-full text-[#c9d1d9]">
            <thead>
              <tr className="border-b border-[#30363d]">
                <th className="text-left py-2">Attribute</th>
                <th className="text-left py-2">Description</th>
                <th className="text-left py-2">Values</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#30363d]">
                <td className="py-2"><code className="text-[#1f6feb]">controls</code></td>
                <td>Shows playback controls</td>
                <td>Boolean</td>
              </tr>
              <tr className="border-b border-[#30363d]">
                <td className="py-2"><code className="text-[#1f6feb]">autoplay</code></td>
                <td>Starts playing automatically</td>
                <td>Boolean</td>
              </tr>
              <tr className="border-b border-[#30363d]">
                <td className="py-2"><code className="text-[#1f6feb]">loop</code></td>
                <td>Repeats when finished</td>
                <td>Boolean</td>
              </tr>
              <tr className="border-b border-[#30363d]">
                <td className="py-2"><code className="text-[#1f6feb]">muted</code></td>
                <td>Sets audio output to muted</td>
                <td>Boolean</td>
              </tr>
              <tr className="border-b border-[#30363d]">
                <td className="py-2"><code className="text-[#1f6feb]">preload</code></td>
                <td>Specifies if content should be preloaded</td>
                <td>auto, metadata, none</td>
              </tr>
              <tr>
                <td className="py-2"><code className="text-[#1f6feb]">poster</code></td>
                <td>Specifies image to show before video plays</td>
                <td>URL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <ul className="list-disc list-inside text-[#c9d1d9] space-y-2">
            <li>Always provide multiple source formats for better browser compatibility</li>
            <li>Include fallback content for browsers that don't support HTML5 media</li>
            <li>Use the preload attribute appropriately to manage bandwidth</li>
            <li>Consider autoplay carefully - it can be annoying for users</li>
            <li>Always include controls unless you have a specific reason not to</li>
            <li>Optimize video files for web delivery</li>
            <li>Use responsive design techniques for videos</li>
            <li>Consider accessibility - provide transcripts or captions</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
          <h2 className="text-xl font-semibold text-white mb-2">Practice Exercise</h2>
          <p className="text-[#c9d1d9] mb-4">
            Create a webpage that demonstrates:
          </p>
          <ul className="list-disc list-inside text-[#c9d1d9] mb-4 space-y-2">
            <li>An audio player with multiple source formats</li>
            <li>A video player with a poster image</li>
            <li>A responsive video container</li>
            <li>Custom controls using JavaScript</li>
            <li>Proper fallback content</li>
          </ul>
          <a 
            href="/learn/html/iframes" 
            className="inline-block bg-[#1f6feb] text-white px-4 py-2 rounded-md hover:bg-[#388bfd] transition-colors"
          >
            Continue to iframes →
          </a>
        </div>
      </section>
    </div>
  );
} 