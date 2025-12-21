'use client'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import ContentPageLayout from '@/components/ContentPageLayout'
import { aboutSubNav } from '@/lib/subNavConfig'

const location = {
  address: 'B3&4 Lot 1 C. Lawis St. Brgy San Luis, Antipolo City. 1870',
  poBox: 'P.O. BOX 1084 Antipolo City, Philippines',
  schoolPhone: ['8401-7854', '0917-546-9151'],
  adminOffice: '070-8638-3355',
  kakaoId: 'hankukac',
  email: 'hankukac@hanmail.net',
  coordinates: '14.6042,121.1793',
};

// Google Maps embed URL (using standard iframe embed)
// Searching by the specific address provided by the user
const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent("B3&4 Lot 1 C. Lawis St. Brgy San Luis, Antipolo City")}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

export default function LocationPage() {
  return (
    <ContentPageLayout
      title="학교 위치"
      subtitle="School Location"
      heroImageUrl="/images/location.jpg"
      heroImageAlt="School Location"
      subNav={aboutSubNav}
    >
      <div className="space-y-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-8">연락처 정보</h3>

            {/* Address */}
            <div className="glass p-6 rounded-xl">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">주소</h4>
                  <p className="text-white/80 mb-1">{location.poBox}</p>
                  <p className="text-white/80">({location.address})</p>
                </div>
              </div>
            </div>

            {/* School Contact */}
            <div className="glass p-6 rounded-xl">
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">학교 연락처</h4>
                  {location.schoolPhone.map((phone, idx) => (
                    <p key={idx} className="text-white/80">{phone}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Admin Office */}
            <div className="glass p-6 rounded-xl">
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">행정실</h4>
                  <p className="text-white/80">{location.adminOffice}</p>
                </div>
              </div>
            </div>

            {/* KakaoTalk */}
            <div className="glass p-6 rounded-xl">
              <div className="flex items-start">
                <MessageCircle className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">카카오톡 ID</h4>
                  <p className="text-white/80">{location.kakaoId}</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="glass p-6 rounded-xl">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">E-mail</h4>
                  <a
                    href={`mailto:${location.email}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {location.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[600px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <iframe
              title="MHA Campus Map"
              src={mapSrc}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </ContentPageLayout>
  )
}
