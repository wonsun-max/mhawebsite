// FILE: app/curriculum/academic-calendar/page.tsx
import CalendarTabsWrapper from '../../../components/CalendarTabs'
import { semesters } from '../../../lib/calendarData'

const metadata = {
  title: 'Academic Calendar — MHA',
  description: 'First and second semester calendars and important dates.',
}

export default function AcademicCalendarPage() {
  return (
    <main className="max-w-6xl mx-auto text-white">
      <section className="py-8">
        <h1 className="text-3xl font-bold mb-2">Academic Calendar (학사일정)</h1>
        <p className="text-white/80 mb-6">
          Select a semester to view events, download the calendar, or export to your calendar app.
        </p>

        <CalendarTabsWrapper semesters={semesters} />
      </section>    
    </main>
  )
}
