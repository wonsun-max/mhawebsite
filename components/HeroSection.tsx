'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageUrl?: string; // Make imageUrl optional if videoUrl is present
  imageAlt: string;
  videoUrl?: string; // New optional prop for video background
  heightClass?: string; // e.g., 'h-[50vh]', 'h-96', 'min-h-[60vh]'
  overlayOpacityClass?: string; // e.g., 'bg-black/60', 'bg-black/40'
}

export default function HeroSection({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  videoUrl,
  heightClass = 'h-[50vh]',
  overlayOpacityClass = 'bg-black/60',
}: HeroSectionProps) {
  return (
    <section
      className={`relative ${heightClass} flex items-center justify-center bg-cover bg-center text-white overflow-hidden`}
    >
      {videoUrl ? (
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 object-cover w-full h-full z-0"
        />
      ) : (
        imageUrl && (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            className="object-cover z-0"
          />
        )
      )}
      <div className={`absolute inset-0 ${overlayOpacityClass} z-10`}></div>
      <div className="relative z-20 text-center px-6 max-w-4xl">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
