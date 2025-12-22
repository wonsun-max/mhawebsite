'use client'
import { motion } from 'framer-motion'
import ContentPageLayout from '@/components/ContentPageLayout'
import { FileDown, CheckCircle, Users, DollarSign, Calendar } from 'lucide-react'
import { admissionsSubNav } from '@/lib/subNavConfig'
import InquiryForm from '@/components/features/InquiryForm'

const eligibility = [
  {
    title: '선교사 자녀전형 지원자격',
    description: '부모 또는 실질적 보호자가 해외 선교사로 파송을 받아 재직 중이며, 본교가 인정하는 교단 및 교회·단체에서 파송을 받은 자의 자녀',
    icon: Users,
    color: 'text-blue-400'
  },
  {
    title: '목회자 자녀전형 지원자격',
    description: '부모 또는 실질적 보호자가 본교가 인정하는 교단이나 교단에 소속된 교회에서 목회자로 현재 사역 중인 목회자의 자녀',
    icon: Users,
    color: 'text-green-400'
  },
  {
    title: '일반전형 지원자격',
    description: '교포자녀: 부모 및 학생 모두가 외국에서 영주하는 교포(영주권자) 자녀\n재외국민자녀: 부 또는 모가 합법적인 사유로 필리핀에 거주하는 자의 자녀',
    icon: Users,
    color: 'text-purple-400'
  }
]

const selectionMethod = {
  headers: ['전형유형', '서류심사', '면접', '총점'],
  rows: [
    ['선교사/목회자/일반 자녀', '50%', '50%', '100점']
  ]
}

const tuitionFees = {
  headers: ['구분', '선교사 자녀', '목회자 자녀', '일반 자녀'],
  subHeaders: ['', '입학금', '등록금', '입학금', '등록금', '입학금', '등록금'],
  rows: [
    ['초등학교', '$ 300', '$ 1,030', '$ 400', '$ 1,230', '$ 600', '$ 2,400']
  ]
}

const selectionCriteria = [
  '서류심사는 지원자의 신앙, 인성, 지원동기, 학업성취도 등을 균형 있게 평가합니다',
  '일반 전형자는 우수학생을 우선 선발합니다',
  '면접은 사정에 따라 직접면접 또는 전화면접을 실시합니다'
]

const selectionProcess = [
  '지원자는 기간 내에 소정의 양식을 구비하여 학교 전자 우편이나 우편으로 또는 직접 제출합니다',
  '서류심사 결과는 먼저 도착한 순으로 심사하고 합격결과를 개별 통보합니다',
  '결과는 지원자에게 개별통보하며 합격자는 지정된 기간 안에 등록해야 합니다'
]

