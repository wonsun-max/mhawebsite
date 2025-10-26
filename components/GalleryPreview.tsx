// FILE: components/GalleryPreview.tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const images = [
  '/images/campus1.jpg',
  '/images/campus2.jpg',
  '/images/campus3.jpg',
  '/images/event1.jpg',
  '/images/event2.jpg',
]

export default function GalleryPreview() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold">Campus Moments</h3>
        <Link href="/news/gallery" className="text-sky-300 hover:underline">View gallery</Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <motion.div key={src} whileHover={{ scale: 1.03 }} className="rounded-xl overflow-hidden bg-white/6">
            <div className="relative w-full h-36">
              <Image src={src} alt={`gallery-${i}`} fill style={{ objectFit: 'cover' }} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
