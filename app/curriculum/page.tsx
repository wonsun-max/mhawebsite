// FILE: app/curriculum/page.tsx
import Link from 'next/link'

export const metadata = {
  title: 'Curriculum — MHA School',
}

export default function CurriculumIndex() {
  const items = [
    { href: '/curriculum/academic-calendar', title: 'Academic Calendar' },
    { href: '/curriculum/elementary', title: 'Elementary Curriculum' },
    { href: '/curriculum/secondary', title: 'Middle & High Curriculum' },
    { href: '/curriculum/activities', title: 'Extracurricular Activities' },
    { href: '/curriculum/honors', title: 'Honors / Student Recognition' },
  ]

  return (
    <main className="max-w-6xl mx-auto text-white">
      <section className="py-8">
        <h2 className="text-3xl font-bold mb-4">Curriculum Overview</h2>
        <p className="text-white/80 mb-6">
          Explore our academic programs, semester calendars, extracurriculars, and student honors system.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="block p-6 bg-white/6 rounded-lg hover:scale-102 transition transform duration-200"
            >
              <h3 className="font-semibold text-white text-lg">{it.title}</h3>
              <p className="text-white/70 text-sm mt-2">Click to view details</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
