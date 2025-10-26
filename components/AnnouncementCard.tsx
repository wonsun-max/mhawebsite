// FILE: components/AnnouncementCard.tsx
'use client'
import Link from 'next/link'

export default function AnnouncementCard({ id, title, body, date }: { id: string; title: string; body?: string; date: string }) {
  return (
    <article className="p-4 rounded-lg bg-white/6 hover:bg-white/10 transition">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-white/70 line-clamp-2 mt-1">{body}</p>
        </div>
        <time className="text-xs text-white/60">{date}</time>
      </div>
      <div className="mt-3">
        <Link href={`/news/${id}`} className="text-sky-300 text-sm hover:underline">Read more</Link>
      </div>
    </article>
  )
}
