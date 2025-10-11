// FILE: components/Timeline.tsx
// path: components/Timeline.tsx
'use client'
import React from 'react'
import AnimatedOnView from './AnimatedOnView'

const history = [
  { year: '2001', title: 'School Founded', desc: 'MHA was established with a mission to educate faith-driven leaders.' },
  { year: '2010', title: 'Campus Expansion', desc: 'Added dormitories and a science wing.' },
  { year: '2018', title: 'International Program', desc: 'Started exchange programs with partner schools.' },
  { year: '2024', title: 'Digital Learning', desc: 'Smart classrooms and AI tutoring introduced.' },
]

export default function Timeline() {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-8">History</h2>
        <div className="relative border-l border-white/10 ml-4">
          {history.map((ev, i) => (
            <AnimatedOnView key={ev.year} className="ml-6 mb-10 relative">
              <div className="absolute -left-[34px] top-2 w-5 h-5 bg-blue-500 rounded-full border-2 border-white" />
              <h3 className="text-xl font-semibold text-white">{ev.year} · {ev.title}</h3>
              <p className="text-white/80 mt-2">{ev.desc}</p>
            </AnimatedOnView>
          ))}
        </div>
      </div>
    </section>
  )
}
