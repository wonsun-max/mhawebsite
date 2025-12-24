'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface SemesterEvent {
  id: string
  title: string
  date: string
  description?: string
}

interface Semester {
  id: string
  name: string
  image?: string
  pdf?: string
  events: SemesterEvent[]
}

export default function CalendarTabsWrapper({
  semesters = [], // Default to empty array, expects data from parent
}: {
  semesters?: Semester[]
}) {
  const sems = semesters
  const [activeId, setActiveId] = useState(sems[0]?.id ?? null)
  const active = sems.find((s) => s.id === activeId) ?? sems[0]

  return (
    <div>
      <div className="flex gap-2 overflow-auto mb-4">
        {sems.map((s) => {
          const isActive = s.id === activeId
          return (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`px-4 py-2 rounded-md min-w-[150px] text-left transition ${isActive
                ? 'bg-white text-slate-900 font-semibold'
                : 'text-white/80 hover:bg-white/6'
                }}`}
            >
              <div className="text-sm">{s.name}</div>
              <div className="text-xs text-white/60 mt-0">
                {s.events[0]?.date ?? ''}
              </div>
            </button>
          )
        })}
      </div>

      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-2 text-white">
              {active.name}
            </h3>
            <p className="text-white/80 mb-4">
              Downloadable calendar and important dates for the semester.
            </p>

            <ul className="space-y-3">
              {active.events.map((ev) => (
                <li key={ev.id} className="bg-white/5 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-white">{ev.title}</div>
                      <div className="text-xs text-white/60">{ev.date}</div>
                      <p className="text-white/70 mt-1 text-sm">
                        {ev.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass p-4 rounded-lg">
            <div className="relative w-full h-44 mb-3 rounded overflow-hidden">
              {active.image && (
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              {active.pdf && (
                <a
                  href={active.pdf}
                  className="px-4 py-2 bg-white/10 rounded text-white/90"
                >
                  Download PDF
                </a>
              )}
              <a
                href={`data:text/calendar;charset=utf8,${encodeURIComponent(
                  generateICS(active)
                )}`}
                download={`${active.id}_calendar.ics`}
                className="px-4 py-2 bg-white/6 rounded text-white/80"
              >
                Export .ics
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// small ICS helper
function generateICS(sem: Semester) {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//MHA School//Academic Calendar//EN']
  for (const ev of sem.events) {
    const date = ev.date.replace(/-/g, '')
    lines.push('BEGIN:VEVENT')
    lines.push(`UID:${sem.id}-${ev.id}@mha-school`)
    lines.push(`DTSTAMP:${date}T000000Z`)
    lines.push(`DTSTART;VALUE=DATE:${date}`)
    lines.push(`SUMMARY:${escapeICS(ev.title)}`)
    if (ev.description) lines.push(`DESCRIPTION:${escapeICS(ev.description)}`)
    lines.push('END:VEVENT')
  }
  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}

function escapeICS(s?: string) {
  return (s ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}