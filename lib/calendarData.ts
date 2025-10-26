// FILE: lib/calendarData.ts
export type CalendarEvent = { id: string; date: string; title: string; description?: string }
export type Semester = { id: string; name: string; image?: string; pdf?: string; gallery?: string[]; events: CalendarEvent[] }

export const semester: Semester[] = [
  {
    id: 's1',
    name: 'First Semester',
    image: '/images/semester1.jpg',
    pdf: '/files/semester1.pdf',
    gallery: ['/images/semester1.jpg', '/images/event1.jpg', '/images/campus1.jpg'],
    events: [
      { id: 's1e1', date: '2026-03-01', title: 'First Day of Classes', description: 'Official start of the academic year for all students.' },
      { id: 's1e2', date: '2026-03-15', title: 'New Student Orientation', description: 'Welcome and introduction for all new students and their families.' },
      { id: 's1e3', date: '2026-04-05', title: 'Parent-Teacher Conferences', description: 'Opportunity for parents to discuss student progress with teachers.' },
      { id: 's1e4', date: '2026-05-12', title: 'Midterm Examination Period', description: 'Mid-semester assessments for all grade levels.' },
      { id: 's1e5', date: '2026-06-01', title: 'Spring Festival Celebration', description: 'Annual school-wide cultural event with performances and activities.' },
      { id: 's1e6', date: '2026-06-20', title: 'Last Day of First Semester', description: 'End of classes and final report card distribution.' },
    ],
  },
  {
    id: 's2',
    name: 'Second Semester',
    image: '/images/semester2.jpg',
    pdf: '/files/semester2.pdf',
    gallery: ['/images/semester2.jpg', '/images/event2.jpg', '/images/campus2.jpg'],
    events: [
      { id: 's2e1', date: '2026-08-25', title: 'Second Semester Begins', description: 'Official start of the second academic semester.' },
      { id: 's2e2', date: '2026-09-10', title: 'Fall Sports Tryouts', description: 'Tryouts for various fall sports teams.' },
      { id: 's2e3', date: '2026-10-10', title: 'Annual Sports Day', description: 'A day of friendly competition and teamwork for all students.' },
      { id: 's2e4', date: '2026-11-15', title: 'Final Examination Period', description: 'End-of-semester assessments for all grade levels.' },
      { id: 's2e5', date: '2026-12-05', title: 'Winter Concert & Art Show', description: 'Showcasing student talent in music and visual arts.' },
      { id: 's2e6', date: '2026-12-15', title: 'Winter Break Commences', description: 'School closes for the winter holiday season.' },
    ],
  },
]
