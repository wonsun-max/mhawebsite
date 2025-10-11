// FILE: lib/calendarData.ts
export type CalendarEvent = { id: string; date: string; title: string; description?: string }
export type Semester = { id: string; name: string; image: string; pdf?: string; gallery?: string[]; events: CalendarEvent[] }

export const semesters: Semester[] = [
  {
    id: 's1',
    name: '1st Semester (1학기)',
    image: '/images/semester1.jpg',
    pdf: '/files/semester1.pdf',
    gallery: ['/images/semester1.jpg', '/images/event1.jpg', '/images/campus1.jpg'],
    events: [
      { id: 's1e1', date: '2026-03-01', title: 'Semester Start', description: 'First day of classes' },
      { id: 's1e2', date: '2026-05-12', title: 'Midterm Exams', description: 'All grades' },
      { id: 's1e3', date: '2026-06-20', title: 'End of 1st Semester', description: 'Final reporting' },
    ],
  },
  {
    id: 's2',
    name: '2nd Semester (2학기)',
    image: '/images/semester2.jpg',
    pdf: '/files/semester2.pdf',
    gallery: ['/images/semester2.jpg', '/images/event2.jpg', '/images/campus2.jpg'],
    events: [
      { id: 's2e1', date: '2026-08-25', title: '2nd Semester Start', description: 'Opening ceremony' },
      { id: 's2e2', date: '2026-10-10', title: 'Sports Day', description: 'Annual school sports festival' },
      { id: 's2e3', date: '2026-12-15', title: 'Winter Break', description: 'Winter vacation begins' },
    ],
  },
]
