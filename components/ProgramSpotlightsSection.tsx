'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'


export default function ProgramSpotlightsSection() {
  return (
    <section className="py-16 bg-navy-blue text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold mb-4">교육과정</h2>
          <p className="text-lg max-w-3xl mx-auto">
            자랑스러운 한국인, 하나님을 사랑하는 기독인, 세계를 섬기는 국제인
          </p>
          <Link href="/curriculum" className="mt-4 inline-block text-blue-400 hover:underline">
            MORE
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
