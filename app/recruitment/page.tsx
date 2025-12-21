'use client'
import { motion } from 'framer-motion'
import ContentPageLayout from '@/components/ContentPageLayout'
import { Users, CheckCircle, FileDown, Mail, Phone, MessageCircle } from 'lucide-react'

const qualifications = [
    '교사로서 선교사 자녀 교육에 부르심이 있는 분',
    '교회나 기관(선교단체)의 선교사 파송을 받을 수 있는 분',
    '미혼 및 기혼자는 부부가 함께 선교지에서 생활할 수 있는 분'
]

const positions = [
    { department: '초등교사', count: '0명' },
    { department: '중·고등 교사', count: '과목별 0명' },
    { department: '행정실', count: '행정, 회계, 시설 및 차량 관리 각 1명' },
    { department: '교목실', count: '교목실 사역 1명' }
]

const selectionProcess = [
    { step: '1차', title: '서류접수', description: '' },
    { step: '2차', title: '면접', description: '직접 면접이 어려울 경우 전화 인터뷰 가능' },
    { step: '3차', title: 'Orientation Course', description: '면접 후 임용 전까지 본교에서 진행하는 소정의 과정' }
]

const contactInfo = [
    { icon: Mail, label: 'E-mail', value: 'hankukac@hanmail.net', link: 'mailto:hankukac@hanmail.net' },
    { icon: Phone, label: '문의 전화', value: '070-8638-3355', link: 'tel:070-8638-3355' },
    { icon: MessageCircle, label: '카카오톡 ID', value: 'hankukac', link: null }
]

export default function RecruitmentPage() {
    return (
        <ContentPageLayout
            title="교사 선교사 모집"
            subtitle="Teacher Missionary Recruitment"
            heroImageUrl="/images/recruitment.jpg"
            heroImageAlt="Teacher Recruitment"
        >
            <div className="space-y-12">
                {/* Qualifications */}
                <section>
                    <motion.h3
                        className="text-3xl font-bold text-white mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        지원자격
                    </motion.h3>
                    <div className="space-y-4">
                        {qualifications.map((qual, idx) => (
                            <motion.div
                                key={idx}
                                className="glass p-6 rounded-2xl flex items-start"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <CheckCircle className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0 mt-1" />
                                <p className="text-white/90 text-lg">{qual}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Positions */}
                <section>
                    <motion.h3
                        className="text-3xl font-bold text-white mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        교사 선교사 모집인원
                    </motion.h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {positions.map((pos, idx) => (
                            <motion.div
                                key={pos.department}
                                className="glass p-6 rounded-2xl"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Users className="w-10 h-10 text-blue-400 mb-3" />
                                <h4 className="text-xl font-bold text-white mb-2">{pos.department}</h4>
                                <p className="text-white/80">{pos.count}</p>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        className="glass p-6 rounded-2xl bg-yellow-500/10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-white/90">
                            <strong className="text-yellow-400">※ 참고:</strong> 매년 모집 부서와 인원은 위와 다를 수 있습니다. 모집에 대한 자세한 내용은 행정실로 문의 바랍니다.
                        </p>
                    </motion.div>
                </section>

                {/* Selection Process */}
                <section>
                    <motion.h3
                        className="text-3xl font-bold text-white mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        선발절차
                    </motion.h3>
                    <div className="space-y-4">
                        {selectionProcess.map((process, idx) => (
                            <motion.div
                                key={process.step}
                                className="glass p-6 rounded-2xl"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                                        {process.step}
                                    </div>
                                    <div className="pt-2">
                                        <h4 className="text-xl font-bold text-white mb-2">{process.title}</h4>
                                        {process.description && (
                                            <p className="text-white/80">{process.description}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        className="glass p-6 rounded-2xl mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-white/90">
                            <strong className="text-blue-400">결과 발표:</strong> 개별 통보
                        </p>
                    </motion.div>
                </section>

                {/* Application Method */}
                <motion.section
                    className="glass p-8 rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold text-white mb-6">지원방법</h3>
                    <p className="text-white/90 mb-6">
                        본교 홈페이지에서 "교사 선교사 지원서 및 관련서식"을 다운받아 작성하고 관련 증빙 서류를 스캔하여 지원서와 함께 이메일로 접수. (원본 추후 제출)
                    </p>
                    <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors flex items-center">
                        <FileDown className="w-5 h-5 mr-2" />
                        지원서 다운로드
                    </button>
                </motion.section>

                {/* Contact Information */}
                <section>
                    <motion.h3
                        className="text-3xl font-bold text-white mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        문의 사항
                    </motion.h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {contactInfo.map((contact, idx) => (
                            <motion.div
                                key={contact.label}
                                className="glass p-6 rounded-2xl"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <contact.icon className="w-10 h-10 text-blue-400 mb-4" />
                                <h4 className="text-lg font-bold text-white mb-2">{contact.label}</h4>
                                {contact.link ? (
                                    <a
                                        href={contact.link}
                                        className="text-blue-300 hover:text-blue-200 transition-colors"
                                    >
                                        {contact.value}
                                    </a>
                                ) : (
                                    <p className="text-white/90">{contact.value}</p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </ContentPageLayout>
    )
}
