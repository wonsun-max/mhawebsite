'use client'
import { motion } from 'framer-motion'
import ContentPageLayout from '@/components/ContentPageLayout'
import { Flag, Heart, Globe, BookOpen, Users, Target } from 'lucide-react'
import { curriculumSubNav } from '@/lib/subNavConfig'

const educationalGoals = [
  {
    icon: Flag,
    category: '한국인',
    title: '자랑스런 대한민국',
    subtitle: '한국인임을 자랑스러워하는 어린이',
    color: 'text-red-400'
  },
  {
    icon: Heart,
    category: '기독인',
    title: '사랑하는 하나님',
    subtitle: '예수님과 사람에게 사랑받는 어린이',
    color: 'text-blue-400'
  },
  {
    icon: Globe,
    category: '국제인',
    title: '섬겨야 할 세계',
    subtitle: '세계를 섬길 준비를 하는 어린이',
    color: 'text-green-400'
  }
]

const operationPlans = {
  korean: {
    title: '자랑스런 대한민국',
    items: [
      '한국어 교육과정 이행',
      '독서교육 강화: 학년 필독서, 독후활동지 활동, 관련 대회 및 시상',
      '기초 계산력 기르기: 학년별 수준별 기적의 계산법',
      '계기, 절기교육: 6월 호국보훈의 달, 9월 추석, 10월 한글날 등',
      '초등 5대 생활덕목(순종, 존중, 배려, 책임, 정직) 실천하기',
      '전교어린이회 활성화, 자치 활동 강화',
      '한인 관련 행사 참여'
    ]
  },
  christian: {
    title: '사랑하는 하나님',
    items: [
      '학기별 신앙수련회를 통한 신앙성장과 공동체 훈련',
      '교육과정에 녹아드는 기독교적 세계관',
      '주 1회 정기예배, Q.T의 생활화, 성경 암송',
      '찬송가 외워 쓰고 부르기',
      '부모님 사역지 방문을 통한 비전세우기',
      '사랑의 성금으로 예수님의 사랑 실천하기',
      '학생-학부모-교사 기도체인 만들기'
    ]
  },
  global: {
    title: '섬겨야 할 세계',
    items: [
      '영어 수업',
      '필리핀 국가, Tagalog 찬양 익히기, 동아리 활동',
      '사랑의 성금 모금: 월 1회 모금으로 어려운 이웃 돕기',
      '한필 문화 축제 등 필리핀 행사 참여',
      '세계를 품고 기도하기(매월 선교예배)'
    ]
  }
}

const detailedPlans = [
  {
    icon: BookOpen,
    title: '학교에 맞는 적합하고 탄력적인 교육과정 운영',
    items: [
      '현지에 맞는 교육과정 편성 및 운영',
      '효율적인 담임 및 업무분장',
      '학습자 중심의 영어 교육과정 편성 및 수준별 학습',
      '한국어 2015개정 교육과정 운영'
    ]
  },
  {
    icon: Users,
    title: '다양한 은사 계발',
    items: [
      '동아리활동 프로그램: Tagalog, Chinese Language',
      '학기말 English Week 영어교육활동',
      '각종 대회: 수학경시대회, 독서 행사, 그리기 대회, 성경암송대회',
      '영어 대회: Book Talk, Speech Contest, Quiz Bee, Talent contest'
    ]
  },
  {
    icon: Target,
    title: '필리핀 탐방 및 문화 체험',
    items: [
      '초등 전교생 Outdoor (1박 2일)',
      '필리핀 자연환경 및 문화 체험',
      '기독교 세계관과 선교에 관한 연수',
      'MK관련 워크숍 연수 참여'
    ]
  }
]

export default function ElementaryPage() {
  return (
    <ContentPageLayout
      title="초등 교육과정"
      subtitle="Elementary Curriculum"
      heroImageUrl="/images/campus4.jpg"
      heroImageAlt="Elementary Curriculum"
      subNav={curriculumSubNav}
    >
      <div className="space-y-12">
        {/* Educational Goals */}
        <section>
          <motion.h3
            className="text-3xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            교육목표
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-6">
            {educationalGoals.map((goal, index) => (
              <motion.div
                key={goal.category}
                className="glass p-8 rounded-2xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <goal.icon className={`w-16 h-16 mx-auto mb-4 ${goal.color}`} />
                <h4 className="text-xl font-bold text-white mb-2">{goal.category}</h4>
                <p className="text-lg text-blue-300 mb-3">{goal.title}</p>
                <p className="text-white/80">{goal.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Basic Operation Plans */}
        <section>
          <motion.h3
            className="text-3xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            기본운영계획
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(operationPlans).map(([key, plan], index) => (
              <motion.div
                key={key}
                className="glass p-6 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="text-xl font-bold text-blue-400 mb-4">{plan.title}</h4>
                <ul className="space-y-2">
                  {plan.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-white/80">
                      <span className="text-blue-400 mr-2">•</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Detailed Operation Plans */}
        <section>
          <motion.h3
            className="text-3xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            세부운영계획
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-6">
            {detailedPlans.map((plan, index) => (
              <motion.div
                key={plan.title}
                className="glass p-6 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <plan.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h4 className="text-lg font-bold text-white mb-4">{plan.title}</h4>
                <ul className="space-y-2">
                  {plan.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-white/80">
                      <span className="text-blue-400 mr-2">•</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </ContentPageLayout>
  )
}
