'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';

export default function DormitoryRegulationsPage() {
  return (
    <ContentPageLayout
      title="Dormitory Regulations"
      subtitle="Guidelines for a safe and respectful living environment."
      heroImageUrl="/images/campus2.jpg"
      heroImageAlt="Dormitory Regulations"
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <AnimatedOnView>
          <div className="glass p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Code of Conduct</h2>
            <p className="text-white/80 mb-4">
              All dormitory residents are expected to adhere to the following regulations to ensure a positive living experience for everyone.
            </p>
            <ul className="list-disc list-inside text-white/80">
              <li>Respect for all residents and staff.</li>
              <li>Quiet hours are from 10 PM to 7 AM.</li>
              <li>No visitors after 9 PM.</li>
              <li>Keep common areas clean and tidy.</li>
            </ul>
          </div>
        </AnimatedOnView>
      </div>
    </ContentPageLayout>
  );
}
