
'use client'
import { motion } from 'framer-motion';

interface ContentSectionProps {
  children: React.ReactNode;
}

export default function ContentSection({ children }: ContentSectionProps) {
  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
