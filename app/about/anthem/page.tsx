'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ContentPageLayout from '@/components/ContentPageLayout'
import { Music, Flag, Shield } from 'lucide-react'
import { aboutSubNav } from '@/lib/subNavConfig'

const symbols = [
  {
    icon: Shield,
    title: '교표',
    titleEn: 'School Emblem',
    description: '한국인의 얼과 정체성을 가지고 조국을 사랑하도록 우리 나라의 상징인 태극기의 태극문양을 바탕으로 하였습니다.',
    imageUrl: '/images/emblem.png',
  },
  {
    icon: Flag,
    title: '교기',
    titleEn: 'School Flag',
    description: '교기의 자주색은 존엄과 정의, 고귀, 위엄을 나타내며 태극무늬는 우리 학교의 교육목표가 한국인의 얼과 정체성을 가지고 조국을 사랑하도록 하는 것을 나타냅니다.',
    imageUrl: '/images/flag.png',
  },
];

export default function AnthemPage() {
  return (
    <ContentPageLayout
      title="교가 및 상징"
      subtitle="School Anthem & Symbols"
      heroImageUrl="/images/anthembg.jpg"
      heroImageAlt="School Anthem and Symbols"
      subNav={aboutSubNav}
    >
      <div className="space-y-12">
        {/* Symbols Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {symbols.map((symbol, index) => (
            <motion.div
              key={index}
              className="glass p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex items-center mb-6">
                <symbol.icon className="w-12 h-12 text-blue-400 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-white">{symbol.title}</h3>
                  <p className="text-blue-300 text-sm">{symbol.titleEn}</p>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed mb-6">{symbol.description}</p>
              {symbol.imageUrl && (
                <div className="flex justify-center">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <Image
                      src={symbol.imageUrl}
                      alt={symbol.title}
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Anthem Section */}
        <motion.div
          className="glass p-10 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center mb-8">
            <Music className="w-12 h-12 text-blue-400 mr-4" />
            <div>
              <h3 className="text-3xl font-bold text-white">교가</h3>
              <p className="text-blue-300">School Anthem</p>
            </div>
          </div>
          <div className="bg-white/5 p-6 rounded-lg">
            <div className="flex flex-col items-center gap-6">
              <audio controls className="w-full max-w-md">
                <source src="/audio/anthem.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <div className="text-center text-white/90 leading-loose whitespace-pre-line font-medium">
                {`동해물과 백두산이 마르고 닳도록
                하느님이 보우하사 우리나라 만세
                무궁화 삼천리 화려 강산
                대한 사람 대한으로 길이 보전하세`}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ContentPageLayout>
  )
}