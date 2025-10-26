'use client' 
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion' 

export default function NewsCard({
  id,
  title,
  date,
  image,
  summary,
  author,
}: {
  id: string
  title: string
  date: string
  image: string
  summary: string
  author: string
}) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Link
        href={`/news/${id}`}
        className="block rounded-xl overflow-hidden glass hover:bg-white/10 transition" 
      >
        <div className="relative w-full h-48">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-white/70 mb-3 line-clamp-2">{summary}</p>
          <p className="text-xs text-white/50">{formattedDate} by {author}</p>
        </div>
      </Link>
    </motion.div>
  )
}