'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';

export default function ElementaryAdmissionsPage() {
  return (
    <ContentPageLayout
      title="Elementary Admissions"
      subtitle="Begin your journey with us."
      heroImageUrl="/images/admission-elementary.jpg"
      heroImageAlt="Elementary Admissions"
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <AnimatedOnView>
          <div className="glass p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Application Process</h2>
            <p className="text-white/80 mb-4">
              Our elementary school admissions process is designed to be as simple and transparent as possible. Please follow the steps below to apply.
            </p>
            <ol className="list-decimal list-inside text-white/80">
              <li>Submit the online application form.</li>
              <li>Schedule a campus tour and interview.</li>
              <li>Receive admission decision.</li>
            </ol>
          </div>
        </AnimatedOnView>
      </div>
    </ContentPageLayout>
  );
}
