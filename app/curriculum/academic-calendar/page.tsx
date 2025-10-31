'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import CalendarTabsWrapper from '@/components/CalendarTabs';
import { semester } from '@/lib/calendarData';

export default function AcademicCalendarPage() {
  return (
    <ContentPageLayout
      title="Academic Calendar"
      subtitle="Important dates and events for the school year."
      heroImageUrl="/images/campus4.jpg"
      heroImageAlt="Academic Calendar"
    >
      <div className="max-w-6xl mx-auto text-white">
        <section className="py-8">
          <h1 className="text-3xl font-bold mb-2">Academic Calendar (학사일정)</h1>
          <p className="text-white/80 mb-6">
            Select a semester to view events, download the calendar, or export to your calendar app.
          </p>

          <CalendarTabsWrapper semesters={semester} />
        </section>
      </div>
    </ContentPageLayout>
  );
}
