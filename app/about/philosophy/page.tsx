// FILE: app/about/philosophy/page.tsx
// path: app/about/philosophy/page.tsx
'use client'
import AnimatedOnView from '../../../components/AnimatedOnView'

export default function PhilosophyPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <AnimatedOnView>
        <h1 className="text-3xl font-bold text-white mb-6">Educational Philosophy & Goals</h1>
      </AnimatedOnView>

      <div className="grid md:grid-cols-3 gap-6">
        <AnimatedOnView>
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white">Philosophy</h3>
            <p className="text-white/80 mt-2 text-sm">Education is formation — training intellect, heart, and faith together.</p>
          </div>
        </AnimatedOnView>

        <AnimatedOnView>
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white">Student View</h3>
            <ul className="text-white/80 mt-3 text-sm space-y-2">
              <li>• Grow in character</li>
              <li>• Develop critical thinking</li>
              <li>• Serve community</li>
            </ul>
          </div>
        </AnimatedOnView>

        <AnimatedOnView>
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white">Teacher View</h3>
            <ul className="text-white/80 mt-3 text-sm space-y-2">
              <li>• Mentor the whole child</li>
              <li>• Model faith-filled leadership</li>
              <li>• Continuous professional growth</li>
            </ul>
          </div>
        </AnimatedOnView>
      </div>

      <AnimatedOnView>
        <section className="mt-10 glass p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-3">Educational Goals</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white/6 rounded-lg">• Korean identity</div>
            <div className="p-4 bg-white/6 rounded-lg">• Christian formation</div>
            <div className="p-4 bg-white/6 rounded-lg">• Global competence</div>
          </div>
        </section>
      </AnimatedOnView>
    </main>
  )
}
