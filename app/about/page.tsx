
'use client'
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    href: '/about/vision',
    title: '비전과 미션',
    desc: '마닐라한국아카데미를 이끄는 근본적인 신념과 야심찬 목표를 발견해보세요.',
    img: '/images/campus1.jpg',
  },
  {
    href: '/about/principal',
    title: '학교장 인사말',
    desc: '존경하는 교장 선생님의 교육 철학에 대한 개인적인 환영과 통찰력.',
    img: '/images/campus1.jpg',
  },
  {
    href: '/about/history',
    title: '우리의 풍부한 역사',
    desc: 'MHA 창립 이래의 중요한 이정표와 지속적인 유산을 따라 여정을 떠나보세요.',
    img: '/images/campus1.jpg', 
  },
  {
    href: '/about/philosophy',
    title: '교육 철학',
    desc: '지적 호기심, 영적 성장, 전인적 발달을 촉진하는 우리의 독특한 접근 방식을 탐구해보세요.',
    img: '/images/campus1.jpg', 
  },
  {
    href: '/about/anthem',
    title: '학교 교가',
    desc: '우리의 정신을 구현하고 활기찬 커뮤니티를 하나로 묶는 영감을 주는 교가에 대해 알아보세요.',
    img: '/images/campus1.jpg',
  },
  {
    href: '/about/location',
    title: '우리의 현대적인 캠퍼스',
    desc: '최첨단 시설과 고요한 학습 환경을 가상으로 둘러보세요.',
    img: '/images/campus1.jpg', 
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero 
        title="학교소개"
        subtitle="한국인 선교사 자녀를 위한 학교 마닐라한국아카데미입니다."
        image="/images/campus1.jpg"
      />
      <ContentSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="relative w-full h-48">
                <Image
                  src={s.img}
                  alt={s.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-400 mb-4">{s.desc}</p>
                <Link href={s.href} className="text-blue-400 hover:underline">
                  더 알아보기
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </ContentSection>
    </div>
  );
}
