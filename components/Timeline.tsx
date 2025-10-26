'use client'
import React from 'react'
import AnimatedOnView from './AnimatedOnView'
import { motion } from 'framer-motion' 

interface TimelineEvent {
  year: string;
  title: string;
  desc?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <section className="py-16"> 
      <div className="max-w-6xl mx-auto px-6"> 
        <motion.h2 
          className="text-3xl font-bold text-white mb-8 text-center" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          학교 연혁
        </motion.h2>
        <div className="glass p-6 rounded-lg"> 
          <div className="relative border-l border-white/10 ml-4">
            {events.map((ev) => (
              <AnimatedOnView key={ev.year} className="ml-6 mb-10 relative">
                <div className="absolute -left-[34px] top-2 w-5 h-5 bg-blue-500 rounded-full border-2 border-white" />
                <h3 className="text-xl font-semibold text-white">{ev.year} · {ev.title}</h3>
                <p className="text-white/80 mt-2">{ev.desc}</p>
              </AnimatedOnView>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}