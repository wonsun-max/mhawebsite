'use client'
import { motion } from 'framer-motion'
import { Building, GraduationCap, Star, Award, Zap, Globe, Calendar } from 'lucide-react'

const iconMap = {
  Building: <Building className="w-6 h-6 text-white" />,
  GraduationCap: <GraduationCap className="w-6 h-6 text-white" />,
  Star: <Star className="w-6 h-6 text-white" />,
  Award: <Award className="w-6 h-6 text-white" />,
  Zap: <Zap className="w-6 h-6 text-white" />,
  Globe: <Globe className="w-6 h-6 text-white" />,
  Calendar: <Calendar className="w-6 h-6 text-white" />,
}

interface TimelineEvent {
  year: string
  title: string
  desc?: string
  icon: keyof typeof iconMap
}

interface TimelineProps {
  events: TimelineEvent[]
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Central Line - Hidden on Mobile */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-full w-0.5 bg-white/10" />

      {events.map((event, index) => (
        <motion.div
          key={index}
          className="relative mb-12 last:mb-0 ml-12 md:ml-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center">
            {/* Year for Desktop/Mobile */}
            <div className={`w-full md:w-1/2 px-0 md:px-8 mb-4 md:mb-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left order-last md:order-first'}`}>
              <div className="text-2xl font-bold text-[#D4AF37] mb-1">{event.year}</div>
            </div>

            {/* Icon - Positioned differently on mobile */}
            <div className="absolute -left-12 md:left-1/2 md:-translate-x-1/2 w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-xl md:rounded-2xl flex items-center justify-center z-10 shadow-lg shadow-[#D4AF37]/20">
              <div className="scale-75 md:scale-100">
                {iconMap[event.icon]}
              </div>
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-1/2 px-0 md:px-8 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
              <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                {event.desc && <p className="text-slate-400 text-sm md:text-base leading-relaxed">{event.desc}</p>}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
