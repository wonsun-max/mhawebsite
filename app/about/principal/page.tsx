'use client'
import { motion } from 'framer-motion'

export default function PrincipalPage() {
  return (
    <section className="max-w-5xl mx-auto">
      <motion.div
        className="grid md:grid-cols-3 gap-8 items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <img src="/images/principal.jpg" alt="Principal" className="rounded-xl w-full h-72 object-cover shadow-lg" />
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold mb-3">학교장 인사말</h2>
          <p className="text-white/80 mb-4">
            “우리 학교는 학생 한 명 한 명이 하나님 안에서 지혜와 인격을 함께 성장시킬 수 있도록 세워졌습니다.”
          </p>
          <p className="text-white/70">– 교장 곽인환</p>
        </div>
      </motion.div>
    </section>
  )
}
