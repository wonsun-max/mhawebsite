
'use client'
import { motion } from 'framer-motion'
import { BookOpen, Users, Award } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import HeroSlider from '@/components/HeroSlider' // Import the new HeroSlider component

// Mock data for news - replace with actual data fetching
const news = [
  { id: 1, title: '개교기념일', date: '2025-08-20', description: '새 학년도를 맞아 학생들을 다시 맞이하게 되어 기쁩니다.' },
  { id: 2, title: '연례 스포츠의 날', date: '2025-09-15', description: '재미, 스포츠, 팀워크의 날입니다.' },
  { id: 3, title: '학부모-교사 회의', date: '2025-10-05', description: '학생의 발전에 대해 논의할 수 있는 기회입니다.' },
];

export default function HomePage() {
  return (
    <div className="bg-gray-900 text-white">
      <HeroSlider />

      {/* Welcome Section */}
      <section className="py-20 text-center bg-gradient-to-b from-gray-900 to-gray-800">
        <motion.h2
          className="text-4xl font-bold mb-4 text-gold-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>
          마닐라한국아카데미에 오신 것을 환영합니다
        </motion.h2>
        <motion.p
          className="text-lg text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}>
          우리는 학문적 우수성과 미래 지도자 양성에 전념하는 학습자 공동체입니다. 우리의 임무는 지적 호기심, 창의성 및 학습에 대한 사랑을 키우는 육성 환경을 제공하는 육성 환경을 제공하는 것입니다.
        </motion.p>
      </section>

      {/* School Video Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-bold mb-12 text-gold-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            학교 둘러보기
          </motion.h2>
          <motion.div
            className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <video src="/videos/placeholder-hero-about.mp4" controls className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Highlights Section (Re-introduced with icons) */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-center mb-12 text-gold-300">MHA 주요 특징</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div className="p-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700" whileHover={{ y: -10, scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 20px rgba(59, 130, 246, 0.5)" }} transition={{ duration: 0.3 }}>
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-2xl font-bold mb-2">학문적 우수성</h3>
              <p className="text-gray-400">엄격하고 포괄적인 학업 프로그램.</p>
            </motion.div>
            <motion.div className="p-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700" whileHover={{ y: -10, scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 20px rgba(59, 130, 246, 0.5)" }} transition={{ duration: 0.3 }}>
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-2xl font-bold mb-2">활기찬 공동체</h3>
              <p className="text-gray-400">활기차고 지원적인 학교 공동체.</p>
            </motion.div>
            <motion.div className="p-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700" whileHover={{ y: -10, scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 20px rgba(59, 130, 246, 0.5)" }} transition={{ duration: 0.3 }}>
              <Award className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-2xl font-bold mb-2">뛰어난 성과</h3>
              <p className="text-gray-400">우수성과 성취의 역사.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gold-300">갤러리</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div className="overflow-hidden rounded-lg border border-gray-700" whileHover={{ scale: 1.05, zIndex: 10, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }} transition={{ duration: 0.3 }}>
              <Image src="/images/campus1.jpg" alt="Gallery Image 1" width={400} height={300} className="w-full h-full object-cover" />
            </motion.div>
            <motion.div className="overflow-hidden rounded-lg border border-gray-700" whileHover={{ scale: 1.05, zIndex: 10, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }} transition={{ duration: 0.3 }}>
              <Image src="/images/campus1.jpg" alt="Gallery Image 2" width={400} height={300} className="w-full h-full object-cover" />
            </motion.div>
            <motion.div className="overflow-hidden rounded-lg border border-gray-700" whileHover={{ scale: 1.05, zIndex: 10, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }} transition={{ duration: 0.3 }}>
              <Image src="/images/campus1.jpg" alt="Gallery Image 3" width={400} height={300} className="w-full h-full object-cover" />
            </motion.div>
            <motion.div className="overflow-hidden rounded-lg border border-gray-700" whileHover={{ scale: 1.05, zIndex: 10, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }} transition={{ duration: 0.3 }}>
              <Image src="/images/campus1.jpg" alt="Gallery Image 4" width={400} height={300} className="w-full h-full object-cover" />
            </motion.div>
          </div>
          <div className="text-center mt-8">
            <Link href="/news/gallery">
              <button className="px-8 py-4 bg-transparent border-2 border-blue-600 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-600/50 hover:shadow-xl hover:shadow-blue-700/50">
                갤러리 보기
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* News & Announcements Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gold-300">최신 뉴스</h2>
          <div className="space-y-8">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                className="p-6 bg-gray-700 rounded-lg shadow-lg flex items-center space-x-6 border border-gray-700"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              >
                <div className="text-center">
                  <p className="text-4xl font-bold">{new Date(item.date).getDate()}</p>
                  <p className="text-lg text-gray-400">{new Date(item.date).toLocaleString('ko-KR', { month: 'short' })}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                  <Link href={`/news/${item.id}`} className="text-blue-400 hover:underline mt-2 inline-block">더 읽어보기</Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/news">
              <button className="px-8 py-4 bg-transparent border-2 border-blue-600 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-600/50 hover:shadow-xl hover:shadow-blue-700/50">
                모든 뉴스 보기
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
