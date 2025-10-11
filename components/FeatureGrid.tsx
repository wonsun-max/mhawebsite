// FILE: components/FeatureGrid.tsx
'use client'
import React from 'react';

type Feature = { title: string; desc: string; href?: string; icon: React.ReactNode; delay?: number };

const features: Feature[] = [
  { title: 'Admissions', desc: 'Apply & requirements for new students.', href: '/admissions', icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><path d="M12 2v20" stroke="currentColor" strokeWidth="1.5"/><path d="M4 8h16" stroke="currentColor" strokeWidth="1.5"/></svg>) },
  { title: 'Curriculum', desc: 'Our academic programs & activities.', href: '/curriculum', icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5"/></svg>) },
  { title: 'School News', desc: 'Latest announcements & gallery.', href: '/news', icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M8 12h8" stroke="currentColor" strokeWidth="1.5"/></svg>) },
];

export default function FeatureGrid() {
  return (
    <section className="py-12 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-white mb-6">Explore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <a key={f.title} href={f.href} className="group block bg-white/6 glass rounded-2xl p-6 hover:shadow-xl transform hover:-translate-y-2 transition">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white/10 text-white">{f.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                  <p className="text-sm text-white/80 mt-1">{f.desc}</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-white/70 group-hover:text-white transition">Learn more →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
