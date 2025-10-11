// FILE: components/Hero.tsx
'use client'
import AnimatedText from './AnimatedText';

export default function Hero() {
  return (
    <header
      className="relative hero min-h-[60vh] flex items-center justify-center text-center overflow-hidden"
      style={{ backgroundImage: 'linear-gradient(180deg, rgba(2,6,23,0.45), rgba(2,6,23,0.25)), url(/images/hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 opacity-40 blur-sm"></div>

      <div className="relative z-10 max-w-5xl px-6 py-20 text-white">
        <div className="mb-6">
          <img src="/images/logo.png" alt="MHA logo" className="mx-auto h-16 w-auto" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Missionary Heritage Academy
        </h1>

        <div className="mt-4 text-xl sm:text-2xl font-medium flex items-center justify-center gap-3">
          <span>Forming</span>
          <AnimatedText words={['Faith', 'Leaders', 'Global Citizens', 'Servants']} speed={100} />
        </div>

        <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base text-white/90">
          A community where faith and learning meet. Join our academic programs, discover campus life, and be part of a mission-driven school.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <a href="/admissions" className="px-6 py-3 bg-white text-blue-700 rounded-full font-semibold shadow hover:scale-105 transition transform">
            Apply Now
          </a>
          <a href="/about" className="px-6 py-3 border border-white/30 rounded-full text-white hover:bg-white/10 transition">
            Learn More
          </a>
        </div>
      </div>

      <div className="absolute right-6 bottom-6 w-40 h-40 rounded-xl overflow-hidden floaty hidden md:block">
        <img src="/images/campus2.jpg" alt="campus preview" className="w-full h-full object-cover" />
      </div>
    </header>
  );
}