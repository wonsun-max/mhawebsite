'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ContentPageLayout from '@/components/ContentPageLayout'
import { aboutSubNav } from '@/lib/subNavConfig'

export default function PrincipalPage() {
  return (
    <ContentPageLayout
      title="교장 인사말"
      subtitle="Principal's Greeting"
      heroImageUrl="/images/principal.jpg"
      heroImageAlt="Principal's Message"
      subNav={aboutSubNav}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Principal's Image */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]/20">
              <Image
                src="/images/principal.jpg"
                alt="Principal Kwak In-hwan"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-1">곽인환</h3>
              <p className="text-[#D4AF37]">교장</p>
            </div>
          </motion.div>

          {/* Principal's Message */}
          <motion.div
            className="md:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">곽인환 교장 인사말</h2>

            <p className="text-lg text-slate-300 leading-relaxed">
              저희 학교 홈페이지를 방문해주신 여러분을 환영하고 축복합니다.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              마닐라한국아카데미는 하나님 나라 확장을 위해 각국에서 수고하시는 선교사님들이 걱정 없이 선교에만 전념할 수 있도록 1994년 한국 교계의 연합과 노력으로 세운 최초의 한국인 선교사 자녀 학교입니다.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              본교는 세계 선교의 비전을 성취하기 위해 파송된 선교사의 자녀들을 성경적 세계관을 바탕으로 신앙, 학문, 정서, 사회, 신체적으로 조화로운 하나님 나라의 일꾼이 되게하는 설립목적을 갖고 있습니다. 헌신된 교사 선교사들이 한국인으로서의 정체성과 기독교 신앙으로 세계를 이끌어 갈 인재로 양성되도록 최선을 다하고 있습니다.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              이 홈페이지가 학생과 졸업생, 교사와 학부모가 함께 소통하고, 학교에 관심 있는 모든 분들에게 유익한 공간이 되기를 바랍니다. 사랑하고 축복합니다.
            </p>

            <div className="pt-6 border-t border-white/10">
              <p className="text-xl text-white font-semibold">교장 곽인환</p>
            </div>
          </motion.div>
        </div>
      </div>
    </ContentPageLayout>
  )
}