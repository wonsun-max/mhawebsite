'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';

export default function SupportPage() {
  return (
    <ContentPageLayout
      title="Support MHA"
      subtitle="Help us continue our mission."
      heroImageUrl="/images/campus3.jpg"
      heroImageAlt="Support MHA"
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <AnimatedOnView>
          <div className="glass p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Donation Information</h2>
            <p className="text-white/80 mb-4">
              Your generous donations help us provide the best possible education for our students. We are grateful for your support.
            </p>
            <p className="text-white/80">
              For more information on how to donate, please contact our school office.
            </p>
          </div>
        </AnimatedOnView>
      </div>
    </ContentPageLayout>
  );
}
