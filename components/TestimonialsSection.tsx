'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "Manila Hankuk Academy has been instrumental in my child's growth, both academically and spiritually. The dedicated teachers and supportive community are truly exceptional.",
    author: 'Mrs. Lee',
    relation: 'Parent of a Grade 8 Student',
    avatar: '/images/avatar-placeholder.jpg',
  },
  {
    quote: "As an alumnus, I can confidently say that MHA prepared me not just for university, but for life. The values instilled here continue to guide my decisions and aspirations.",
    author: 'Kim Min-jun',
    relation: 'Alumnus, Class of 2020',
    avatar: '/images/avatar-placeholder.jpg',
  },
  {
    quote: "Every day at MHA is an opportunity to learn, grow, and connect. The diverse extracurricular activities and the strong sense of belonging make it a truly special place.",
    author: 'Choi Eun-ji',
    relation: 'Grade 10 Student',
    avatar: '/images/avatar-placeholder.jpg',
  },
  {
    quote: "The commitment to academic excellence combined with a genuine care for each student's well-being is what sets MHA apart. It's a privilege to teach here.",
    author: 'Mr. Park',
    relation: 'High School Faculty',
    avatar: '/images/avatar-placeholder.jpg',
  },
]

const SLIDE_DURATION = 7000 // 7 seconds

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, SLIDE_DURATION)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <section aria-labelledby="testimonials-heading">
      <div className="text-center mb-12">
        <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          What Our Community Says
        </h2>
      </div>
      <div className="relative h-64 md:h-56 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
          >
            <Quote className="w-10 h-10 text-sky-400/50 mb-4" />
            <p className="text-center text-lg md:text-xl max-w-3xl text-white/90">
              {testimonials[index].quote}
            </p>
            <div className="mt-6 text-center">
              <span className="font-bold">{testimonials[index].author}</span>
              <span className="text-white/60">, {testimonials[index].relation}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? 'bg-sky-300' : 'bg-slate-600'}`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
