'use client'
import React, { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useContent } from '@/context/ContentContext'

export default function Brands() {
  const { content } = useContent()
  const brands = content.brands?.items || []
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, -20])
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20])

  if (brands.length === 0 || (brands.length === 1 && !brands[0].name)) {
    return null
  }

  // Create 3D grid positions
  const brandPositions = useMemo(() => {
    const positions: { x: number; y: number; z: number; scale: number }[] = []
    const cols = 4
    const spacing = 3.5

    brands.forEach((_: any, i: number) => {
      const row = Math.floor(i / cols)
      const col = i % cols
      const x = (col - (cols - 1) / 2) * spacing
      const y = (row - Math.floor((brands.length - 1) / cols) / 2) * spacing * -1
      const z = Math.random() * 2 - 1 // Random depth
      const scale = 1 - Math.abs(z) * 0.15

      positions.push({ x, y, z, scale })
    })

    return positions
  }, [brands])

  // Calculate dynamic height based on number of rows
  const numRows = Math.ceil(brands.length / 4)
  const containerHeight = numRows <= 1 ? 'h-[300px]' : numRows === 2 ? 'h-[450px]' : numRows === 3 ? 'h-[600px]' : 'h-[750px]'

  return (
    <section ref={containerRef} className="relative w-full py-12 md:py-16 lg:py-20 px-3 md:px-6 z-10">
      {/* Header - Top Side */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 md:mb-12"
      >
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-white/40 mb-4">
          {content.brands?.tagline || 'Brands'}
        </span>
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
          {content.brands?.title || "I've Worked With"}
        </h2>
        <p className="text-white/50 mt-2 md:mt-4 max-w-xl mx-auto text-sm md:text-base">
          {content.brands?.description || 'Trusted by leading brands across industries.'}
        </p>
      </motion.div>

      {/* Perspective Container - Dynamic height based on brand count */}
      <div className={`perspective-container ${containerHeight} md:h-[600px] lg:h-[800px] flex items-start justify-center pt-2 md:pt-4 lg:pt-8 px-1 md:px-0`}>
        <motion.div
          style={{ y, rotateX, rotateY }}
          className="preserve-3d flex flex-wrap justify-center items-center gap-3 md:gap-5 lg:gap-8 max-w-5xl w-full"
        >
          {brands.map((brand: any, i: number) => {
            const pos = brandPositions[i]

            return (
              <motion.a
                key={brand.id || i}
                href={brand.website || '#'}
                target={brand.website ? '_blank' : '_self'}
                rel={brand.website ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, z: -200 }}
                whileInView={{ opacity: 1, z: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{
                  scale: 1.15,
                  z: 50,
                  rotateY: 0,
                  rotateX: 0,
                }}
                className="group preserve-3d relative w-20 h-28 md:w-28 md:h-36 lg:w-44 lg:h-56 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer"
                style={{
                  transform: `translate3d(${pos.x}rem, ${pos.y}rem, ${pos.z * 50}px) scale(${pos.scale})`,
                }}
              >
                {/* Glass Effect */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent" />

                {/* Glow */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-accent-purple/40 to-accent-blue/40 blur-xl" />
                </div>

                {/* Logo */}
                <div className="relative z-10 w-8 h-8 md:w-12 md:h-12 lg:w-20 lg:h-20 rounded-lg md:rounded-xl bg-white/10 flex items-center justify-center mb-1 md:mb-2 lg:mb-3 group-hover:bg-white/20 transition-colors">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-6 h-6 md:w-8 md:h-8 lg:w-14 lg:h-14 object-contain"
                    />
                  ) : (
                    <span className="text-lg md:text-xl lg:text-3xl font-bold text-white/60">
                      {brand.name?.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Name */}
                <span className="relative z-10 text-[10px] md:text-xs lg:text-base text-white/80 font-medium text-center">
                  {brand.name}
                </span>

                {/* Reflection */}
                <div className="absolute -bottom-16 md:-bottom-20 lg:-bottom-24 left-1/2 -translate-x-1/2 w-3/4 h-12 md:h-14 lg:h-16 bg-gradient-to-b from-accent-purple/20 to-transparent blur-xl opacity-50" />
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}