'use client'
import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-[#0A1929] text-white relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* School Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-serif font-bold mb-6 leading-relaxed">
              <span className="text-4xl text-[#E5C158] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">M</span>
              <span className="text-[#D4AF37]">anila</span>
              <br />
              <span className="text-4xl text-[#E5C158] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">H</span>
              <span className="text-[#D4AF37]">ankuk</span>
              <br />
              <span className="text-4xl text-[#E5C158] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">A</span>
              <span className="text-[#D4AF37]">cademy</span>
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              마음을 키우고, 영감을 주는 곳<br />
              Nurturing Minds, Inspiring Hearts
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.youtube.com/watch?v=RrESvSRNpeo&list=RDRrESvSRNpeo&start_radio=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] flex items-center justify-center transition-all hover:scale-110"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/mha_official_2025/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] flex items-center justify-center transition-all hover:scale-110"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://www.youtube.com/@MHA-Hanain"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] flex items-center justify-center transition-all hover:scale-110"
              >
                <Youtube size={20} />
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/admissions', label: 'Admissions' },
                { href: '/curriculum', label: 'Curriculum' },
                { href: '/news', label: 'News & Events' },
                { href: '/contact', label: 'Contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-[#D4AF37] transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-[#D4AF37] transition-all mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 학교 정보 (Korean) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-6 text-white">학교 정보</h4>
            <ul className="space-y-3">
              {[
                { href: '/about', label: '학교소개' },
                { href: '/about/vision', label: '교육목표' },
                { href: '/dormitory', label: '기숙사' },
                { href: '/mk-missionary', label: 'MK/선교사자녀' },
                { href: '/privacy', label: '개인정보처리방침' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-[#D4AF37] transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-[#D4AF37] transition-all mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  B3&4 Lot 1 C. Lawis St.<br />
                  Brgy San Luis, Antipolo City<br />
                  Philippines 1870
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  070-8638-3355<br />
                  0917-546-9151
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  hankukac@hanmail.net
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Mon-Fri: 08:00 - 16:00<br />
                  Lunch: 11:00 - 12:00
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Manila Hankuk Academy. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}