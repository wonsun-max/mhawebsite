'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function MKMissionarySection() {
  const stats = [
    { label: '설립일', value: '1994', description: '설립 30주년' },
    { label: '졸업생', value: '848', description: '초,중,고 졸업생 합산' },
    { label: '재학생', value: '100', description: '12개 학급(1학년~12학년)' },
    { label: '교직원', value: '49', description: '현지 교사 포함' },
  ]

  return (
    <section className="py-16 bg-light-gray text-navy-blue">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold mb-4">MK선교사</h2>
          <p className="text-lg max-w-3xl mx-auto">
            선교사 자녀들을 교육하고 세워가는 MK선교사
          </p>
          <Link href="/mk-missionary" className="mt-4 inline-block text-blue-600 hover:underline">
            MORE
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <p className="text-5xl font-bold text-navy-blue mb-2">{stat.value}</p>
              <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
              <p className="text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
