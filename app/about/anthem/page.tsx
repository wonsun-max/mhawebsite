// FILE: app/about/anthem/page.tsx
// path: app/about/anthem/page.tsx
'use client'
import AnimatedOnView from '../../../components/AnimatedOnView'

export default function AnthemPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <AnimatedOnView>
        <h1 className="text-3xl font-bold text-white mb-6">School Anthem & Symbols</h1>
      </AnimatedOnView>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <AnimatedOnView>
          <div className="w-full md:w-1/3">
            <img src="/images/logo.png" alt="School emblem" className="rounded-lg shadow-lg w-56 h-56 object-contain bg-white/5 p-4" />
            <p className="text-white/80 mt-3 text-sm">School Emblem</p>
          </div>
        </AnimatedOnView>

        <AnimatedOnView>
          <div className="flex-1 glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white">The Anthem</h3>
            <p className="text-white/80 mt-2 text-sm mb-4">Play the official school anthem below. Replace the audio file at <code>/public/audio/anthem.mp3</code>.</p>

            {/* Audio player (put anthem.mp3 inside public/audio/) */}
            <audio controls className="w-full mt-2">
              <source src="/audio/anthem.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            <div className="mt-4">
              <a href="/audio/anthem.mp3" download className="inline-block px-4 py-2 bg-white text-blue-800 rounded-lg font-semibold">Download Sheet / MP3</a>
            </div>
          </div>
        </AnimatedOnView>
      </div>
    </main>
  )
}
