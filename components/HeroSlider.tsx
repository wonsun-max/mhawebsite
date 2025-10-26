'use client'
import Slider from "react-slick";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    image: "/images/campus1.jpg",
    title: "마닐라한국아카데미에 오신 것을 환영합니다",
    subtitle: "배우고, 성장하고, 뛰어난 인재가 되는 곳",
  },
  {
    image: "/images/campus1.jpg",
    title: "최첨단 시설",
    subtitle: "현대적인 교실과 학습 공간",
  },
  {
    image: "/images/campus1.jpg",
    title: "활기찬 학생 생활",
    subtitle: "배움과 리더십의 공동체",
  },
];

export default function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
  };

  return (
    <div className="relative h-screen">
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-screen">
            <Image
              src={slide.image}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white">
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {slide.title}
              </motion.h1>
              <motion.p
                className="text-lg md:text-2xl mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {slide.subtitle}
              </motion.p>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <Link href="/about">
                  <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center mx-auto shadow-lg shadow-blue-600/50 hover:shadow-xl hover:shadow-blue-700/50">
                    학교 둘러보기 <ArrowRight className="ml-2" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}