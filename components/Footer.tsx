'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-navy-blue to-blue-900 text-white py-12 mt-20 shadow-inner">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-3">마닐라한국아카데미</h2>
            <p className="text-gray-300 text-sm">P.O. BOX 1084 Antipolo City, Philppines</p>
            <p className="text-gray-300 text-sm">전화: 8401-7854, 0917-546-9151</p>
            <p className="text-gray-300 text-sm">이메일: hankukac@hanmail.net</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <h2 className="text-xl font-bold mb-2">학교소개</h2>
            <Link href="/about/principal" className="text-gray-300 hover:text-white transition-colors hover:text-gold-300">학교장 인사말</Link>
            <Link href="/about/vision" className="text-gray-300 hover:text-white transition-colors hover:text-gold-300">비전과 미션</Link>
            <Link href="/about/philosophy" className="text-gray-300 hover:text-white transition-colors hover:text-gold-300">교육 철학 및 목표</Link>
            <Link href="/about/anthem" className="text-gray-300 hover:text-white transition-colors hover:text-gold-300">교가 및 상징</Link>
            <Link href="/about/history" className="text-gray-300 hover:text-white transition-colors hover:text-gold-300">연혁</Link>
            <Link href="/about/location" className="text-gray-300 hover:text-white transition-colors hover:text-gold-300">학교 위치</Link>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <h2 className="text-xl font-bold mb-2">법률 정보</h2>
            <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors hover:text-gold-300">개인정보처리방침</Link>
            <Link href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors hover:text-gold-300">이용약관</Link>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} 마닐라한국아카데미. 모든 권리 보유.</p>
        </div>
      </div>
    </footer>
  )
}