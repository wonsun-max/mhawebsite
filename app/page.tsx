'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, BookOpen, Users, Award, Calendar, GraduationCap, Globe, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'

const HERO_IMAGES = [
  '/images/campus1.jpg',
  '/images/campus2.jpg',
  '/images/campus3.jpg',
  '/images/campus4.jpg',
]

export default function HomePage() {
  const containerRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Auto-slide hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-white overflow-hidden font-sans relative">


      {/* Hero Section - Cinematic & Immersive */}
      <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel with Parallax */}
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={HERO_IMAGES[currentImageIndex]}
                alt="MHA Campus"
                fill
                className="object-cover"
                priority
              />
              {/* Cinematic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A1929]/70 via-[#0A1929]/40 to-[#0A1929]" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 right-12 z-20 flex flex-col space-y-4">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-1.5 h-12 rounded-full transition-all duration-500 ${idx === currentImageIndex
                ? 'bg-[#D4AF37] h-20'
                : 'bg-white/20 hover:bg-white/40'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-[#D4AF37] text-lg md:text-xl font-medium tracking-[0.3em] uppercase mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
              Welcome to
            </h2>
            <h1 className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter leading-none" style={{ fontFamily: 'var(--font-cormorant)' }}>
              MANILA HANKUK<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">ACADEMY</span>
            </h1>
          </motion.div>


          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-3xl text-slate-200 mb-12 font-light max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
          >
            마음을 키우고, 영감을 주는 곳<br />
            <span className="text-base md:text-lg opacity-70 mt-2 block font-sans">Nurturing Minds, Inspiring Hearts</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/admissions/elementary">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-[#D4AF37] text-[#0A1929] rounded-full font-bold text-lg overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all"
              >
                <span className="relative z-10 flex items-center">
                  입학 신청하기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>
            </Link>
            <Link href="/about/principal">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/20 rounded-full font-semibold text-lg hover:bg-white/10 transition-all text-white"
              >
                학교 소개
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0"
          />
        </motion.div>
      </section>

      {/* About Section - Moved Up & Consistent Background */}
      <section className="py-32 px-6 relative overflow-hidden z-10">
        {/* Decorative Background Elements - Subtle */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[#D4AF37]" />
                <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm">About MHA</span>
              </div>

              <h2 className="text-6xl md:text-8xl font-bold mb-8 leading-[1.0] text-white" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Excellence in <br />
                <span className="italic text-[#D4AF37]">Education</span>
              </h2>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed font-light" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
                마닐라한국아카데미는 단순한 학교가 아닙니다. 우리는 학생들이 자신의 잠재력을 발견하고,
                세상을 변화시킬 리더로 성장하는 여정을 함께합니다.
              </p>

              <div className="space-y-8 mb-12">
                {[
                  { title: "Global Perspective", desc: "국제적 감각을 갖춘 인재 양성" },
                  { title: "Christian Values", desc: "기독교 정신에 입각한 인성 교육" },
                  { title: "Academic Rigor", desc: "체계적이고 심도 있는 커리큘럼" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-2 h-2 mt-2.5 rounded-full bg-[#D4AF37]" />
                    <div>
                      <h4 className="text-lg font-bold mb-1 text-slate-100">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/about/principal">
                <motion.button
                  whileHover={{ x: 10 }}
                  className="group flex items-center gap-3 text-white font-bold text-lg"
                >
                  Read Our Story
                  <ArrowRight className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Image Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[700px] hidden lg:block"
            >
              <div className="absolute top-0 right-0 w-4/5 h-3/5 rounded-[2rem] overflow-hidden shadow-2xl z-10 border border-white/10">
                <Image src="/images/campus2.jpg" alt="Students" fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute bottom-0 left-0 w-3/5 h-1/2 rounded-[2rem] overflow-hidden shadow-2xl z-20 border-8 border-[#0A1929]">
                <Image src="/images/campus3.jpg" alt="Campus" fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              {/* Decorative Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#D4AF37]/20 rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Access - Consistent Dark Background */}
      <section className="relative py-32 px-6 bg-transparent border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: GraduationCap, title: "Admissions", subtitle: "입학 안내", desc: "Start your journey with us", href: "/admissions/elementary" },
              { icon: Calendar, title: "Academic", subtitle: "학사 일정", desc: "Check the school calendar", href: "/curriculum/academic-calendar" },
              { icon: Globe, title: "News", subtitle: "소식", desc: "Latest updates & events", href: "/news" }
            ].map((item, idx) => (
              <Link key={idx} href={item.href}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="group relative p-10 rounded-[2rem] bg-[#0F2137]/50 backdrop-blur-xl border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 shadow-2xl hover:shadow-[#D4AF37]/10 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <item.icon className="w-32 h-32 text-white" />
                  </div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 mb-8 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <item.icon className="w-7 h-7 text-[#0A1929]" />
                    </div>
                    <h3 className="text-4xl font-bold mb-2 text-white" style={{ fontFamily: 'var(--font-cormorant)' }}>{item.title}</h3>
                    <p className="text-[#D4AF37] font-medium mb-4 tracking-wide" style={{ fontFamily: 'var(--font-outfit)' }}>{item.subtitle}</p>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors">{item.desc}</p>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section - Consistent Dark Background */}
      <section className="py-40 px-6 bg-transparent relative overflow-hidden border-t border-white/5 z-10">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/campus1.jpg')] bg-cover bg-fixed bg-center blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1929] via-[#0A1929]/90 to-[#0A1929]" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-6 text-white" style={{ fontFamily: 'var(--font-cormorant)' }}>Experience MHA</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              캠퍼스의 활기찬 일상과 학생들의 열정을 영상으로 만나보세요.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 group cursor-pointer"
          >
            <iframe
              src="https://www.youtube.com/embed/5gV9VYYtbO8?autoplay=0&controls=1&rel=0"
              title="MHA School Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Admissions Section - Consistent Dark Background */}
      <section className="py-32 px-6 bg-transparent text-white relative overflow-hidden border-t border-white/5 z-10">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[#D4AF37]" />
                <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm">Admissions</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Begin Your <br />
                <span className="text-[#D4AF37] italic">Journey</span>
              </h2>

              <p className="text-lg text-slate-300 mb-8 leading-relaxed font-light" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
                마닐라한국아카데미는 학생 한 명 한 명의 꿈을 소중히 여깁니다.<br />
                바른 인성과 실력을 갖춘 글로벌 리더로 성장하는 길,<br />
                MHA가 함께하겠습니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/admissions/elementary">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-[#D4AF37] text-[#0A1929] rounded-lg font-bold text-lg hover:bg-[#C5A028] transition-colors shadow-lg shadow-[#D4AF37]/20"
                  >
                    입학 안내 (Admissions)
                  </motion.button>
                </Link>
                <Link href="/about/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-lg font-medium text-lg hover:bg-white/5 transition-colors backdrop-blur-sm"
                  >
                    입학 상담 (Contact Us)
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[500px] hidden md:block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-blue-500/20 rounded-2xl blur-3xl -z-10" />
              <div className="relative h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/campus4.jpg"
                  alt="MHA Students"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/80 via-transparent to-transparent" />

                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white/90 font-light italic text-lg" style={{ fontFamily: 'var(--font-cormorant)' }}>
                    "Education is not the filling of a pail, but the lighting of a fire."
                  </p>
                  <p className="text-[#D4AF37] text-sm mt-2 uppercase tracking-widest">- William Butler Yeats</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div >
  )
}