// FILE: app/about/vision-mission/page.tsx
// path: app/about/vision-mission/page.tsx
'use client'
import AnimatedOnView from '../../../components/AnimatedOnView'

export default function VisionMissionPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <AnimatedOnView>
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="glass p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-white">Our Vision</h2>
            <p className="text-white/80 mb-4">
              To be a beacon of Christian education that forms global citizens who serve with integrity and wisdom.
            </p>
            <ul className="text-white/80 space-y-2">
              <li>• Character formation rooted in faith</li>
              <li>• Academic excellence across disciplines</li>
              <li>• Global-mindedness and servant leadership</li>
            </ul>
          </div>

          <div className="glass p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-white">Our Mission</h2>
            <p className="text-white/80 mb-4">
              Provide a nurturing environment that integrates spiritual growth, rigorous academics and cultural sensitivity.
            </p>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 rounded-lg bg-white/6">• Educate the whole child</div>
              <div className="p-4 rounded-lg bg-white/6">• Support families of missionaries</div>
              <div className="p-4 rounded-lg bg-white/6">• Cultivate lifelong learners</div>
            </div>
          </div>
        </div>
      </AnimatedOnView>
    </section>
  )
}
