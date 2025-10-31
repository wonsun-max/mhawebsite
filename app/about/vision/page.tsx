'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';

export default function VisionPage() {
  return (
    <ContentPageLayout
      title="Our Vision"
      subtitle="Guiding principles for a brighter future."
      heroImageUrl="/images/vision.jpg"
      heroImageAlt="Our Vision"
    >
      <AnimatedOnView>
        <div className="glass p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-3 text-white">Our Vision</h2>
          <p className="text-white/80 mb-4">
            To be a beacon of Christian education that forms global citizens who serve with integrity and wisdom.
          </p>
          <ul className="text-white/80 space-y-2">
            <li>• Character formation rooted in faith</li>
            <li>• Academic excellence across disciplines</li>
            <li>• Global-mindedness and servant leadership</li>
          </ul>
        </div>
      </AnimatedOnView>
    </ContentPageLayout>
  );
}
