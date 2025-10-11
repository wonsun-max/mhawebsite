// FILE: components/SemesterGallery.tsx
'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import type { Semester } from '../lib/calendarData'

export default function SemesterGallery({ semester }: { semester: Semester }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const gallery = semester.gallery ?? [semester.image]

  return (
    <section className="mt-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {gallery.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setOpenIndex(i)}
            className="rounded-lg overflow-hidden bg-neutral-800 hover:scale-105 transition-transform duration-250"
            aria-label={`Open image ${i + 1}`}
          >
            <div className="relative w-full h-32">
              <Image src={src} alt={`${semester.name} ${i + 1}`} fill style={{ objectFit: 'cover' }} />
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              className="relative max-w-4xl w-full rounded-lg overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh]">
                <Image src={gallery[openIndex]} alt={`Large ${openIndex}`} fill style={{ objectFit: 'contain' }} />
              </div>
              <button
                onClick={() => setOpenIndex(null)}
                className="absolute top-3 right-3 text-white bg-black/40 px-3 py-1 rounded"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
