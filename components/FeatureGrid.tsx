'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const features = [
  {
    title: 'Holistic Curriculum',
    desc: 'Balanced academics with spiritual formation for every student.',
    icon: '💡',
    link: '/curriculum', // link to curriculum page
  },
  {
    title: 'Boarding & Care',
    desc: 'Safe dormitory life with pastoral support and a nurturing environment.',
    icon: '🏠',
    link: '/dormitory', // link to dormitory info
  },
  {
    title: 'Active Community',
    desc: 'Clubs, sports, and mission activities that foster leadership and service.',
    icon: '📅',
    link: '/student-life', // link to community page
  },
]

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <motion.article
          key={f.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="glass rounded-2xl p-6 flex flex-col gap-4 hover:scale-[1.02] transition"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/6">
            <div className="text-sky-300 text-xl">{f.icon}</div>
          </div>
          <h3 className="text-lg font-semibold">{f.title}</h3>
          <p className="text-white/75 text-sm leading-relaxed">{f.desc}</p>
          <div className="mt-auto">
            <Link
              href={f.link}
              className="text-sky-300 text-sm hover:underline hover:text-sky-200 transition"
            >
              Learn more →
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
