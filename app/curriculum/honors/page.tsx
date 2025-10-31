'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';
import { honors } from '@/lib/curriculumData';

export default function HonorsPage() {
  return (
    <ContentPageLayout
      title="Honors / Student Recognition"
      subtitle="Celebrating academic excellence and character."
      heroImageUrl="/images/honors.jpg"
      heroImageAlt="Honors / Student Recognition"
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <AnimatedOnView>
          <div className="glass p-6 rounded-lg">
            <p className="text-white/80 mb-4">{honors.purpose}</p>

            <h3 className="font-semibold mb-2">Criteria</h3>
            <ul className="list-disc list-inside text-white/80">
              {honors.eligibility.map((c, i) => (<li key={i}>{c}</li>))}
            </ul>

            <h3 className="font-semibold mt-4 mb-2">Rewards / Recognition</h3>
            <ul className="list-disc list-inside text-white/80">
              {honors.selection.map((r, i) => (<li key={i}>{r}</li>))}
            </ul>
          </div>
        </AnimatedOnView>
      </div>
    </ContentPageLayout>
  );
}
