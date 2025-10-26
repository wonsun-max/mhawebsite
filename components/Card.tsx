'use client'
import { motion } from 'framer-motion';

export default function Card({ title, description }: { title: string; description: string; }) {
  return (
    <motion.div
      className='glass rounded-2xl p-6 transition'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className='text-xl font-semibold mb-2 text-white'>{title}</h2>
      <p className='text-white/70'>{description}</p>
    </motion.div>
  );
}