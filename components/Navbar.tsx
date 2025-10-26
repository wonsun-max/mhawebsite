'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const navLinks = [
  {
    name: '학교소개',
    href: '/about',
    sublinks: [
      { name: '학교장 인사말', href: '/about/principal' },
      { name: '비전&미션', href: '/about/vision' },
      { name: '교육철학 및 목표', href: '/about/philosophy' },
      { name: '교가 및 상징', href: '/about/anthem' },
      { name: '연혁', href: '/about/history' },
      { name: '학교 위치', href: '/about/location' },
    ],
  },
  {
    name: '교육과정',
    href: '/curriculum',
    sublinks: [
      { name: '학사일정', href: '/curriculum/academic-calendar' },
      { name: '초등 교육과정', href: '/curriculum/elementary' },
      { name: '중/고등 교육과정', href: '/curriculum/secondary' },
      { name: '비교과활동', href: '/curriculum/activities' },
      { name: '명예 학생 제도', href: '/curriculum/honors' },
    ],
  },
  {
    name: '입학안내',
    href: '/admissions',
    sublinks: [
        { name: '초등 입학전형', href: '/admissions/elementary' },
        { name: '중/고등 입학전형', href: '/admissions/secondary' },
    ]
  },
  {
    name: '생활관안내', // New link
    href: '/dormitory',
    sublinks: [
        { name: '입소자격', href: '/dormitory/qualification' },
        { name: '생활관 규정', href: '/dormitory/regulations' },
    ]
  },
  {
    name: 'MK선교사', // New link
    href: '/mk-missionary', // Assuming a new page for this
    sublinks: [] // No sublinks provided for this
  },
  {
    name: '학교소식',
    href: '/news',
    sublinks: [
        { name: '공지사항', href: '/news' }, // Main news page
        { name: '학교앨범', href: '/news/gallery' },
        { name: '급식안내', href: '/news/meal' },
        { name: '후원안내', href: '/news/support' },
        { name: '자료실', href: '/news/resources' },
    ]
  },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false); // New state

  useEffect(() => {
    if (status === 'authenticated' && !session?.user?.koreanName) {
      router.push('/onboard');
    }

    // Scroll listener for Navbar background change
    const handleScroll = () => {
      if (window.scrollY > 50) { // Change background after scrolling 50px
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [session, status, router]);

  return (
    <nav className={`backdrop-blur sticky top-0 z-40 transition-colors duration-300 ${scrolled ? 'bg-navy-blue/80' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="로고회사명" width={40} height={40} className="object-contain" />
          <span className="text-white font-bold text-lg">로고회사명</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Link href={link.href} className="text-white/90 hover:text-white">
                {link.name}
              </Link>
              <AnimatePresence>
                {hoveredLink === link.name && link.sublinks && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
                  >
                    {link.sublinks.map((sublink, index) => (
                      <motion.div
                        key={sublink.name}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <Link
                          href={sublink.href}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          {sublink.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="flex items-center gap-4">
            <Link href="/portal/login" className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
              로그인
            </Link>
            <Link href="/onboard" className="px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}