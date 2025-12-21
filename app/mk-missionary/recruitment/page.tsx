'use client'
import ContentPageLayout from "@/components/ContentPageLayout";
import { motion } from "framer-motion";
import { CheckCircle, Heart, Users, BookOpen } from "lucide-react";
import { mkMissionarySubNav } from '@/lib/subNavConfig';

const requirements = [
  {
    icon: Heart,
    title: "사역에 대한 열정",
    description: "MK 자녀들을 섬기고자 하는 마음과 헌신",
  },
  {
    icon: Users,
    title: "인내와 사랑",
    description: "다양한 배경의 학생들을 이해하고 품을 수 있는 자세",
  },
  {
    icon: BookOpen,
    title: "전문성",
    description: "교육, 상담, 또는 관련 분야의 경험이나 자격",
  },
];

const process = [
  "지원서 제출 및 서류 심사",
  "1차 면접 (화상 또는 대면)",
  "2차 면접 및 현장 방문",
  "최종 합격 통보 및 오리엔테이션",
];

export default function RecruitmentPage() {
  return (
    <ContentPageLayout
      title="모집안내"
      subtitle="MK 선교사 자녀들과 함께 할 사역자를 찾습니다."
      heroImageUrl="/images/mk-bg.jpg"
      heroImageAlt="Recruitment"
      subNav={mkMissionarySubNav}
    >
      <motion.div
        className="bg-gray-800 rounded-2xl p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-white">왜 우리와 함께 해야 하나요?</h2>
        <p className="text-gray-400 mb-4">
          마닐라한국아카데미는 전 세계에서 온 선교사 자녀들(MK)에게 최상의 교육과 영적 돌봄을 제공하는 특별한 사역지입니다.
          우리는 이 귀한 자녀들이 하나님의 계획 안에서 성장할 수 있도록 돕는 사역에 헌신된 분들을 찾고 있습니다.
        </p>
        <p className="text-gray-400">
          이곳에서 당신은 단순히 직업이 아닌 <span className="text-blue-400 font-semibold">소명</span>을 발견하게 될 것입니다.
        </p>
      </motion.div>

      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">자격 요건</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {requirements.map((req, i) => (
            <motion.div
              key={req.title}
              className="bg-gray-800 rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <req.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-2 text-white">{req.title}</h3>
              <p className="text-gray-400">{req.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="bg-gray-800 rounded-2xl p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-white">모집 과정</h2>
        <div className="space-y-4">
          {process.map((step, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg text-white">
                  <span className="font-bold text-blue-400">Step {i + 1}:</span> {step}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-white">지원하기</h2>
        <p className="text-gray-200 mb-6">
          MK 선교사 자녀들과 함께 할 준비가 되셨나요? 지금 바로 지원해주세요!
        </p>
        <div className="space-y-2 text-white">
          <p className="text-lg">
            이메일: <span className="font-semibold">recruitment@mhaseoul.org</span>
          </p>
          <p className="text-lg">
            전화: <span className="font-semibold">+63 2 1234 5678</span>
          </p>
        </div>
        <button className="mt-6 px-8 py-3 bg-white text-blue-900 rounded-full font-semibold hover:bg-gray-100 transition-colors">
          지원서 다운로드
        </button>
      </motion.div>
    </ContentPageLayout>
  );
}
