'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'


export default function FinalCTASection() {
  return (
    <section className="py-16 bg-light-gray text-navy-blue">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold mb-4">입학안내</h2>
          <p className="text-lg max-w-3xl mx-auto">
            지원방법, 전형방법 및 시기, 선발기준, 입학원서, 등록금
          </p>
          <Link href="/admissions" className="mt-4 inline-block text-blue-600 hover:underline">
            MORE
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
