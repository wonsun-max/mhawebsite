'use client'
import { motion } from 'framer-motion'
import { BookOpen, Users, UserCheck, Flag, Heart, Globe } from 'lucide-react'
import ContentPageLayout from '@/components/ContentPageLayout'
import { aboutSubNav } from '@/lib/subNavConfig'

const philosophyData = {
  motto: {
    title: '교훈',
    text: '힘써 여호와를 알자 (호 6:3)',
  },
  views: [
    {
      icon: BookOpen,
      title: '교육관',
      text: '지식과 지혜의 근본이요 능력이신 여호와를 앎으로 학생과 교사 모두가 세상의 빛과 소금의 구실을 하게 한다.',
    },
    {
      icon: Users,
      title: '학생관',
      text: `학생은 죄로부터 구원 받을 필요가 있는 죄인임과 동시에, 하나님의 형상을 따라 지음 받은 책임적인 존재이다.
죄와 연약함에도 불구하고 하나님으로부터 하나님 나라라는 선물과 사명을 받은 하나님의 동역자이다.
그러므로 부름 받은 소명을 짊어지도록 격려 받아야 하며, 각자의 유일하고 독특한 은사를 계발할 수 있도록 가르침 받아야 한다.`,
    },
    {
      icon: UserCheck,
      title: '교사관',
      text: `교사는 학생들이 지식과 분별력을 갖고 하나님과 이웃을 섬길 수 있도록 인도하는 일을 위해 부름 받은 존재이다.
교사는 가르침의 제사장적 직무를 수행할 사람으로서(엡4;12) 학생들을 진리 가운데로 인도하기 위해 먼저 인격적으로 그리스도께 헌신하여야 한다.
교사는 학생의 발달 단계에 맞게 꾸준히 연구하고 준비하여 창조적으로 학생을 가르침과 동시에 학생들의 일생을 통해 가장 가치 있고 의미 있는 만남의 사람으로 새겨지도록 사랑과 섬김으로 가르쳐야 한다.`,
    },
  ],
  goals: {
    mainTitle: '교육 목표',
    subtitle: '자랑스러운 한국인, 하나님을 사랑하는 기독인, 세계를 섬기는 국제인',
    categories: [
      {
        icon: Flag,
        title: '한국인',
        points: [
          '한국 기독교인으로서의 긍지를 가지고 자랑스럽게 살 수 있게 한다.',
          '한국어를 모국어로 자유로이 구사할 수 있게 한다.',
          '한국 역사에 대하여 깊이 있고 올바른 시각을 갖게 한다.',
        ],
      },
      {
        icon: Heart,
        title: '기독인',
        points: [
          '삼위일체 하나님만을 예배하고 교제하며, 늘 하나님과 동행하는 학생이 되게 한다.',
          '성경적 세계관에 기초한 삶의 기초, 틀, 의미를 경험하고, 성경적 원리와 조화를 이루는 가치관과 성향을 계발하고 기르게 한다.',
          '하나님께서 주신 각자의 소명을 깨닫게 하고, 그 역할을 잘 감당할 수 있도록 베푸신 달란트를 발견하여 최대한 개발하며, 하나님과 이웃을 섬기는 사람으로 서게 한다.',
        ],
      },
      {
        icon: Globe,
        title: '국제인',
        points: [
          '선교지의 언어, 문화적 다중성을 폭넓은 교육 기회로 활용한다.',
          '국제 사회가 요구하는 하나님의 인재로서의 능력을 개발한다.',
          '영어 및 다양한 외국어 구사 능력을 지니게 한다.',
        ],
      },
    ],
  },
}

export default function PhilosophyPage() {
  return (
    <ContentPageLayout
      title="교육철학"
      subtitle="Educational Philosophy"
      heroImageUrl="/images/philosophy.jpg"
      heroImageAlt="Educational Philosophy"
      subNav={aboutSubNav}
    >
      <div className="max-w-7xl mx-auto py-20 px-6">
        {/* Motto Section */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-2">{philosophyData.motto.title}</h2>
          <p className="text-4xl md:text-5xl font-extrabold text-white">
            &quot;{philosophyData.motto.text}&quot;
          </p>
        </motion.div>

        {/* Views Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {philosophyData.views.map((view, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 p-8 rounded-xl border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <view.icon className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">{view.title}</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{view.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Goals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{philosophyData.goals.mainTitle}</h2>
            <p className="text-xl text-gray-400">{philosophyData.goals.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {philosophyData.goals.categories.map((category, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 p-8 rounded-xl border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <category.icon className="w-10 h-10 text-blue-400 mr-4" />
                  <h3 className="text-3xl font-bold text-white">{category.title}</h3>
                </div>
                <ul className="space-y-4">
                  {category.points.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-start">
                      <span className="text-blue-400 mr-3 mt-1">&#8227;</span>
                      <p className="text-gray-300">{point}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </ContentPageLayout>
  )
}