export default function ElementaryAdmissionsPage() {
  return (
    <ContentPageLayout
      title="초등학교"
      subtitle="Elementary School Admissions"
      heroImageUrl="/images/admissions.jpg"
      heroImageAlt="Elementary Admissions"
      subNav={admissionsSubNav}
    >
      <div className="space-y-12">
        {/* Eligibility */}
        <section>
          <motion.h3
            className="text-3xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            지원자격
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-6">
            {eligibility.map((item, index) => (
              <motion.div
                key={item.title}
                className="glass p-6 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className={`w-12 h-12 ${item.color} mb-4`} />
                <h4 className="text-lg font-bold text-white mb-3">{item.title}</h4>
                <p className="text-white/80 text-sm whitespace-pre-line">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="glass p-6 rounded-2xl mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-white/90 text-sm">
              <strong className="text-blue-400">참고:</strong> 실질적 보호자란 부모가 더 이상 학생의 관리 및 보호를 할 수 없는 상황에서 조부모 또는 제 3자의 관리 및 보호를 받는 것을 말합니다. 해외에 학습을 목적으로 조부모 또는 제 3자와 거주하는 것은 불허합니다.
            </p>
          </motion.div>
        </section>

        {/* Application Downloads */}
        <motion.div
          className="glass p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
            <FileDown className="w-12 h-12 text-blue-400 mb-4 sm:mb-0 sm:mr-4" />
            <div>
              <h4 className="text-xl font-bold text-white">입학원서 다운로드</h4>
              <p className="text-white/70 text-sm">한글파일 및 워드파일 제공</p>
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
              한글파일
            </button>
            <button className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
              워드파일
            </button>
          </div>
        </motion.div>

        {/* Selection Method */}
        <motion.section
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">전형방법</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  {selectionMethod.headers.map((header, idx) => (
                    <th key={idx} className="p-3 text-left text-blue-300">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectionMethod.rows.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/10">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="p-3 text-white/90">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/70 text-sm mt-4">※ 필요시 수학능력 테스트를 진행합니다.</p>
        </motion.section>

        {/* Selection Criteria */}
        <motion.section
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">선발 기준 및 고시 안내</h3>
          <div className="space-y-3">
            {selectionCriteria.map((criteria, idx) => (
              <div key={idx} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-white/90">{criteria}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Selection Process */}
        <motion.section
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">선발절차</h3>
          <div className="space-y-4">
            {selectionProcess.map((step, idx) => (
              <div key={idx} className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-white/90 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Application Period */}
        <section className="grid md:grid-cols-2 gap-6">
          <motion.div
            className="glass p-6 rounded-2xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Calendar className="w-10 h-10 text-blue-400 mb-4" />
            <h4 className="text-xl font-bold text-white mb-3">정시전형</h4>
            <p className="text-white/90">매년 1-2월 (3월: 1학기 시작_신입학)</p>
            <p className="text-white/90">7월 (8월: 2학기 시작_편입학)</p>
          </motion.div>
          <motion.div
            className="glass p-6 rounded-2xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Calendar className="w-10 h-10 text-green-400 mb-4" />
            <h4 className="text-xl font-bold text-white mb-3">수시전형</h4>
            <p className="text-white/90">선교사 자녀가 부모의 선교지 이동으로 본교에 입학하려 할 때 수시지원 가능함</p>
          </motion.div>
        </section>

        {/* Tuition Fees */}
        <motion.section
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <DollarSign className="w-10 h-10 text-blue-400 mb-4" />
          <h3 className="text-2xl font-bold text-white mb-6">등록금 안내 (* 학기당)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="p-3 text-left text-blue-300">구분</th>
                  <th colSpan={2} className="p-3 text-center text-blue-300">선교사 자녀</th>
                  <th colSpan={2} className="p-3 text-center text-blue-300">목회자 자녀</th>
                  <th colSpan={2} className="p-3 text-center text-blue-300">일반 자녀</th>
                </tr>
                <tr className="border-b border-white/10">
                  <th className="p-3"></th>
                  <th className="p-3 text-center text-white/70 text-sm">입학금</th>
                  <th className="p-3 text-center text-white/70 text-sm">등록금</th>
                  <th className="p-3 text-center text-white/70 text-sm">입학금</th>
                  <th className="p-3 text-center text-white/70 text-sm">등록금</th>
                  <th className="p-3 text-center text-white/70 text-sm">입학금</th>
                  <th className="p-3 text-center text-white/70 text-sm">등록금</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-3 text-white/90 font-semibold">초등학교</td>
                  <td className="p-3 text-center text-white/90">$ 300</td>
                  <td className="p-3 text-center text-white/90">$ 1,030</td>
                  <td className="p-3 text-center text-white/90">$ 400</td>
                  <td className="p-3 text-center text-white/90">$ 1,230</td>
                  <td className="p-3 text-center text-white/90">$ 600</td>
                  <td className="p-3 text-center text-white/90">$ 2,400</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>
        {/* Admission Application Form */}
        <motion.section
          id="apply"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="scroll-mt-32"
        >
          <InquiryForm
            category="ADMISSION"
            title="입학 신청서 (Application)"
            subtitle="아래 양식을 작성하여 제출해주시면 입학 담당자가 검토 후 연락드립니다."
          />
        </motion.section>
      </div>
    </ContentPageLayout>
  )
}
