'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';

export default function SecondaryAdmissionsPage() {
  return (
    <ContentPageLayout
      title="Secondary Admissions"
      subtitle="Continue your educational journey with us."
      heroImageUrl="/images/admission-secondary.jpg"
      heroImageAlt="Secondary Admissions"
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <AnimatedOnView>
          <div className="glass p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Application Process</h2>
            <p className="text-white/80 mb-4">
              Our secondary school admissions process is designed to identify students who will thrive in our academic environment. Please follow the steps below to apply.
            </p>
            <ol className="list-decimal list-inside text-white/80">
              <li>Submit the online application form and required documents.</li>
              <li>Participate in an entrance exam and interview.</li>
              <li>Receive admission decision.</li>
            </ol>
          </div>
        </AnimatedOnView>
      </div>
    </ContentPageLayout>
  );
}
