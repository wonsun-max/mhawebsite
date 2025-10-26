'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Trophy, Users, Video } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { name: 'University Acceptance', value: '98%', icon: <GraduationCap className="w-8 h-8 text-white" /> },
  { name: 'International Awards', value: '15+', icon: <Trophy className="w-8 h-8 text-white" /> },
  { name: 'Student Organizations', value: '20+', icon: <Users className="w-8 h-8 text-white" /> },
]

export default function WhyMHASection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="relative glass rounded-3xl border border-white/10 backdrop-blur-sm"
    >
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center p-8 md:p-12">
        {/* Left Side: Content */}
        <div className="text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Why Choose Manila Hankuk Academy?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Manila Hankuk Academy offers a unique educational journey that blends rigorous academics with a strong foundation in Christian values. We are dedicated to nurturing well-rounded individuals who excel intellectually, grow spiritually, and are prepared to make a positive impact on the world. Our holistic approach ensures every student discovers their potential and purpose.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white/5 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-sky-300">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.name}</div>
              </div>
            ))}
          </div>
          <Link
            href="/about/vision"
            className="font-semibold text-sky-300 hover:text-sky-200 transition-colors"
          >
            Discover Our Vision →
          </Link>
        </div>

        {/* Right Side: Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative aspect-video bg-slate-800 rounded-xl shadow-2xl flex items-center justify-center border border-white/10"
        >
          <div className="text-center">
            <Video className="w-16 h-16 text-white/30 mb-4" />
            <p className="font-semibold text-lg">School Tour Video Coming Soon</p>
            <p className="text-sm text-white/60">A comprehensive campus tour video will be embedded here.</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
