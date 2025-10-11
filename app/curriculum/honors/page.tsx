// FILE: app/curriculum/honors/page.tsx
'use client'
import AnimatedOnView from '../../../components/AnimatedOnView'
import { honors } from '../../../lib/curriculumData'

const metadata = { title: 'Honors — MHA' }

export default function HonorsPage() {
  return (
    <main className="max-w-6xl mx-auto text-white py-8">
      <AnimatedOnView>
        <h1 className="text-3xl font-bold mb-3">Honors / Student Recognition</h1>
      </AnimatedOnView>

      <AnimatedOnView>
        <div className="glass p-6 rounded-lg">
          <p className="text-white/80 mb-4">{honors.description}</p>

          <h3 className="font-semibold mb-2">Criteria</h3>
          <ul className="list-disc list-inside text-white/80">
            {honors.criteria.map((c, i) => (<li key={i}>{c}</li>))}
          </ul>

          <h3 className="font-semibold mt-4 mb-2">Rewards / Recognition</h3>
          <ul className="list-disc list-inside text-white/80">
            {honors.rewards.map((r, i) => (<li key={i}>{r}</li>))}
          </ul>
        </div>
      </AnimatedOnView>
    </main>
  )
}
