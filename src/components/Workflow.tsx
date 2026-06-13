'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, FileText, Palette, Video, Rocket, BarChart3, ArrowRight } from 'lucide-react'

const steps = [
  { icon: Lightbulb, label: 'Discovery', desc: 'Understanding your brand' },
  { icon: FileText, label: 'Strategy', desc: 'Creating the roadmap' },
  { icon: Palette, label: 'Creative', desc: 'Designing assets' },
  { icon: Video, label: 'Production', desc: 'Content creation' },
  { icon: Rocket, label: 'Launch', desc: 'Going live' },
  { icon: BarChart3, label: 'Optimize', desc: 'Scaling results' }
]

export default function Workflow() {
  return (
    <section className="relative w-full py-12 md:py-32 lg:py-40 px-4 md:px-6 z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-purple/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue mb-4">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">
            How I{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-white">
              Work
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto">
            A streamlined AI-powered workflow designed to deliver results efficiently.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Card */}
              <div className="p-4 md:p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 group text-center">
                {/* Step number */}
                <div className="absolute -top-2 -left-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-[10px] md:text-xs font-bold text-white">
                  {i + 1}
                </div>

                {/* Icon */}
                <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-white/[0.06] group-hover:border-accent-blue/30 transition-all duration-300">
                  <step.icon className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-accent-blue transition-colors" />
                </div>

                <h3 className="font-semibold text-white text-sm md:text-base mb-1">{step.label}</h3>
                <p className="text-[10px] md:text-xs text-white/40">{step.desc}</p>
              </div>

              {/* Arrow connector (except last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white/20" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-white/50 text-sm">
            Ready to start your project?{' '}
            <span className="text-accent-blue cursor-pointer hover:underline">Let's talk</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}