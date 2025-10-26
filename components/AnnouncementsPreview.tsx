// FILE: components/AnnouncementsPreview.tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { announcements } from '@/lib/sampleData'
import AnnouncementCard from './AnnouncementCard'


export default function AnnouncementsPreview() {
  const top = announcements.slice(0, 3)
  return (
    <section className="glass p-6 rounded-2xl border border-white/6 shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Latest Announcements</h3>
        <Link href="/news" className="text-sky-300 hover:underline">View all</Link>
      </div>
      <div className="grid gap-4">
        {top.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <AnnouncementCard {...a} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
