'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';
import { elementary } from '@/lib/curriculumData';

export default function ElementaryPage() {
  return (
    <ContentPageLayout
      title={elementary.title}
      subtitle="Foundational learning for young minds."
      heroImageUrl="/images/elementary.jpg"
      heroImageAlt="Elementary Curriculum"
    >
      <div className="max-w-6xl mx-auto text-white">
        <section className="py-8">
          <AnimatedOnView>
            <div className="glass p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-2">Educational Goals</h2>
              <ul className="list-disc list-inside text-white/80">
                {elementary.goals.map((g, i) => (
                  <li key={i}>{g.description}</li>
                ))}
              </ul>
            </div>
          </AnimatedOnView>

          <AnimatedOnView>
            <div className="grid md:grid-cols-2 gap-6">
              {elementary.operationPlans.map((op) => (
                <div key={op.name} className="glass p-4 rounded-lg">
                  <h3 className="font-semibold">{op.name}</h3>
                  <p className="text-white/80 text-sm mt-1">{op.items[0]}</p>
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
      </div>
    </ContentPageLayout>
  );
}
