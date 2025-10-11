// FILE: app/curriculum/layout.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const tabs = [
  { href: '/curriculum/academic-calendar', label: 'Academic Calendar' },
  { href: '/curriculum/elementary', label: 'Elementary' },
  { href: '/curriculum/secondary', label: 'Middle / High' },
  { href: '/curriculum/activities', label: 'Extracurriculars' },
  { href: '/curriculum/honors',     label: 'Honors' },
]

export default function CurriculumLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ''

  return (
    <main className="text-white">
      <section
        className="relative h-[40vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(2,6,23,0.55), rgba(2,6,23,0.85)), url('/images/hero.jpg')",
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Curriculum</h1>
          <p className="text-white/80 mt-2">Programs, schedules and extracurricular activities</p>
        </div>
      </section>

      <nav className="bg-slate-900/60 border-t border-b border-white/4">
        <div className="max-w-6xl mx-auto flex overflow-auto">
          {tabs.map((t) => {
            const active = pathname === t.href
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`px-6 py-4 whitespace-nowrap text-sm sm:text-base ${
                  active ? 'bg-white text-slate-900 font-semibold' : 'text-white/80 hover:bg-white/6'
                }`}
              >
                {t.label}
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="min-h-[55vh] bg-slate-900/30 py-10 px-4 sm:px-8">{children}</div>
    </main>
  )
}
