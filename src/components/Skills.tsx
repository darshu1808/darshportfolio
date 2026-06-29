'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useContent } from '@/context/ContentContext'

export default function Skills() {
  const { content } = useContent()
  const skills = content.skills?.items || []

  if (skills.length === 0) {
    return null
  }

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 px-4 md:px-6 z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 gradient-mesh opacity-50" />

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue mb-4">
            {content.skills?.tagline || 'Expertise'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">
            Skills &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-white">
              Capabilities
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto">
            {content.skills?.description || 'A curated set of skills designed to deliver exceptional results for your brand.'}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-8 md:gap-y-10">
          {skills.map((skill: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2 md:mb-3">
                <span className="text-white font-display font-medium text-sm md:text-base">{skill.name}</span>
                <span className="text-white/60 font-display text-xs md:text-sm">{skill.value}%</span>
              </div>
              <div className="h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full rounded-full relative"
                  style={{ backgroundColor: skill.color || '#00C2FF' }}
                >
                  {/* Glow effect on progress bar */}
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: skill.color || '#00C2FF',
                      boxShadow: `0 0 10px ${skill.color || '#00C2FF'}`
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}