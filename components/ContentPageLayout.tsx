'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ReactNode } from 'react'

interface ContentPageLayoutProps {
  title: string
  subtitle?: string
  heroImageUrl?: string
  heroImageAlt?: string
  children: ReactNode
  subNav?: Array<{ label: string; href: string }>
}

export default function ContentPageLayout({
  title,
  subtitle,
  heroImageUrl = '/images/campus1.jpg',
  heroImageAlt = 'Hero Image',
  children,
  subNav
}: ContentPageLayoutProps) {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section - Matching Main Page Style */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageUrl}
            alt={heroImageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1929]/80 via-[#0A1929]/70 to-[#0A1929]" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-white tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-slate-300 font-light">
              {subtitle}
            </p>
          )}
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full" />
        </motion.div>
      </section>

      {/* Sub Navigation - If Provided */}
      {subNav && subNav.length > 0 && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="sticky top-16 z-40 bg-[#0F2137]/95 backdrop-blur-lg"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center space-x-1 overflow-x-auto py-4 scrollbar-hide">
              {subNav.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="px-6 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </motion.nav>
      )}

      {/* Main Content */}
      <main className="relative z-10 px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}
