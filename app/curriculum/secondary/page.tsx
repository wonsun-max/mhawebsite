// FILE: app/curriculum/secondary/page.tsx
"use client"
import AnimatedOnView from '../../../components/AnimatedOnView'
import { secondary } from '../../../lib/curriculumData'


const metadata = { title: 'Middle & High Curriculum — MHA' }

export default function SecondaryPage() {
  return (
    <main className="max-w-6xl mx-auto text-white py-8">
      <AnimatedOnView>
        <h1 className="text-3xl font-bold mb-3">{secondary.title}</h1>
      </AnimatedOnView>

      <AnimatedOnView>
        <div className="glass p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Educational Goals</h2>
          <ul className="list-disc list-inside text-white/80">
            {secondary.goals.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </div>
      </AnimatedOnView>

      <AnimatedOnView>
        <div className="grid md:grid-cols-3 gap-6">
          {secondary.operationPlans.map((op) => (
            <div key={op.name} className="glass p-4 rounded-lg">
              <h3 className="font-semibold">{op.name}</h3>
              <p className="text-white/80 text-sm mt-1">{op.summary}</p>
            </div>
          ))}
        </div>
      </AnimatedOnView>

      <AnimatedOnView>
        <section className="mt-8 glass p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Daily Schedule Example</h3>
          <ul className="text-white/80">
            {secondary.dailyScheduleExample.map((row) => (
              <li key={row.period} className="mb-1">
                <strong>Period {row.period}</strong> — {row.time} ({row.subject})
              </li>
            ))}
          </ul>
        </section>
      </AnimatedOnView>
    </main>
  )
}
