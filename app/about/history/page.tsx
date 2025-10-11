// FILE: app/about/history/page.tsx
// path: app/about/history/page.tsx
'use client'
import Timeline from '../../../components/Timeline'

export default function HistoryPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">School History</h1>
      <p className="text-white/80 mb-8">A brief timeline of MHA's milestones.</p>
      <Timeline />
    </main>
  )
}
