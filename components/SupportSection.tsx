'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SupportSection() {
  return (
    <section className="py-16 bg-navy-blue text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold mb-4">후원안내</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            마닐라한국아카데미는 여러분의 따뜻한 후원으로 운영됩니다. 다음 세대를 세우는 일에 동참해주세요.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            후원하기
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
