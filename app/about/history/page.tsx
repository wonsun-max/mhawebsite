'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import Timeline from '@/components/Timeline';
import { historyEvents } from '@/lib/schoolData';

export default function HistoryPage() {
  return (
    <ContentPageLayout
      title="Our History"
      subtitle="A journey of faith and education."
      heroImageUrl="/images/campus1.jpg"
      heroImageAlt="School History"
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-6">School History</h1>
        <p className="text-white/80 mb-8">A brief timeline of MHA&apos;s milestones.</p>
        <Timeline events={historyEvents} />
      </div>
    </ContentPageLayout>
  );
}
