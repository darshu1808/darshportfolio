'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden'

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsLoading(false)
            document.body.style.overflow = 'auto'
          }, 500)
          return 100
        }
        return p + Math.floor(Math.random() * 10) + 1
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10000] bg-dark flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="text-8xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
              {Math.min(progress, 100)}%
            </div>

            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent-blue"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>

            <p className="font-display text-xs tracking-[0.5em] text-accent-silver uppercase">
              Initializing Experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
