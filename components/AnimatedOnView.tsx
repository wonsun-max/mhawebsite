// FILE: components/AnimatedOnView.tsx
// path: components/AnimatedOnView.tsx
'use client'
import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, Variants } from 'framer-motion'

type Props = {
  children: React.ReactNode
  className?: string
  rootMargin?: string
  threshold?: number
  variants?: Variants
}

/*
Why: reusable animation wrapper that restarts animations when element leaves & re-enters viewport.
*/
export default function AnimatedOnView({
  children,
  className = '',
  rootMargin = '0px',
  threshold = 0.2,
  variants,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) controls.start('visible') // play
          else controls.start('hidden') // reset so it will replay next time
        })
      },
      { root: null, rootMargin, threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [controls, rootMargin, threshold])

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.995 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants ?? defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
