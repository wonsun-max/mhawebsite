'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import { newsList } from '@/lib/newsData'

// Get the latest 5 news articles and sort them by date
const latestNews = newsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

export default function NewsAndEventsSection() {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.section
      aria-labelledby="news-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="py-16 bg-navy-blue text-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <motion.h2 id="news-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight" variants={itemVariants}>
              공지사항
            </motion.h2>
            <motion.p className="mt-2 text-lg text-white/70" variants={itemVariants}>
              마닐라한국아카데미의 새로운 소식을 알려드립니다.
            </motion.p>
          </div>
          <motion.div variants={itemVariants}>
            <Link href="/news" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              MORE →
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-4" // Changed to a single column for text news
          variants={sectionVariants}
        >
          {latestNews.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Link href={`/news/${item.id}`} className="group block p-4 rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">{item.title}</h3>
                  <p className="text-sm text-white/60">{item.date}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
