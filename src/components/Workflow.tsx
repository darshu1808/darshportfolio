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
    <section className="relative w-full py-40 px-6 z-10 overflow-hidden">
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
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-accent-blue mb-4">
            Process
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How I{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-white">
              Work
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A streamlined AI-powered workflow designed to deliver results efficiently.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
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
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 group text-center">
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-xs font-bold text-white">
                  {i + 1}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-white/[0.06] group-hover:border-accent-blue/30 transition-all duration-300">
                  <step.icon className="w-6 h-6 text-white/70 group-hover:text-accent-blue transition-colors" />
                </div>

                <h3 className="font-semibold text-white mb-1">{step.label}</h3>
                <p className="text-xs text-white/40">{step.desc}</p>
              </div>

              {/* Arrow connector (except last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-white/20" />
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
          className="mt-16 text-center"
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