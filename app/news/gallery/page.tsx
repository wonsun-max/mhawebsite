'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';
import SemesterGallery from '@/components/SemesterGallery';
import { semester } from '@/lib/calendarData';

export default function GalleryPage() {
  return (
    <ContentPageLayout
      title="School Gallery"
      subtitle="A glimpse into life at MHA."
      heroImageUrl="/images/campus4.jpg"
      heroImageAlt="School Gallery"
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <AnimatedOnView>
          <SemesterGallery semesters={semester} />
        </AnimatedOnView>
      </div>
    </ContentPageLayout>
  );
}
