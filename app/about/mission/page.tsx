'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import { aboutSubNav } from '@/lib/subNavConfig';


export default function MissionPage() {
  return (
    <ContentPageLayout
      title="Our Mission"
      subtitle="Our commitment to the community."
      heroImageUrl="/images/mission.jpg"
      heroImageAlt="Our Mission"
      subNav={aboutSubNav}
    >
      <div className="glass p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-3 text-white">Our Mission</h2>
        <p className="text-white/80 mb-4">
          Provide a nurturing environment that integrates spiritual growth, rigorous academics and cultural sensitivity.
        </p>
        <div className="grid grid-cols-1 gap-3">
          <div className="p-4 rounded-lg bg-white/6">• Educate the whole child</div>
          <div className="p-4 rounded-lg bg-white/6">• Support families of missionaries</div>
          <div className="p-4 rounded-lg bg-white/6">• Cultivate lifelong learners</div>
        </div>
      </div>
    </ContentPageLayout>
  );
}
