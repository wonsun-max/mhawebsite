'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';
import { secondary } from '@/lib/curriculumData';

export default function SecondaryPage() {
  return (
    <ContentPageLayout
      title={secondary.title}
      subtitle="Preparing students for higher education and beyond."
      heroImageUrl="/images/secondary.jpg"
      heroImageAlt="Secondary Curriculum"
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <AnimatedOnView>
          <div className="glass p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Educational Goals</h2>
            <ul className="list-disc list-inside text-white/80">
              {secondary.goals.map((g, i) => (
                <li key={i}>{g.description}</li>
              ))}
            </ul>
          </div>
        </AnimatedOnView>

        <AnimatedOnView>
          <div className="grid md:grid-cols-3 gap-6">
            {secondary.operationGoals.map((op) => (
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
      </div>
    </ContentPageLayout>
  );
}
