'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';

export default function MKMissionaryPage() {
  return (
    <ContentPageLayout
      title="MK Missionary Support"
      subtitle="Supporting the children of missionaries."
      heroImageUrl="/images/campus3.jpg"
      heroImageAlt="MK Missionary Support"
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <AnimatedOnView>
          <div className="glass p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Our Commitment</h2>
            <p className="text-white/80 mb-4">
              We are dedicated to providing a supportive and nurturing environment for the children of missionaries (MKs). Our program is designed to help them transition and thrive.
            </p>
            <h3 className="font-semibold mt-4 mb-2">Services</h3>
            <ul className="list-disc list-inside text-white/80">
              <li>Specialized counseling and support.</li>
              <li>Cultural adaptation programs.</li>
              <li>Community building events.</li>
            </ul>
          </div>
        </AnimatedOnView>
      </div>
    </ContentPageLayout>
  );
}
