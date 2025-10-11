'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/about/principal', label: '학교장 인사말' },
  { href: '/about/vision', label: '비전 & 미션' },
  { href: '/about/philosophy', label: '교육철학 및 목표' },
  { href: '/about/anthem', label: '교가 및 상징' },
  { href: '/about/history', label: '연혁' },
  { href: '/about/location', label: '학교 위치' },
]

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <main className="text-white">
      {/* Header Image */}
      <section
        className="relative h-[45vh] flex flex-col items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(2,6,23,0.7), rgba(2,6,23,0.8)), url(/images/campus3.jpg)',
        }}
      >
        <h1 className="text-5xl font-bold mb-3">학교소개</h1>
        <p className="text-white/80">한국인 선교사 자녀를 위한 학교 마닐라한국아카데미입니다.</p>
      </section>

      {/* Sub-navigation bar */}
      <nav className="bg-blue-950 flex justify-center divide-x divide-blue-900">
        {tabs.map(tab => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-6 py-4 font-semibold text-sm sm:text-base ${
              pathname === tab.href ? 'bg-white text-blue-900' : 'text-white hover:bg-blue-900'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {/* Subpage content */}
      <div className="min-h-[50vh] bg-slate-900/40 py-12 px-6 sm:px-12">{children}</div>
    </main>
  )
}
