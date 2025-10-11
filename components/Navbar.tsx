// FILE: components/Navbar.tsx
'use client'
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900/60 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/logo.png" alt="logo" className="h-10 w-10 object-contain" />
          <span className="text-white font-bold text-lg">MHA School</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/about" className="text-white/90 hover:text-white">About</Link>
          <Link href="/curriculum" className="text-white/80 hover:text-white">Curriculum</Link>
          <Link href="/admissions" className="text-white/80 hover:text-white">Admissions</Link>
          <Link href="/news" className="text-white/80 hover:text-white">News</Link>
          <Link href="/dormitory" className="text-white/80 hover:text-white">dormitory</Link>
          <Link href="/staff" className="text-white/80 hover:text-white">MK Mission</Link>
          <Link href="/portal/login" className="px-3 py-1 bg-white text-blue-700 rounded-full font-semibold ml-2">Portal</Link>

        </div>
      </div>
    </nav>
  );
}
