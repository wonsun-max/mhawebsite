'use client'
import { motion } from 'framer-motion'
import ContentPageLayout from '@/components/ContentPageLayout'
import { aboutSubNav } from '@/lib/subNavConfig'

export default function VisionMissionPage() {
  return (
    <ContentPageLayout
      title="비전과 사명"
      subtitle="Vision & Mission"
      heroImageUrl="/images/vision.jpg"
      heroImageAlt="Vision and Mission"
      subNav={aboutSubNav}
    >
      <div className="space-y-12">
        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
          className="glass p-10 rounded-2xl shadow-lg"
        >
          <h4 className="text-3xl font-bold mb-6 text-blue-400">VISION</h4>
          <p className="text-white/90 text-lg leading-relaxed">
            우리는 마닐라한국아카데미에서 양육된 선교사 자녀들이 대한민국과 세계 속에서 하나님 나라를 위해 헌신하는 모습을 보게 될 것이다.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
          className="glass p-10 rounded-2xl shadow-lg"
        >
          <h4 className="text-3xl font-bold mb-6 text-blue-400">MISSION</h4>
          <div className="space-y-6">
            <motion.p
              className="text-white/90 text-lg leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              본교의 사명은 한국인 선교사 자녀를 교육함으로써 예수님의 지상 명령을 완성하기 위한 선교사역에 동참하는 것이다.
            </motion.p>
            <motion.p
              className="text-white/90 text-lg leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              본교의 사명은 학생들이 확고한 한국인의 정체성과 기독교 신앙의 전통을 이어 받아 건강한 하나님 나라의 시민이 되도록 교육하는 것이다.
            </motion.p>
            <motion.p
              className="text-white/90 text-lg leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              본교의 사명은 기독교 세계관을 기초로 한 다양한 교육과정을 연구, 계발, 운영하여 양질의 교육을 제공하는 것이다.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </ContentPageLayout>
  )
}
