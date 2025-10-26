'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const HERO_CONTENT = [
  {
    image: '/images/hero.jpg',
    title: '마닐라한국아카데미',
    subtitle: '세계 선교를 돕고, 다음세대를 세우는 학교 마닐라한국아카데미는 세계 각국에서 하나님 나라 확장을 위해 헌신하시는 선교사님들이 사역에 집중할 수 있도록 선교사 자녀들을 교육하고, 다음 세대를 세워가는데 노력하고 있습니다.',
  },
  {
    image: '/images/honors.jpg',
    title: 'Academic Excellence & Innovation',
    subtitle: 'Our rigorous curriculum and innovative teaching methods empower students to achieve their full potential.',
  },
  {
    image: '/images/activities.jpg',
    title: 'Vibrant Campus Life & Extracurriculars',
    subtitle: 'Explore a diverse range of activities, clubs, and sports that foster holistic development and lifelong passions.',
  },
  {
    image: '/images/campus2.jpg',
    title: 'A Nurturing Community Rooted in Faith',
    subtitle: 'Experience an inclusive environment where Christian values guide our learning, growth, and service to others.',
    video: '/videos/placeholder-video.mp4', // Placeholder for a school overview video
  },
]

const SLIDE_DURATION_MS = 8000

export default function NewHero() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)
  const len = HERO_CONTENT.length

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setIndex((s) => (s + 1) % len)
    }, SLIDE_DURATION_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [len])

  return (
    <header className="relative h-[90vh] lg:h-screen w-full select-none">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {HERO_CONTENT[index].video ? (
              <video
                src={HERO_CONTENT[index].video}
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
              />
            ) : (
              <Image
                src={HERO_CONTENT[index].image}
                alt={HERO_CONTENT[index].title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-navy-blue/40 via-navy-blue/60 to-navy-blue/70" aria-hidden />
        <FloatingBlobs />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
              {HERO_CONTENT[index].title}
            </h1>
            <p className="mt-4 text-white/80 max-w-3xl text-lg sm:text-xl">
              {HERO_CONTENT[index].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-8 flex gap-4 items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Link
            href="/admissions"
            className="inline-flex items-center gap-3 bg-navy-blue text-white px-6 py-3 rounded-full font-bold shadow-lg hover:brightness-110 transform hover:scale-105 transition-all"
          >
            Apply Now
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 bg-light-gray/10 border border-light-gray/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-light-gray/20 transform hover:scale-105 transition-all"
          >
            Learn More
          </Link>
        </motion.div>

        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {HERO_CONTENT.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-10 h-1.5 rounded-full transition-all duration-300 ${i === index ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </header>
  )
}

function FloatingBlobs() {
  return (
    <>
      <div className="absolute -left-24 top-1/4 w-72 h-72 bg-navy-blue/20 rounded-full blur-3xl animate-floaty" />
      <div className="absolute -right-24 bottom-1/4 w-72 h-72 bg-light-gray/20 rounded-full blur-3xl animate-floaty-delay" />
      <style jsx>{`
        @keyframes floaty {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-25px) rotate(5deg) scale(1.05); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }
        .animate-floaty {
          animation: floaty 12s ease-in-out infinite;
        }
        .animate-floaty-delay {
          animation: floaty 15s ease-in-out infinite reverse;
        }
      `}</style>
    </>
  )
}
