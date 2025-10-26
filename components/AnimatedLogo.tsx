// FILE: components/AnimatedLogo.tsx
'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AnimatedLogo({ size = 80 }: { size?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="opacity-90"
    >
      <div className="rounded-full overflow-hidden bg-white/5 p-1 drop-shadow-xl">
        <Image src="/images/logo2.png" alt="Logo" width={size} height={size} />
      </div>
    </motion.div>
  )
}
