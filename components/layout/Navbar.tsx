'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, LogIn, User, Settings, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

import {
  aboutSubNav,
  curriculumSubNav,
  admissionsSubNav,
  newsSubNav,
  dormitorySubNav,
  mkMissionarySubNav,
} from '@/lib/subNavConfig';

const navLinks = [
  {
    name: '학교소개',
    href: '/about/principal',
    sublinks: aboutSubNav.map(link => ({ name: link.label, href: link.href })),
  },
  {
    name: '교육과정',
    href: '/curriculum/academic-calendar',
    sublinks: curriculumSubNav.map(link => ({ name: link.label, href: link.href })),
  },
  {
    name: '입학안내',
    href: '/admissions/elementary',
    sublinks: admissionsSubNav.map(link => ({ name: link.label, href: link.href })),
  },
  {
    name: '학교소식',
    href: '/news/announcements',
    sublinks: newsSubNav.map(link => ({ name: link.label, href: link.href })),
  },
  {
    name: '생활관',
    href: '/dormitory/qualification',
    sublinks: dormitorySubNav.map(link => ({ name: link.label, href: link.href })),
  },
  {
    name: 'MK 선교사',
    href: '/mk-missionary/recruitment',
    sublinks: mkMissionarySubNav.map(link => ({ name: link.label, href: link.href })),
  },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = pathname === '/';
  const showLogoText = !isHome || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (status === 'authenticated' && !session?.user?.koreanName) {
      router.push('/onboard');
    }
  }, [session, status, router]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
      ? 'bg-[#0A1929]/90 backdrop-blur-xl shadow-lg border-b border-[#D4AF37]/20 py-3'
      : 'bg-transparent border-b border-transparent py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group z-50">
          <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Image src="/images/logo.png" alt="logo" fill className="object-contain" />
          </div>
          <span className={`text-white font-bold text-lg md:text-xl tracking-tight group-hover:text-[#D4AF37] transition-all duration-300 font-serif ${showLogoText ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
            }`}>
            Manila Hankuk Academy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Link
                href={link.href}
                className="relative py-2 text-white/90 hover:text-white font-medium transition-colors text-[15px] tracking-wide group-hover:text-blue-200"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
              </Link>

              <AnimatePresence>
                {hoveredLink === link.name && link.sublinks && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-[#0A1929]/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 overflow-hidden z-50 p-2"
                  >
                    {/* Decorative gradient blob */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative flex flex-col gap-1">
                      {link.sublinks.map((sublink, index) => (
                        <motion.div
                          key={sublink.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={sublink.href}
                            className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group flex items-center justify-between"
                          >
                            <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                              {sublink.name}
                            </span>
                            <svg
                              className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <div className="flex items-center gap-6 pl-6 border-l border-white/10">
            <Link
              href="/news/board"
              className="relative px-5 py-2.5 text-white font-bold text-[15px] rounded-full overflow-hidden group transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>

              {/* Text with icon */}
              <span className="relative flex items-center gap-2">
                <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                자유 게시판
              </span>
            </Link>

            {session ? (
              <div
                className="relative"
                onMouseEnter={() => setHoveredLink('profile')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <button className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 group">
                  <div className="relative w-9 h-9">
                    <Image
                      src={session.user?.image || '/images/default-avatar.png'}
                      alt={session.user?.name || 'User'}
                      fill
                      className="rounded-full object-cover border-2 border-blue-400/50 group-hover:border-blue-400 transition-colors shadow-lg"
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0A1929]" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-white font-semibold text-sm leading-tight group-hover:text-blue-200 transition-colors">{session.user?.username}</span>
                    <span className="text-blue-300/80 text-[10px] font-medium leading-tight uppercase tracking-wider">{session.user?.role}</span>
                  </div>
                </button>

                <AnimatePresence>
                  {hoveredLink === 'profile' && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute top-full right-0 mt-4 w-64 bg-[#0A1929]/95 backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 overflow-hidden z-50 p-2"
                    >
                      {/* Decorative gradient */}
                      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-600/20 to-transparent pointer-events-none" />

                      <div className="relative px-4 py-4 mb-2 border-b border-white/10">
                        <p className="text-base font-bold text-white">{session.user?.username}</p>
                        <p className="text-xs text-gray-400 truncate font-medium">{session.user?.email}</p>
                      </div>

                      <div className="flex flex-col gap-1">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
                        >
                          <span className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-200">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </span>
                          <span className="font-medium group-hover:translate-x-1 transition-transform">내 프로필</span>
                        </Link>

                        {session.user?.role === 'ADMIN' && (
                          <Link
                            href="/admin"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
                          >
                            <span className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-200">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </span>
                            <span className="font-medium group-hover:translate-x-1 transition-transform">관리자 패널</span>
                          </Link>
                        )}

                        <div className="h-px bg-white/10 my-1 mx-2" />

                        <button
                          onClick={() => signOut()}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 group text-left"
                        >
                          <span className="p-2 bg-red-500/10 rounded-lg text-red-500 group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-200">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                          </span>
                          <span className="font-medium group-hover:translate-x-1 transition-transform">로그아웃</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => router.push('/auth/login')}
                className="relative px-6 py-2.5 text-white font-bold text-[15px] rounded-full overflow-hidden group transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>

                {/* Text with icon */}
                <span className="relative flex items-center gap-2">
                  <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Login
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden z-50 p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 lg:hidden bg-[#0A1929] z-40 pt-24 px-6 pb-12 overflow-y-auto"
            >
              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10" />

              <div className="flex flex-col gap-6">
                {/* User Section for Mobile */}
                {session ? (
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 mb-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-12 h-12">
                        <Image
                          src={session.user?.image || '/images/default-avatar.png'}
                          alt={session.user?.name || 'User'}
                          fill
                          className="rounded-full object-cover border-2 border-blue-400"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-bold">{session.user?.username}</span>
                        <span className="text-blue-300 text-xs uppercase tracking-wider">{session.user?.role}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/profile"
                        className="flex items-center justify-center gap-2 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium"
                      >
                        <User size={16} /> 내 프로필
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center justify-center gap-2 py-2 bg-red-500/20 text-red-300 rounded-lg text-sm font-medium"
                      >
                        <LogOut size={16} /> 로그아웃
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => router.push('/auth/login')}
                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
                  >
                    <LogIn size={20} /> Login
                  </button>
                )}

                <Link
                  href="/news/board"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  자유 게시판
                </Link>

                <div className="h-px bg-white/10 my-2" />

                {/* Main Links for Mobile */}
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <div key={link.name} className="flex flex-col">
                      <div className="flex items-center justify-between py-3 border-b border-white/5">
                        <span className="text-white/70 text-xs font-bold uppercase tracking-widest">{link.name}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1 py-2 pl-2">
                        {link.sublinks?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="flex items-center justify-between py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                          >
                            <span className="text-base font-medium">{sub.name}</span>
                            <ChevronRight size={18} className="text-[#D4AF37]" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}