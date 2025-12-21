'use client'
import { motion } from 'framer-motion'
import ContentPageLayout from '@/components/ContentPageLayout'
import { BookOpen, Target, Users, Award, Lightbulb, GraduationCap } from 'lucide-react'
import { curriculumSubNav } from '@/lib/subNavConfig'

const themeVerse = {
  title: '주제말씀',
  bible: '너희는 이 일을 너희 자녀에게 말하고 너희 자녀는 자기 자녀에게 말하고 그 자녀는 후세에 말할 것이니라 (욜1:3)',
  hymn: '선한 능력으로',
  motto: '다음 세대와 함께 가는 공동체'
}

const operationFocus = [
  {
    icon: Target,
    title: '실력',
    subtitle: '하나님의 나라와 공동체를 세워가는 실력 쌓기',
    items: [
      '하나님을 아는 지식 쌓기',
      '세상을 아는 지식 쌓기',
      '비전, 부르심을 아는 지식 쌓기',
      '자기 관리 능력 향상 - 자기주도 학습',
      '독서 습관화',
      '진로 진학 지도 체계화'
    ]
  },
  {
    icon: Users,
    title: '헌신',
    subtitle: '제사장과 봉사자와 같은 삶의 자세',
    items: [
      '하나님의 자녀로서의 정체성 확립',
      '경건의 모양과 능력을 갖추기 위한 훈련',
      '자신의 은사(재능) 기부 운동',
      '이웃을 섬길 수 있는 봉사활동 참여'
    ]
  },
  {
    icon: Award,
    title: '성품',
    subtitle: '하나님과 사람 앞에 신실한 사람',
    items: [
      '공의를 사랑한다',
      '죄를 미워한다',
      '자신과의 약속, 시간, 규칙 지키기',
      '의사소통 능력 기르기'
    ]
  }
]

const educationGoals = [
  {
    icon: BookOpen,
    category: '한국인 교육',
    items: [
      '한국인의 얼과 정체성을 확립하여 민족과 조국을 사랑하게 한다',
      '자신의 의사를 자유로이 구사할 수 있게 한다',
      '한국역사에 대한 바른 지식과 기독교적 관점에서 재해석',
      '수학여행, 교환학생 등으로 한국 문화 체험 기회 확대'
    ]
  },
  {
    icon: GraduationCap,
    category: '기독인 교육',
    items: [
      '세계 선교의 비전을 품은 하나님 나라의 시민으로 자라게 한다',
      '삼위일체 하나님을 예배하고 동행하는 학생이 되게 한다',
      '성경 묵상과 기도를 통해 선교적 삶을 살게 한다',
      '이웃을 섬기는 구체적인 봉사의 생활 실천'
    ]
  },
  {
    icon: Lightbulb,
    category: '국제인 교육',
    items: [
      '세계를 품은 국제적 감각을 지닌 리더로 성장',
      '타문화를 열린 마음으로 이해하고 수용',
      '영어로 자신의 의사를 표현하고 학습언어로 사용',
      '서로 다른 문화권 속에서 더불어 살아갈 수 있는 능력'
    ]
  }
]

export default function SecondaryPage() {
  return (
    <ContentPageLayout
      title="중/고등 교육과정"
      subtitle="Secondary Curriculum (Middle & High School)"
      heroImageUrl="/images/campus4.jpg"
      heroImageAlt="Secondary Curriculum"
      subNav={curriculumSubNav}
    >
      <div className="space-y-12">
        {/* Theme Verse */}
        <motion.section
          className="glass p-8 rounded-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-blue-400 mb-4">{themeVerse.title}</h3>
          <p className="text-white/90 text-lg mb-4 leading-relaxed">{themeVerse.bible}</p>
          <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
            <div>
              <span className="text-blue-300">찬송:</span>
              <span className="text-white/90 ml-2">{themeVerse.hymn}</span>
            </div>
            <div>
              <span className="text-blue-300">표어:</span>
              <span className="text-white/90 ml-2">{themeVerse.motto}</span>
            </div>
          </div>
        </motion.section>

        {/* Operation Focus */}
        <section>
          <motion.h3
            className="text-3xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            중등 운영의 중점
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-6">
            {operationFocus.map((focus, index) => (
              <motion.div
                key={focus.title}
                className="glass p-6 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <focus.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h4 className="text-2xl font-bold text-white mb-2">{focus.title}</h4>
                <p className="text-blue-300 text-sm mb-4">{focus.subtitle}</p>
                <ul className="space-y-2">
                  {focus.items.map((item, idx) => (
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

        {/* Education Goals */}
        <section>
          <motion.h3
            className="text-3xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            운영 목표 및 실현 계획
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-6">
            {educationGoals.map((goal, index) => (
              <motion.div
                key={goal.category}
                className="glass p-6 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <goal.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h4 className="text-xl font-bold text-white mb-4">{goal.category}</h4>
                <ul className="space-y-2">
                  {goal.items.map((item, idx) => (
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
