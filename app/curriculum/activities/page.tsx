'use client'
import { motion } from 'framer-motion'
import ContentPageLayout from '@/components/ContentPageLayout'
import { Users, Heart, Trophy, Plane, Award, Music, BookOpen, Calendar } from 'lucide-react'
import { curriculumSubNav } from '@/lib/subNavConfig'

const clubActivities1 = {
  title: '동아리 활동1 [교육연구부]',
  time: '매주 금요일 7교시 (15:10~15:55)',
  description: '전교생이 한 반을 선택하여 반드시 참여 (개설반은 학기마다 변동이 있음)',
  icon: BookOpen
}

const clubActivities2 = {
  title: '동아리 활동2 [학생복지부]',
  time: '활동부서별 시간이 다름',
  description: '학생들이 희망하는 동아리에 자유롭게 선택 참여 (1인 1동아리 참여 유도)',
  icon: Users
}

const serviceActivities = {
  title: '봉사활동 [학생복지부]',
  icon: Heart,
  time: '학기별 17시간 실시',
  activities: [
    '교내환경정화',
    '도서관 정리 및 책 홍보 포스터 그리기',
    '찬양, 설교번역, 예배도우미',
    '학습지도',
    '행사사진 촬영 및 영상제작',
    '현지인 교회 어린이 학습지도',
    '보육원 봉사'
  ]
}

const leadershipPrograms = [
  {
    icon: Plane,
    title: '필드 트립',
    details: [
      '1학기: 모둠별 기획 실행',
      '2학기: 전체 기획'
    ]
  },
  {
    icon: Trophy,
    title: 'Mission Trip',
    details: [
      '대상: 9학년',
      '기간: 2학기 중'
    ]
  },
  {
    icon: Award,
    title: 'Vision Trip',
    details: [
      '대상: 10학년',
      '기간: 2학기 중'
    ]
  },
  {
    icon: Users,
    title: '졸업여행',
    details: [
      '대상: 12학년 학생',
      '기간: 2학기 중'
    ]
  }
]

const certificationPrograms = [
  {
    title: 'First-Aid',
    period: '1학기 중'
  },
  {
    title: '태권도',
    period: '전교생 대상, 창의적 체험 활동, 매년 말 승급 및 승단 심사'
  }
]

const sportsEvents = [
  '체육대회: 학기별 1회',
  '현지 학교와 체육 및 전통 놀이 교류',
  '한인체육대회 참여'
]

const englishEvent = {
  name: 'Acalitmus',
  meaning: 'Academic, Literature, Music의 약자',
  purpose: '필리핀 학교 문화와 학생 문화를 이해하고, 필리핀 학생과의 교류를 통해 글로벌 시대에 필요한 능력을 발전',
  time: '매년 1회 1학기 중',
  target: '전교생'
}

const otherEvents = [
  '개교기념일', '스승의날', '현충일', '한국전쟁 상기일', '한글날', '추석',
  '신앙수련회', '수학경시대회', '중국어 말하기 대회', '성경암송대회',
  '교내합창대회', '직업특강', '가든파티', '한아의 밤', '졸업식'
]

export default function ActivitiesPage() {
  return (
    <ContentPageLayout
      title="비교과활동"
      subtitle="Extracurricular Activities"
      heroImageUrl="/images/activities.jpg"
      heroImageAlt="Extracurricular Activities"
      subNav={curriculumSubNav}
    >
      <div className="space-y-12">
        {/* Club Activities */}
        <section>
          <motion.h3
            className="text-3xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            동아리 활동
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="glass p-6 rounded-2xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <clubActivities1.icon className="w-12 h-12 text-blue-400 mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">{clubActivities1.title}</h4>
              <p className="text-blue-300 mb-2">활동 시간: {clubActivities1.time}</p>
              <p className="text-white/80">{clubActivities1.description}</p>
            </motion.div>
            <motion.div
              className="glass p-6 rounded-2xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <clubActivities2.icon className="w-12 h-12 text-blue-400 mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">{clubActivities2.title}</h4>
              <p className="text-blue-300 mb-2">활동 시간: {clubActivities2.time}</p>
              <p className="text-white/80">{clubActivities2.description}</p>
            </motion.div>
          </div>
        </section>

        {/* Service Activities */}
        <motion.section
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <serviceActivities.icon className="w-12 h-12 text-blue-400 mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">{serviceActivities.title}</h3>
          <p className="text-blue-300 mb-4">시간: {serviceActivities.time}</p>
          <div className="grid md:grid-cols-2 gap-3">
            {serviceActivities.activities.map((activity, idx) => (
              <div key={idx} className="flex items-start text-white/80">
                <span className="text-blue-400 mr-2">•</span>
                <span>{activity}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Leadership Training */}
        <section>
          <motion.h3
            className="text-3xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            리더십 훈련
          </motion.h3>
          <div className="grid md:grid-cols-4 gap-6">
            {leadershipPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                className="glass p-6 rounded-2xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <program.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-white mb-3">{program.title}</h4>
                {program.details.map((detail, idx) => (
                  <p key={idx} className="text-white/80 text-sm mb-1">{detail}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certification Programs */}
        <motion.section
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">자격증 취득 프로그램</h3>
          <div className="space-y-3">
            {certificationPrograms.map((cert, idx) => (
              <div key={idx} className="flex items-start text-white/80">
                <span className="text-blue-400 mr-2">•</span>
                <span><strong className="text-white">{cert.title}:</strong> {cert.period}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Sports Events */}
        <motion.section
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">체육 행사</h3>
          <div className="space-y-3">
            {sportsEvents.map((event, idx) => (
              <div key={idx} className="flex items-start text-white/80">
                <span className="text-blue-400 mr-2">•</span>
                <span>{event}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* English Event */}
        <motion.section
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Music className="w-12 h-12 text-blue-400 mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">영어 행사: {englishEvent.name}</h3>
          <div className="space-y-3 text-white/80">
            <p><strong className="text-white">의미:</strong> {englishEvent.meaning}</p>
            <p><strong className="text-white">취지:</strong> {englishEvent.purpose}</p>
            <p><strong className="text-white">시기:</strong> {englishEvent.time}</p>
            <p><strong className="text-white">대상:</strong> {englishEvent.target}</p>
          </div>
        </motion.section>

        {/* Other Events */}
        <motion.section
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Calendar className="w-12 h-12 text-blue-400 mb-4" />
          <h3 className="text-2xl font-bold text-white mb-6">기타 행사</h3>
          <div className="flex flex-wrap gap-3">
            {otherEvents.map((event, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm"
              >
                {event}
              </span>
            ))}
          </div>
        </motion.section>
      </div>
    </ContentPageLayout>
  )
}
