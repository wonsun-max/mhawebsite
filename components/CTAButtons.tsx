'use client'
import Link from 'next/link'
import { motion } from 'framer-motion' 

export default function CTAButtons() {
  return (
    <motion.div
      className="flex gap-4 justify-center flex-wrap"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href="/admissions" className="bg-gradient-to-r from-sky-400 to-indigo-500 px-6 py-3 rounded-full font-semibold shadow transition">
          Apply Now
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href="/support" className="px-6 py-3 rounded-full glass border border-white/10 transition"> 
          Support MHA
        </Link>
      </motion.div>
    </motion.div>
  )
}