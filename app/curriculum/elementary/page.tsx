// FILE: app/curriculum/elementary/page.tsx
'use client'
import AnimatedOnView from '../../../components/AnimatedOnView'
import { elementary } from '../../../lib/curriculumData'

const metadata = { title: 'Elementary Curriculum — MHA' }

export default function ElementaryPage() {
  return (
    <main className="max-w-6xl mx-auto text-white">
      <section className="py-8">
        <AnimatedOnView>
          <h1 className="text-3xl font-bold mb-3">{elementary.title}</h1>
        </AnimatedOnView>

        <AnimatedOnView>
          <div className="glass p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Educational Goals</h2>
            <ul className="list-disc list-inside text-white/80">
              {elementary.goals.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </div>
        </AnimatedOnView>

        <AnimatedOnView>
          <div className="grid md:grid-cols-2 gap-6">
            {elementary.operationPlans.map((op) => (
              <div key={op.name} className="glass p-4 rounded-lg">
                <h3 className="font-semibold">{op.name}</h3>
                <p className="text-white/80 text-sm mt-1">{op.summary}</p>
              </div>
            ))}
          </div>
        </AnimatedOnView>

        <AnimatedOnView>
          <section className="mt-8 glass p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Sample Weekly Life Schedule</h3>
            <div className="overflow-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-white/70">
                  <tr>
                    <th className="p-2">Day</th>
                    <th className="p-2">Blocks</th>
                  </tr>
                </thead>
                <tbody>
                  {elementary.weeklySchedule.map((r) => (
                    <tr key={r.day} className="border-t border-white/6">
                      <td className="p-2 font-semibold">{r.day}</td>
                      <td className="p-2 text-white/80">
                        {r.times.map((t, idx) => (
                          <div key={idx}>{t}</div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </AnimatedOnView>
      </section>
    </main>
  )
}
