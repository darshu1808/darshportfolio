'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useContent } from '@/context/ContentContext'

export default function Testimonials() {
  const { content } = useContent()
  const testimonials = content.testimonials?.items || []

  if (testimonials.length === 0) {
    return null
  }

  // Triple for infinite scroll
  const allTestimonials = [...testimonials, ...testimonials, ...testimonials]

  return (
    <section className="relative w-full py-40 z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 px-6"
      >
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue mb-4">
          {content.testimonials?.tagline || 'Testimonials'}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Client{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-white">
            Success
          </span>
        </h2>
      </motion.div>

      {/* Infinite scroll testimonials */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-6 w-max animate-[marquee_30s_linear_infinite]">
          {allTestimonials.map((t: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="w-[380px] shrink-0 p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 group"
            >
              {/* Quote icon */}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.gradient || 'from-[#00C2FF] to-[#6D5EF3]'} flex items-center justify-center mb-6 opacity-80 group-hover:opacity-100 transition-opacity`}>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <p className="text-white/70 text-lg leading-relaxed mb-8">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                {/* Profile Image or Initials */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient || 'from-[#00C2FF] to-[#6D5EF3]'} flex items-center justify-center overflow-hidden`}>
                  {t.profileImage ? (
                    <img src={t.profileImage} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-bold">{t.name?.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-white/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}