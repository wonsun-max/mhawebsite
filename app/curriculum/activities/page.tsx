'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';
import { activities } from '@/lib/curriculumData';

export default function ActivitiesPage() {
  return (
    <ContentPageLayout
      title="Extracurricular Activities"
      subtitle="Clubs, sports, and special interest groups that enrich student life."
      heroImageUrl="/images/activities.jpg"
      heroImageAlt="Extracurricular Activities"
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <div className="grid md:grid-cols-3 gap-4">
          {activities.map((a) => (
            <AnimatedOnView key={a.id}>
              <div className="glass p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white">{a.name}</h3>
                <p className="text-white/80 mt-2">{a.desc}</p>
                <div className="mt-4">
                  <a className="text-white/90 underline" href={`/curriculum/activities#${a.id}`}>Details</a>
                </div>
              </div>
            </AnimatedOnView>
          ))}
        </div>

        <AnimatedOnView>
          <section className="mt-8 glass p-6 rounded-lg">
            <h3 className="font-semibold mb-3">How to join</h3>
            <ol className="list-decimal list-inside text-white/80">
              <li>Check the activity schedule with homeroom teacher.</li>
              <li>Fill sign-up form at the office or the portal.</li>
              <li>Attend the first meeting — membership confirmed by the advisor.</li>
            </ol>
          </section>
        </AnimatedOnView>
      </div>
    </ContentPageLayout>
  );
}
