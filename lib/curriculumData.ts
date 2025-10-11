// FILE: lib/curriculumData.ts
export const elementary = {
  title: 'Elementary Curriculum',
  goals: [
    'Fundamental literacy and numeracy',
    'Character development rooted in faith',
    'Curiosity and creativity',
  ],
  operationPlans: [
    { name: 'Language Arts', summary: 'Balanced literacy, reading comprehension, Korean & English basics' },
    { name: 'Math', summary: 'Foundational number sense, problem solving' },
    { name: 'Science & Social Studies', summary: 'Hands-on learning and local studies' },
  ],
  weeklySchedule: [
    { day: 'Mon', times: ['08:30-09:20 Math', '09:30-10:20 Korean', '10:40-11:30 PE'] },
    { day: 'Tue', times: ['08:30-09:20 English', '09:30-10:20 Math', '10:40-11:30 Art'] },
    // ... add all days
  ],
}

export const secondary = {
  title: 'Middle & High Curriculum',
  goals: [
    'Academic readiness for university',
    'Christian worldview integration',
    'Global competence and language proficiency',
  ],
  operationPlans: [
    { name: 'Core classes', summary: 'Korean, English, Math, Science with subject tracking' },
    { name: 'Electives', summary: 'Fine Arts, Tech, Languages, Service Learning' },
    { name: 'Assessment', summary: 'Formative & summative assessments, parent feedback cycles' },
  ],
  dailyScheduleExample: [
    { period: 1, time: '08:30-09:10', subject: 'Homeroom / Advisory' },
    { period: 2, time: '09:15-10:00', subject: 'Math / English block' },
    // ...
  ],
}

export const activities = [
  { id: 'a1', name: 'Music Club', desc: 'Choir and band activities' },
  { id: 'a2', name: 'Science Club', desc: 'Hands-on experiments and fairs' },
  { id: 'a3', name: 'Sports', desc: 'Football, basketball, athletics' },
]

export const honors = {
  description: 'Honors system recognizes exemplary students for academic and character excellence.',
  criteria: [
    'GPA threshold',
    'Service hours minimum',
    'Teacher recommendations',
  ],
  rewards: [
    'Honor roll certificate',
    'Scholarship / fee reduction (when applicable)',
    'Public recognition at ceremonies',
  ],
}
