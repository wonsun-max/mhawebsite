'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';

export default function DormitoryQualificationPage() {
  return (
    <ContentPageLayout
      title="Dormitory Qualification"
      subtitle="Requirements for applying for student housing."
      heroImageUrl="/images/campus1.jpg"
      heroImageAlt="Dormitory Qualification"
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <AnimatedOnView>
          <div className="glass p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
            <p className="text-white/80 mb-4">
              To be eligible for our dormitory, students must meet the following criteria.
            </p>
            <ul className="list-disc list-inside text-white/80">
              <li>Be a full-time student at MHA.</li>
              <li>Have a good academic and disciplinary record.</li>
              <li>Submit a completed dormitory application form.</li>
            </ul>
          </div>
        </AnimatedOnView>
      </div>
    </ContentPageLayout>
  );
}
