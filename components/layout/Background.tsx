'use client'

import { motion } from 'framer-motion'

export default function Background() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0A1929] pointer-events-none">
            {/* Noise Texture */}
            <div
                className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
                }}
            />

            {/* Animated Aurora Blobs - Slower, more elegant animation */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    rotate: [0, 45, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] rounded-full bg-blue-900/40 blur-[80px] will-change-transform"
                style={{ willChange: 'transform, opacity' }}
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-[20%] right-0 w-[60vw] h-[60vw] rounded-full bg-[#D4AF37]/15 blur-[60px] will-change-transform"
                style={{ willChange: 'transform, opacity' }}
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-1/3 w-[90vw] h-[50vw] rounded-full bg-indigo-900/40 blur-[80px] will-change-transform"
                style={{ willChange: 'transform, opacity' }}
            />
        </div>
    )
}
