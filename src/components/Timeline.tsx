'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useContent } from '@/context/ContentContext'
import { Briefcase, GraduationCap, Calendar } from 'lucide-react'

export default function Timeline() {
  const { content } = useContent()
  const timeline = content.timeline || {}
  const items = timeline.items || []

  if (items.length === 0) {
    return null
  }

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 px-4 md:px-6 z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue mb-3 md:mb-4">
            {timeline.tagline || 'Journey'}
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-3 md:mb-4">
            {timeline.title || 'My '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-white">
              Timeline
            </span>
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
            {timeline.description || 'A chronological journey through my education and professional experience.'}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <div className="w-full h-full bg-gradient-to-b from-accent-purple via-accent-blue to-accent-purple opacity-30" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-purple shadow-lg shadow-accent-purple/50" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-blue shadow-lg shadow-accent-blue/50" />
          </div>

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-0">
            {items.map((item: any, index: number) => {
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center md:justify-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot on line */}
                  <div className="absolute left-[15px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-dark border-2 border-accent-purple md:border-accent-blue z-10 shadow-lg" />

                  {/* Content Card */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-30px)] ${
                    isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}>
                    <div className="relative group">
                      {/* Card */}
                      <div className="p-4 md:p-5 lg:p-6 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 card-lift">
                        {/* Year Badge */}
                        <div className="flex items-center gap-2 mb-2 md:mb-3">
                          <span className="px-2 md:px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-[10px] md:text-xs font-semibold text-accent-purple">
                            {item.year}
                          </span>
                          {item.type === 'education' ? (
                            <GraduationCap className="w-3 h-3 md:w-4 md:h-4 text-accent-purple" />
                          ) : (
                            <Briefcase className="w-3 h-3 md:w-4 md:h-4 text-accent-blue" />
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-base md:text-lg lg:text-xl font-bold text-white mb-1">
                          {item.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-accent-blue text-sm md:text-base mb-2">
                          {item.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Arrow pointer */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-dark border-l border-b ${
                        isLeft
                          ? 'right-0 border-white/10 -mr-1.5'
                          : 'left-0 border-r border-t -ml-1.5 border-accent-purple/20'
                      }`} />
                    </div>
                  </div>

                  {/* Empty space for opposite side on desktop */}
                  <div className="hidden md:block md:w-[calc(50%-30px)]" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}