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
      <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-200" />
      {events.map((event, index) => (
        <motion.div
          key={index}
          className="relative mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
            <div className="w-1/2 px-4">
              <div className={`text-lg font-bold ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>{event.year}</div>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center z-10">
              {iconMap[event.icon]}
            </div>
            <div className="w-1/2 px-4">
              <div className={`p-6 bg-white rounded-lg shadow-lg ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600">{event.desc}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
