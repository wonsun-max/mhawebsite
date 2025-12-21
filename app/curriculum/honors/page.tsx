'use client'
import { motion } from 'framer-motion'
import ContentPageLayout from '@/components/ContentPageLayout'
import { Award, Target, Users, Heart, CheckCircle } from 'lucide-react'
import { curriculumSubNav } from '@/lib/subNavConfig'

const purpose = {
  icon: Target,
  text: '학교의 교육목표에 따라 학교생활을 충실히 하며, 전인적 자기 성장을 꾀하고자 하는 학생을 선발하여 격려하는 제도로, 선발 과정을 통해 전인적인 성장 및 은사 계발, 그리고 리더십을 기를 수 있도록 지도한다.'
}

const qualifications = [
  {
    icon: CheckCircle,
    title: '지난 학기 GPA 3.8 이상',
    color: 'text-blue-400'
  },
  {
    icon: Users,
    title: '2명 이상의 교사 추천을 받은 자',
    color: 'text-green-400'
  }
]

const disqualifications = [
  '교칙 위반으로 징계를 받은 사실(신청 직전 1년간)이 있는 자',
  '신청 기간 중 교칙 위반으로 인한 징계와 훈계에 해당하는 처벌을 받은 자'
]

const applicationProcess = [
  {
    step: '1',
    title: '오리엔테이션',
    description: '매 학기 시작 첫 주, 구체적인 지원 방식 안내'
  },
  {
    step: '2',
    title: '지원 접수',
    description: '매 학기 시작 후 둘째 주, 지원 양식을 구비하여 접수'
  }
]

const evaluationAreas = [
  { area: '신앙', icon: Heart, color: 'bg-blue-500/20' },
  { area: '협력', icon: Users, color: 'bg-green-500/20' },
  { area: '봉사', icon: Heart, color: 'bg-purple-500/20' },
  { area: '리더십', icon: Award, color: 'bg-yellow-500/20' }
]

const selectionProcess = [
  '채점 결과를 바탕으로 평가위원 협의회에서 선발 대상자 결정',
  '선발 대상자를 교사들에게 공지하여 이의가 없을 시 명예학생으로 확정하고 기념품 지급',
  '연속 2회 명예 학생에 선발된 학생에게 소정의 장학금 지급'
]

export default function HonorsPage() {
  return (
    <ContentPageLayout
      title="명예 학생"
      subtitle="Honorary Student System"
      heroImageUrl="/images/honors.jpg"
      heroImageAlt="Honorary Student System"
      subNav={curriculumSubNav}
    >
      <div className="space-y-12">
        {/* Purpose */}
        <motion.section
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start">
            <purpose.icon className="w-12 h-12 text-blue-400 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">목적</h3>
              <p className="text-white/90 leading-relaxed">{purpose.text}</p>
            </div>
          </div>
        </motion.section>

        {/* Qualifications */}
        <section>
          <motion.h3
            className="text-3xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            지원 자격
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {qualifications.map((qual, index) => (
              <motion.div
                key={qual.title}
                className="glass p-6 rounded-2xl"
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <qual.icon className={`w-10 h-10 ${qual.color} mb-3`} />
                <p className="text-white/90 text-lg">{qual.title}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="glass p-6 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold text-white mb-4">결격 사유</h4>
            <div className="space-y-2">
              {disqualifications.map((item, idx) => (
                <div key={idx} className="flex items-start text-white/80">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Application Process */}
        <section>
          <motion.h3
            className="text-3xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            지원 방식
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-6">
            {applicationProcess.map((process, index) => (
              <motion.div
                key={process.step}
                className="glass p-6 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                    {process.step}
                  </div>
                  <h4 className="text-xl font-bold text-white">{process.title}</h4>
                </div>
                <p className="text-white/80">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Evaluation */}
        <section>
          <motion.h3
            className="text-3xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            평가
          </motion.h3>

          <motion.div
            className="glass p-8 rounded-2xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold text-white mb-6">평가 영역</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {evaluationAreas.map((area, idx) => (
                <div
                  key={area.area}
                  className={`${area.color} p-4 rounded-xl text-center`}
                >
                  <area.icon className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-white font-semibold">{area.area}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="glass p-6 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold text-white mb-4">평가 요소</h4>
            <p className="text-white/90">
              각 영역별로 전반기 계획서와 평가서, 후반기 계획서와 평가서, 종합평가서의 5개 요소를 각 20점씩 100점 만점으로 평가
            </p>
          </motion.div>
        </section>

        {/* Selection */}
        <motion.section
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">선발</h3>
          <div className="space-y-4">
            {selectionProcess.map((step, idx) => (
              <div key={idx} className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-white/90">{step}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </ContentPageLayout>
  )
}
